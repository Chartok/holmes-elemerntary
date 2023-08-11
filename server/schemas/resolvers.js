const User = require('../models/User');
const { ApolloError } = require('apollo-server-express');
const Book = require('../models/Book');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = {
    Query: {
        // Query single user by id or username
        user: async (_, { id, username }) => {
            User.findOne({
                $or: [{ _id: id }, { username }],
            });
        },

        // Query books from Google Books API
        searchBooks: async (_, { query }) => {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                },
            });

            if(!response.data) {
                throw new Error('No books found!');
            }

            const bookData = response.data.items.map(({ item }) => ({
                bookId: item.id,
                authors: item.volumeInfo.authors,
                description: item.volumeInfo.description,
                title: item.volumeInfo.title,
                image: item.volumeInfo.imageLinks?.thumbnail,
                link: item.volumeInfo.infoLink,
            }));

            await Book.insertMany(bookData);
            return bookData;
        }
    },
    Mutation: {
        // Register new user with signed token and send it to client
        registerUser: async (_, { registerInput: { username, email, password } }) => {

            // Check if user already exists
            const oldUser = await User.findOne({ email, username });
            if (oldUser === email || oldUser === username) {
                throw new ApolloError('User already exists with that email or username!');
            }

            // Encrypt user's password
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Create the new user in the database
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });

            // Create the jwt and attach to user
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "dontputthesecrettokenhereinquotes",
                { expiresIn: "2h" }
            );

            newUser.token = token;

            // Save the user to the database
            const res = await newUser.save();

            return { id: res.id, ...res._doc };
        },


        // Login user with email and password and send token to client
        loginUser: async (_, { loginInput: { email, password } }) => {

            // Check for user's email in database
            const user = await User.findOne({ email });

            // If user exists, check password and create jwt
            if (user && (await bcrypt.compare(password, user.password))) {

                const token = jwt.sign(
                    { user_id: user._id, email },
                    "dontputthesecrettokenhereinquotes",
                    { expiresIn: "2h" }
                );

                user.token = token;

                return { id: user.id, ...user._doc };
                // Else throw error if user doesn't exist or password is incorrect
            } else {
                throw new ApolloError("Incorrect email or password!");
            }
        },

        // Save book to user's `savedBooks` field by adding it to the set (to prevent duplicates)
        saveBook: async (_, { userId, book }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                throw new Error("Could not save book!");
            }

            return updatedUser;
        },

        // Remove book from user's `savedBooks` field by removing it from the set
        removeBook: async (_, { userId, bookId }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );

            if (!updatedUser) {
                throw new Error("Could not remove book!");
            }

            return updatedUser;
        },
    },
};

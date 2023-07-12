const { User } = require('../models');
const signToken = require('../utils/auth');

const resolvers = {
    Query: {
        // Query single user by id or username
        user: async (_, { _id, username }) => {
            return User.findOne({
                $or: [{ _id: id }, { username }],
            });
        },
    },
    Mutation: {
        // Create new user with signed token and send it to client
        createUser: async (_, { input }) => {
            const user = await User.create(input);

            if(!user) {
                throw new Error('Something went wrong!');
            }

            const token = signToken(user);

            return { token, user };

        },

        // Login user with email and password and send token to client
        login: async (_, { input }) => {
            const user = await User.findOne({ $or: [{ username: input.username }, { email: input.email }] });

            if(!user) {
                throw new Error('Cannot find this user!');
            }

            const correctPw = await user.isCorrectPassword(input.password);

            if(!correctPw) {
                throw new Error('Wrong password!');
            }

            const token = signToken(user);

            return { token, user };
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

module.exports = resolvers;

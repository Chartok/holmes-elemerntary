"use strict";
// const User = require('../models/User');
// const { ApolloError } = require('@apollo/server');
// const Book = require('../models/Book');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
//
// module.exports = {
//     Query: {
//         // Query single user by id or username
//         user: async (_, { id }, context) => {
//             const user = await User.findById(id);
//             if (!user) {
//                 throw new ApolloError('No user found with this id!');
//             }
//             return user;
//         },
//
//         // Query saved books for their library dashboard
//         savedBooks: async (_, {}, context) => {
//             const userId = context.userId;
//             const user = await User.findById(userId);
//
//             return user.savedBooks;
//         },
//
//         // Query books from Google Books API
//         searchBooks: async (_, { query }) => {
//             const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
//                 params: { q: query },
//             });
//
//             const res = response.data;
//
//             if (!res.items) {
//                 throw new Error('No books found!');
//             }
//
//             const bookData = response.data.items.map((book) => ({
//                 bookId: book.id,
//                 authors: book.volumeInfo.authors,
//                 description: book.volumeInfo.description,
//                 title: book.volumeInfo.title,
//                 image: book.volumeInfo.imageLinks?.thumbnail,
//                 link: book.volumeInfo.infoLink,
//             }));
//
//             return bookData;
//         },
//     },
//     Mutation: {
//         // Register new user with signed token and send it to client
//         registerUser: async (_, { registerInput: { username, email, password } }) => {
//
//             // Check if user already exists
//             const oldUser = await User.findOne({ email, username });
//             if (oldUser === email || oldUser === username) {
//                 throw new ApolloError('User already exists with that email or username!');
//             }
//
//             // Encrypt user's password
//             const encryptedPassword = await bcrypt.hash(password, 10);
//
//             // Create the new user in the database
//             const newUser = new User({
//                 username: username,
//                 email: email.toLowerCase(),
//                 password: encryptedPassword,
//             });
//
//             // Create the jwt and attach to user
//             const token = jwt.sign(
//                 { user_id: newUser._id, email },
//                 "dontputthesecrettokenhereinquotes",
//                 { expiresIn: "2h" }
//             );
//
//             newUser.token = token;
//
//             // Save the user to the database
//             const res = await newUser.save();
//
//             return { id: res.id, ...res._doc };
//         },
//
//
//         // Login user with email and password and send token to client
//         loginUser: async (_, { loginInput: { email, password } }) => {
//
//             // Check for user's email in database
//             const user = await User.findOne({ email });
//
//             // If user exists, check password and create jwt
//             if (user && (await bcrypt.compare(password, user.password))) {
//
//                 const token = jwt.sign(
//                     { user_id: user._id, email },
//                     "dontputthesecrettokenhereinquotes",
//                     { expiresIn: "2h" }
//                 );
//
//                 user.token = token;
//
//                 return { id: user.id, ...user._doc };
//                 // Else throw error if user doesn't exist or password is incorrect
//             } else {
//                 throw new ApolloError("Incorrect email or password!");
//             }
//         },
//
//         // Save book to user's `savedBooks` field by adding it to a set preventing duplicates
//         saveBook: async (_, { book }, context) => {
//
//             if (context.user) {
//                 try {
//                     const updatedUser = await User.findByIdAndUpdate(
//                         context.user._id,
//                         { $addToSet: { savedBooks: book } },
//                         { new: true }
//                     );
//                     return updatedUser;
//                 } catch (err) {
//                     throw new Error("Error saving book!");
//                 }
//             }
//             throw new Error("You need to be logged in!");
//         },
//
//         // Remove book from user's `savedBooks` field by removing it from the set
//         removeBook: async (_, { userId, bookId }) => {
//             const updatedUser = await User.findOneAndUpdate(
//                 { _id: userId },
//                 { $pull: { savedBooks: { bookId } } },
//                 { new: true }
//             );
//
//             if (!updatedUser) {
//                 throw new Error("Could not remove book!");
//             }
//
//             return updatedUser;
//         },
//     },
// };
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const User_1 = __importDefault(require("../models/User"));
const resolvers = {
    Query: {
        user: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { id }, context) {
            const user = yield User_1.default.findById(id);
            if (!user) {
                throw new server_1.ApolloError('No user found with this id!');
            }
            return user;
        }),
        savedBooks: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            const userId = context.userId;
            const user = yield User_1.default.findById(userId);
            return user.savedBooks;
        }),
        searchBooks: (_2, _b) => __awaiter(void 0, [_2, _b], void 0, function* (_, { query }) {
            const response = yield axios_1.default.get('https://www.googleapis.com/books/v1/volumes', {
                params: { q: query },
            });
            const res = response.data;
            if (!res.items) {
                throw new Error('No books found!');
            }
            const bookData = res.items.map((book) => {
                var _a;
                return ({
                    bookId: book.id,
                    authors: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    title: book.volumeInfo.title,
                    image: (_a = book.volumeInfo.imageLinks) === null || _a === void 0 ? void 0 : _a.thumbnail,
                    link: book.volumeInfo.infoLink,
                });
            });
            return bookData;
        }),
    },
    Mutation: {
        registerUser: (_3, _c) => __awaiter(void 0, [_3, _c], void 0, function* (_, { registerInput: { username, email, password }, }) {
            const oldUser = yield User_1.default.findOne({ email, username });
            if (oldUser) {
                throw new server_1.ApolloError('User already exists with that email or username!');
            }
            const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new User_1.default({
                username,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });
            const token = jsonwebtoken_1.default.sign({ user_id: newUser._id, email }, 'dontputthesecrettokenhereinquotes', { expiresIn: '2h' });
            newUser.token = token;
            const res = yield newUser.save();
            return Object.assign({ id: res.id }, res._doc);
        }),
        loginUser: (_4, _d) => __awaiter(void 0, [_4, _d], void 0, function* (_, { loginInput: { email, password } }) {
            const user = yield User_1.default.findOne({ email });
            if (user && (yield bcrypt_1.default.compare(password, user.password))) {
                const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, 'dontputthesecrettokenhereinquotes', { expiresIn: '2h' });
                user.token = token;
                return Object.assign({ id: user.id }, user._doc);
            }
            else {
                throw new server_1.ApolloError('Incorrect email or password!');
            }
        }),
        saveBook: (_5, _e, context_2) => __awaiter(void 0, [_5, _e, context_2], void 0, function* (_, { book }, context) {
            if (context.user) {
                try {
                    const updatedUser = yield User_1.default.findByIdAndUpdate(context.user._id, { $addToSet: { savedBooks: book } }, { new: true });
                    return updatedUser;
                }
                catch (err) {
                    throw new Error('Error saving book!');
                }
            }
            throw new Error('You need to be logged in!');
        }),
        removeBook: (_6, _f) => __awaiter(void 0, [_6, _f], void 0, function* (_, { userId, bookId }) {
            const updatedUser = yield User_1.default.findOneAndUpdate({ _id: userId }, { $pull: { savedBooks: { bookId } } }, { new: true });
            if (!updatedUser) {
                throw new Error('Could not remove book!');
            }
            return updatedUser;
        }),
    },
};
exports.default = resolvers;

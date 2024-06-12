"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOVE_BOOK = exports.SAVE_BOOK = exports.LOGIN_USER = void 0;
const client_1 = require("@apollo/client");
// Mutations for login, create user, save book, and remove book
exports.LOGIN_USER = (0, client_1.gql) `
    mutation loginUser($loginInput: LoginInput!) {
        loginUser(loginInput: $loginInput) {
            email
            username
            token

                }
        }
`;
exports.SAVE_BOOK = (0, client_1.gql) `
    mutation SaveBook($book: SaveBookInput!) {
        saveBook(book: $book) {
            _id
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;
exports.REMOVE_BOOK = (0, client_1.gql) `
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

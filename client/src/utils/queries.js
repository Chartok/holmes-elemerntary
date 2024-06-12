"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEARCH_BOOKS = exports.QUERY_ME = void 0;
const client_1 = require("@apollo/client");
// Query to fetch logged-in user's data (including saved books)
exports.QUERY_ME = (0, client_1.gql) `
    query user($id: ID!) {
        user(id: $id) {
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
exports.SEARCH_BOOKS = (0, client_1.gql) `
    query SearchBooks($query: String!) {
        searchBooks(query: $query) {
            bookId
            title
            authors
            description
            image
            link
        }
    }
`;

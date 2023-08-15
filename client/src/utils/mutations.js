import { gql } from '@apollo/client';

// Mutations for login, create user, save book, and remove book
export const LOGIN_USER = gql`
    mutation loginUser($loginInput: LoginInput!) {
        loginUser(loginInput: $loginInput) {
            email
            username
            token

                }
        }
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($userId: ID!, $book: SaveBookInput!) {
        saveBook(userId: $userId, book: $book) {
            _id
            savedBooks {
                bookId
                title
                image
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
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
import { gql } from '@apollo/client';

// Query to fetch logged-in user's data (including saved books)
export const QUERY_ME = gql`
    query user {
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`;

export const SEARCH_BOOKS = gql`
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

export const GET_SAVED_BOOKS = gql`
    query GetSavedBooks {
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`;
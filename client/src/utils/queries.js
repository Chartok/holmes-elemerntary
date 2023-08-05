import { gql } from '@apollo/client';

// Query to fetch logged-in user's data (including saved books)
export const QUERY_ME = gql`
    query user {
        _id
        username
        email
        bookCount
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

// Query to fetch books from Google Books API
export const QUERY_BOOK = gql`
    query book {
        bookId
        authors
        description
        title
        image
        link
    }
`;

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

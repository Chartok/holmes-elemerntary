const { gql } = require('apollo-server-express');

// Create GraphQL typeDefs
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input LoginInput {
        email: String!
        username: String!
        password: String!
    }

    input CreateUserInput {
        username: String!
        email: String!
        password: String!
    }

    input SaveBookInput {
        bookId: String!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(input: LoginInput!): Auth
        createUser(input: CreateUserInput!): Auth
        saveBook(userId: ID!, book: SaveBookInput!): User
        removeBook(userId: ID!, bookId: String!): User
    }
`;

// Export typeDefs
module.exports = typeDefs;

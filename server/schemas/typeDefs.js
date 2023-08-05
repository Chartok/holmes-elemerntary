const { gql } = require('apollo-server-express');

// Create GraphQL typeDefs
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        token: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        url: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input RegisterInput {
        email: String!
        username: String!
        password: String!
        confirmPassword: String!
    }

    input SaveBookInput {
        bookId: String!
        authors: [String]
        description: String
        title: String!
        image: String
        url: String
    }

    type Query {
        book(term: String!): [Book!]!
        user(id: ID!): User!
    }

    type Mutation {
        loginUser(loginInput: LoginInput): User!
        registerUser(registerInput: RegisterInput): User!
        saveBook(userId: ID!, book: SaveBookInput!): User
        removeBook(userId: ID!, bookId: String!): User
    }
`;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_expresss_1 = require("apollo-server-expresss");
// Create GraphQL typeDefs
const typeDefs = (0, apollo_server_expresss_1.gql) `
	type User {
		_id: ID!
		username: String!
		email: String!
		token: String!
		bookCount: Int
		savedBooks: [Book]
	}

	type Book {
		bookId: String!
		authors: [String]
		description: String
		title: String!
		image: String
		link: String
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
		user: ID!
		bookId: String!
		authors: [String]
		description: String
		title: String!
		image: String
		link: String
	}

	type Query {
		searchBooks(query: String!): [Book]
		savedBooks: User!
		user(_id: ID!): User!
	}

	type Mutation {
		loginUser(loginInput: LoginInput): User!
		registerUser(registerInput: RegisterInput): User!
		saveBook(userId: ID!, book: SaveBookInput!): User
		removeBook(userId: ID!, bookId: String!): User
	}
`;
exports.default = typeDefs;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
const context_1 = require("@apollo/client/link/context");
const httpLink = (0, client_1.createHttpLink)({
    uri: 'http://localhost:5000/graphql'
});
const authLink = (0, context_1.setContext)((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});
const client = new client_1.ApolloClient({
    link: authLink.concat(httpLink),
    cache: new client_1.InMemoryCache()
});
exports.default = client;

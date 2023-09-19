require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const context = require('./utils/auth');
const mongoose = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Apollo Server Instance with defined typeDefs and resolvers; using context for user Auth
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const user = context({ req });
		return { user };
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

// Initialize apollo server with mongoDB instance; open channel for client/sever interaction
const startApollo = async () => {
	await server.start();
	server.applyMiddleware({ app, path: '/' });

	// Connection to mongoose..
	mongoose.connection.once('open', () => {
		console.log('Connection to mongoose successful...');
		app.use((err, req, res, next) => {
			console.log(err);
			res.status(500).send('The servers could not connect to mongoose...');
		});
    // Client connected to server
		app.listen(PORT, () => {
			console.log(`Now listening on localhost:${PORT}`);
			console.log(
				`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
			);
		});
	});
};

require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const context = require('./utils/auth');
const mongoose = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 5000;

// Create apollo server intance and user auth context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = context({ req });
    return { user };
  }
});


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initialize apollo server instance and open connection to mongoDB.
const startApollo = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/' });

  mongoose.connection.once('open', () => {
    console.log('Connected to database...')
    app.use((err, req, res, next) => {
      console.log(err);
      res.status(500).send('Something went wrong...');
    });
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};
startApollo();

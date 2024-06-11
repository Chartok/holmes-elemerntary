// require('dotenv').config();
// const express = require('express');
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const http = require('http');
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
// const cors = require('cors');
// const path = require('path');
// const { typeDefs, resolvers } = require('./schemas');
// 
// const context = require('./utils/auth');
// const mongoose = require('./config/connection');
// 
// const app = express();
// const httpServer = http.createServer(app);
// const PORT = process.env.PORT || 5000;
// 
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ],
// });
// 
// 
// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }
// 
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// 
// 
// const startApollo = async () => {
//   await server.start();
//   //server.applyMiddleware({ app, path: '/graphql' });
//   app.use(
//     '/graphql',
//     cors(),
//     express.json(),
//     expressMiddleware(server, {
// 
//       context: async ({ req }) => {
//         const user = context({ req });
//         return { user };
//       }
//     })
//   );
// 
//   mongoose.connection.once('open', () => {
//     console.log('Connected to database...')
//     app.use((err, req, res, next) => {
//       console.log(err);
//       res.status(500).send('Something went wrong...');
//     });
//     app.listen(PORT, () => {
//       console.log(`🌍 Now listening on localhost:${PORT}`);
//       console.log(`Use GraphQL at http://localhost:${PORT}/grapql}`);
//     });
//   });
// };
// startApollo();


import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import path from 'path';
import { typeDefs, resolvers } from './schemas';
import context from './utils/auth';
import mongoose from './config/connection';

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ],
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname, '../client/build')));
}


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const startApollo = async () => {
  await server.start();
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = context({ req });
        return { user };
      }
    })
  );

  mongoose.connection.once('open', () => {
    console.log('Connected to database...')
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(err);
      res.status(500).send('Something went wrong...');
    });
    app.listen(PORT, () => {
      console.log(`Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};
startApollo().catch((error) => {
  console.error('Error starting Apollo Server:', error);
});

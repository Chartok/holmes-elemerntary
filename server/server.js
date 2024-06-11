"use strict";
// require('dotenv').config();
// const express = require('express');
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const http = require('http');
// const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
// const cors = require('cors');
// const path = require('path');
// const { typeDefs, resolvers } = require('./schemas');
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const http_1 = __importDefault(require("http"));
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const schemas_1 = require("./schemas");
const auth_1 = __importDefault(require("./utils/auth"));
const connection_1 = __importDefault(require("./config/connection"));
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const PORT = process.env.PORT || 5000;
const server = new server_1.ApolloServer({
    typeDefs: schemas_1.typeDefs,
    resolvers: schemas_1.resolvers,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
});
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(_dirname, '../client/build')));
}
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const startApollo = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    app.use('/graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            const user = (0, auth_1.default)({ req });
            return { user };
        })
    }));
    connection_1.default.connection.once('open', () => {
        console.log('Connected to database...');
        app.use((err, req, res, next) => {
            console.log(err);
            res.status(500).send('Something went wrong...');
        });
        app.listen(PORT, () => {
            console.log(`Now listening on localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
});
startApollo().catch((error) => {
    console.error('Error starting Apollo Server:', error);
});

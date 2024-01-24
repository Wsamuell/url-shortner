"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const typeDef_1 = __importDefault(require("./typeDef"));
const resolver_1 = __importDefault(require("./resolver"));
// as any is a work around because applyiddleware doesnt take type  Application for some reason
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDef_1.default,
    resolvers: resolver_1.default,
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
};
startServer();

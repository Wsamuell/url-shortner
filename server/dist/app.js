"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
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
app.get('/:shortenedUrl', async (req, res) => {
    const { shortenedUrl } = req.params;
    try {
        const { rows } = await db_1.pool.query('SELECT original_url FROM url_list WHERE shortened_url = $1', [shortenedUrl]);
        if (rows.length === 1) {
            const originalUrl = rows[0].original_url;
            res.redirect(originalUrl);
        }
        else {
            res.status(404).send('Short URL not found');
        }
    }
    catch (err) {
        console.error('Error fetching URL by shortened URL', err);
        res.status(500).send('Internal Server Error');
    }
});

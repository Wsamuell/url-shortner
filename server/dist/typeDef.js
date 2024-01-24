"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Url {
    id: ID
    originalUrl: String
    shortenedUrl: String
    createdAt: String
    timesUsed: Int
  }

  type Query {
    getAllUrls: [Url]!
    getUrlById(id: ID!): Url
  }

  type Mutation {
    createShortenedUrl(originalUrl: String!): Url!
  }
`;
exports.default = typeDefs;

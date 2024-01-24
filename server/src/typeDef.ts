import { gql } from 'apollo-server-express';

const typeDefs = gql`
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

export default typeDefs;

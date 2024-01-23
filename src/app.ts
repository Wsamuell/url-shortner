import { ApolloServer, gql } from 'apollo-server-express';
import express, { Application } from 'express';

// definitely need to move this logic to a different file later

const typeDefs = gql`
  type Query {
    url: String
  }

  type Mutation {
    shortUrl(inputUrl: String!): String
  }
`;

const resolvers = {
  Query: {
    url: () => 'http/www.google.com',
  },
  Mutation: {
    shortUrl: ($url: String) => {
      return $url;
    },
  },
};

// as any is a work around because applyiddleware doesnt take type  Application for some reason
const server = new ApolloServer({
  typeDefs,
  resolvers,
}) as any;

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT as number, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer();

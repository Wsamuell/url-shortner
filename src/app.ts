import { ApolloServer, gql } from 'apollo-server-express';
import express, { Application } from 'express';

const typeDefs = gql`
  type Query {
    url: String
  }
`;

const resolvers = {
  Query: {
    url: () => 'http/www.google.com',
  },
};

// as any is a work around because applyiddleware doesnt take type  Application for some reason
const server = new ApolloServer({ typeDefs, resolvers }) as any;

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

server.applyMiddleware({ app });

app.listen({ PORT }, () => {
  console.log(`App is Listening on port ${PORT}`);
});

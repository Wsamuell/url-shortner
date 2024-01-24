import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import typeDefs from './typeDef';
import resolvers from './resolver';

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

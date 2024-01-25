import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { pool } from './db';
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

app.get('/:shortenedUrl', async (req, res) => {
  const { shortenedUrl } = req.params;

  try {
    const { rows } = await pool.query(
      'SELECT original_url FROM url_list WHERE shortened_url = $1',
      [shortenedUrl]
    );

    if (rows.length === 1) {
      const originalUrl = rows[0].original_url;
      res.redirect(originalUrl);
    } else {
      res.status(404).send('Short URL not found');
    }
  } catch (err) {
    console.error('Error fetching URL by shortened URL', err);
    res.status(500).send('Internal Server Error');
  }
});
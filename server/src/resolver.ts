import { pool } from './db';

const resolvers = {
  Query: {
    getAllUrls: async () => {
      try {
        const urls = await pool.query('SELECT * FROM url_list');
        return urls.rows;
      } catch (err) {
        console.error('Error fetchcing All URLs', err);
        throw new Error('Unable to fetch all URLs');
      }
    },
    getUrlById: async (id: number) => {
      try {
        const urls = await pool.query('SELECT * FROM url_list WHERE id = $1', [
          id,
        ]);
        return urls.rows;
      } catch (err) {
        console.error('Error fetching URL by ID', err);
        throw new Error('Unable to fetch URL by ID');
      }
    },
  },

  // ignoring mutation for now since i have to try making sure the db setup works as normal
  Mutation: {},
};
export default resolvers;

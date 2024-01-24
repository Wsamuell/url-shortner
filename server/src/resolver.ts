import { pool } from './db';

type UrlData = {
  id: number;
  original_url: string;
  shortened_url: string;
  created_at: Date;
  times_used: number;
};

const resolvers = {
  Query: {
    getAllUrls: async () => {
      try {
        const urls = await pool.query('SELECT * FROM url_list');
        console.log(urls.rows);
        return urls.rows.map((url: UrlData) => ({
          id: url.id,
          originalUrl: url.original_url,
          shortenedUrl: url.shortened_url,
          createdAt: url.created_at.toISOString(),
          timesUsed: url.times_used,
        }));
      } catch (err) {
        console.error('Error fetching All URLs', err);
        throw new Error('Unable to fetch all URLs');
      }
    },

    getUrlByUrl: async (_: any, { url }: { url: string }) => {
      try {
        const urls = await pool.query(
          'SELECT * FROM url_list WHERE original_url = $1',
          [url]
        );

        if (urls.rows.length === 1) {
          const url: UrlData = urls.rows[0];
          return {
            id: url.id,
            originalUrl: url.original_url,
            shortenedUrl: url.shortened_url,
            createdAt: url.created_at.toISOString(),
            timesUsed: url.times_used,
          };
        } else {
          throw new Error('URL not found');
        }
      } catch (err) {
        console.error('Error fetching URL by Url', err);
        throw new Error('Unable to fetch URL by Url');
      }
    },
  },

  // ignoring mutation for now since i have to try making sure the db setup works as normal
  Mutation: {},
};
export default resolvers;

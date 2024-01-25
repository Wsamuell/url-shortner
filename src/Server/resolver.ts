import { pool } from './db';
import { nanoid } from 'nanoid';

// type UrlData = QueryResult['rows'][0];

// im not sure which one is better but not using yhe QueryResult type is proving to be more helpful locally

type UrlData = {
  id: number;
  original_url: string;
  shortened_url: string;
  created_at: Date;
  times_used: string;
};

const resolvers = {
  Query: {
    getAllUrls: async () => {
      try {
        const { rows: urls } = await pool.query('SELECT * FROM url_list');
        return urls.map(
          ({
            id,
            original_url,
            shortened_url,
            created_at,
            times_used,
          }: UrlData) => ({
            id,
            originalUrl: original_url,
            shortenedUrl: shortened_url,
            createdAt: created_at.toISOString(),
            timesUsed: times_used,
          })
        );
      } catch (err) {
        console.error('Error fetching All URLs', err);
        throw new Error('Unable to fetch all URLs');
      }
    },

    getUrlByUrl: async (_: any, { url }: { url: string }) => {
      try {
        const { rows: urls } = await pool.query(
          'SELECT * FROM url_list WHERE original_url = $1',
          [url]
        );

        if (urls.length === 1) {
          const {
            id,
            original_url,
            shortened_url,
            created_at,
            times_used,
          }: UrlData = urls[0];

          return {
            id,
            originalUrl: original_url,
            shortenedUrl: shortened_url,
            createdAt: created_at.toISOString(),
            timesUsed: times_used,
          };
        } else {
          const shortId: string = nanoid(7);
          const { rows: newUrl } = await pool.query(
            'INSERT INTO url_list(original_url, shortened_url) VALUES($1, $2) RETURNING *',
            [url, shortId]
          );
          const {
            id,
            original_url,
            shortened_url,
            created_at,
            times_used,
          }: UrlData = newUrl[0];

          return {
            id,
            originalUrl: original_url,
            shortenedUrl: shortened_url,
            createdAt: created_at.toISOString(),
            timesUsed: times_used,
          };
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

import { pool } from './db';
import { Pool, QueryResult } from 'pg';

type UrlData = QueryResult['rows'][0];

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

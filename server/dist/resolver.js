"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const resolvers = {
    Query: {
        getAllUrls: async () => {
            try {
                const urls = await db_1.pool.query('SELECT * FROM url_list');
                console.log(urls.rows);
                return urls.rows.map((url) => ({
                    id: url.id,
                    originalUrl: url.original_url,
                    shortenedUrl: url.shortened_url,
                    createdAt: url.created_at.toISOString(),
                    timesUsed: url.times_used,
                }));
            }
            catch (err) {
                console.error('Error fetching All URLs', err);
                throw new Error('Unable to fetch all URLs');
            }
        },
        getUrlByUrl: async (_, { url }) => {
            try {
                const urls = await db_1.pool.query('SELECT * FROM url_list WHERE original_url = $1', [url]);
                if (urls.rows.length === 1) {
                    const url = urls.rows[0];
                    return {
                        id: url.id,
                        originalUrl: url.original_url,
                        shortenedUrl: url.shortened_url,
                        createdAt: url.created_at.toISOString(),
                        timesUsed: url.times_used,
                    };
                }
                else {
                    throw new Error('URL not found');
                }
            }
            catch (err) {
                console.error('Error fetching URL by Url', err);
                throw new Error('Unable to fetch URL by Url');
            }
        },
    },
    // ignoring mutation for now since i have to try making sure the db setup works as normal
    Mutation: {},
};
exports.default = resolvers;

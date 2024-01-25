"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const nanoid_1 = require("nanoid");
const resolvers = {
    Query: {
        getAllUrls: async () => {
            try {
                const { rows: urls } = await db_1.pool.query('SELECT * FROM url_list');
                return urls.map(({ id, original_url, shortened_url, created_at, times_used, }) => ({
                    id,
                    originalUrl: original_url,
                    shortenedUrl: shortened_url,
                    createdAt: created_at.toISOString(),
                    timesUsed: times_used,
                }));
            }
            catch (err) {
                console.error('Error fetching All URLs', err);
                throw new Error('Unable to fetch all URLs');
            }
        },
        getUrlByUrl: async (_, { url }) => {
            try {
                const { rows: urls } = await db_1.pool.query('SELECT * FROM url_list WHERE original_url = $1', [url]);
                if (urls.length === 1) {
                    const { id, original_url, shortened_url, created_at, times_used, } = urls[0];
                    return {
                        id,
                        originalUrl: original_url,
                        shortenedUrl: shortened_url,
                        createdAt: created_at.toISOString(),
                        timesUsed: times_used,
                    };
                }
                else {
                    const shortId = (0, nanoid_1.nanoid)(7);
                    const { rows: newUrl } = await db_1.pool.query('INSERT INTO url_list(original_url, shortened_url) VALUES($1, $2) RETURNING *', [url, shortId]);
                    const { id, original_url, shortened_url, created_at, times_used, } = newUrl[0];
                    return {
                        id,
                        originalUrl: original_url,
                        shortenedUrl: shortened_url,
                        createdAt: created_at.toISOString(),
                        timesUsed: times_used,
                    };
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

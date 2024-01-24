"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
// const {
//   DB: dbstring = '',
//   DB_PASSWORD: dbPassword = '',
//   DB_PORT: port = '3000',
// } = process.env;
// if (!dbstring || !dbPassword) {
//   console.error('Missing required environment variables.');
//   process.exit(1);
// }
const pool = new pg_1.Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'url_shortner_db',
    user: process.env.DB_USER || 'samuelwemimo',
    password: process.env.DB_PASSWORD || '',
});
exports.pool = pool;

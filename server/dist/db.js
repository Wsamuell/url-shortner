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
    host: 'localhost',
    port: 5432,
    database: 'url_shortner_db',
    user: 'samuelwemimo',
    password: '',
});
exports.pool = pool;

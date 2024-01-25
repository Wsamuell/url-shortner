import { Pool } from 'pg';

// const {
//   DB: dbstring = '',
//   DB_PASSWORD: dbPassword = '',
//   DB_PORT: port = '3000',
// } = process.env;

// if (!dbstring || !dbPassword) {
//   console.error('Missing required environment variables.');
//   process.exit(1);
// }

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'url_shortner_db',
  user: 'samuelwemimo',
  password: '',
});
// const pool = new Pool({
//   host: process.env.DB_HOST || 'localhost',
//   port: Number(process.env.DB_PORT) || 5432,
//   database: process.env.DB_NAME || 'url_shortner_db',
//   user: process.env.DB_USER || 'samuelwemimo',
//   password: process.env.DB_PASSWORD || '',
// });

export { pool };

import pgPromise from 'pg-promise';
const pgp = pgPromise();
const { DB: dbstring = '', DB_PASSWORD: dbPassword = '', DB_PORT: port = '3000', } = process.env;
if (!dbstring || !dbPassword) {
    console.error('Missing required environment variables.');
    process.exit(1);
}
const connectionData = {
    host: 'localhost',
    port: Number(port),
    database: dbstring,
    user: 'user-name',
    password: dbPassword,
};
const db = pgp(connectionData);
export { db, pgp };

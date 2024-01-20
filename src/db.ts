import pgPromise, { IMain, IDatabase } from 'pg-promise';

const pgp: IMain = pgPromise();

const {
  DB: dbstring = '',
  DB_PASSWORD: dbPassword = '',
  DB_PORT: port = '3000',
} = process.env;

const connectionData = {
  host: 'localhost',
  port: Number(port),
  database: dbstring,
  user: 'user-name',
  password: dbPassword,
};

const db: IDatabase<any> = pgp(connectionData);

export { db, pgp };

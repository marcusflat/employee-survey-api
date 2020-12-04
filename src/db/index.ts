import { Pool } from 'pg';

const configDefault = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  connectionTimeoutMillis: 5000,
  max: 10
}

const pool = new Pool(configDefault);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

export const query = (text: any, params: any) => pool.query(text, params);

export const getClient = () => pool.connect();


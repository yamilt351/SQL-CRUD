import pg from 'pg';
import { config } from 'dotenv';
config();
const { Pool } = pg;
export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: process.env.USERNAME_SQL,
  password: process.env.PASSWORD,
});


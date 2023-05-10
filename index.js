import express from 'express';
import importMiddlewares from './midlewareHandler.js';
import { config } from 'dotenv';
import pg from 'pg';
import router from './server/user.controller.js';

config();

const { Pool } = pg;
const app = express();
const middlewares = await importMiddlewares();
export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: process.env.USERNAME_SQL,
  password: process.env.PASSWORD,
});

middlewares.forEach((middleware) => {
  app.use(middleware);
});

const apiRouthes = [{ route: '/users', controller: router }];

for (const controller of apiRouthes) {
  console.log(controller.controller);
  app.use(controller.route, controller.controller);
}

pool.connect().then((client) => {
  console.log('connect to db');
  client
    .query('SELECT NOW()')
    .then((res) => {
      console.log('result:', res.rows[0]);
      client.release();
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(process.env.PORT, () => {
  console.log('listening on port' + process.env.PORT);
});

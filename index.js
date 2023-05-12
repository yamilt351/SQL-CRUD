import express from 'express';
import importMiddlewares from './midlewareHandler.js';
import router from './server/user.controller.js';
import { pool } from './server.js';
import errorHandler from './helpers/errorHandler.js';


const app = express();
const middlewares = await importMiddlewares();
export const JWT_TOKEN= process.env.TOKEN

// middlewares
middlewares.forEach((middleware) => {
  app.use(middleware);
});

// routes
const apiRouthes = [{ route: '/users', controller: router }];

for (const controller of apiRouthes) {
  app.use(controller.route, controller.controller);
}
app.use(errorHandler);
//client
pool.connect().then((client) => {
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

// server
app.listen(process.env.PORT, () => {});

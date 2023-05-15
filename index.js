import express from 'express';
import importMiddlewares from './midlewareHandler.js';
import userRouter from './server/users/user.controller.js';
import taskRouter from './server/tasks/tasks.controller.js';
import { pool } from './server.js';
import errorHandler from './server/helpers/errorHandler.js'

const app = express();
const middlewares = await importMiddlewares();
export const JWT_TOKEN = process.env.TOKEN;

// middlewares
middlewares.forEach((middleware) => {
  console.log(middleware);
  app.use(middleware);
});

// routes


const apiRouthes = [
  { route: '/users', controller: userRouter },
  { route: '/tasks', controller: taskRouter },
];

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

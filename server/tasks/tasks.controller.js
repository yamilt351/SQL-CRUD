import { Router } from 'express';
import taskActions from './tasksActions.js';
const router = Router();

router.post('/tasks', createTasks);
router.get('/tasks', getTasks);
router.put('/tasks', editTasks);
router.get('/search/tasks', searchTasks);
router.delete('/tasks', deleteTasks);

function createTasks(req, res, next) {
  taskActions
    .createTasks(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

function getTasks(req, res, next) {
  taskActions
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}
function editTasks(req, res, next) {
  taskActions
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

function deleteTasks(req, res, next) {
  taskActions
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}
function searchTasks(req, res, next) {
  taskActions
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

export default router;

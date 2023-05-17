import { Router } from 'express';
import taskActions from './tasksActions.js';
import authMiddleware from '../helpers/jwt.js';

const router = Router();

router.post('/', authMiddleware, createTasks);
router.get('/', authMiddleware, getTasks);
router.put('/:id', authMiddleware, editTasks);
router.delete('/:id', authMiddleware, deleteTasks);

async function createTasks(req, res, next) {
  const userId = await req.user.id;
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'Name or Description cannot be empty' });
  } else {
    taskActions
      .createTasks(req.body, userId)
      .then((task) => res.json(task))
      .catch((error) => next(error));
  }
}

function getTasks(req, res, next) {
  taskActions
    .getTasks(req.user.id)
    .then((task) => res.json(task))
    .catch((error) => next(error));
}

async function editTasks(req, res, next) {
  const id = req.params.id;
  const checkProperty = await taskActions.compareId(id, req.user.id);
  if (!req.body.name || !req.body.description) {
    res.status(400).send();
  } else if (!checkProperty) {
    res.status(401).send();
  } else {
    taskActions
      .editTasks(req.body, id)
      .then((task) => res.json(task))
      .catch((error) => next(error));
  }
}

async function deleteTasks(req, res, next) {
  const task = await taskActions.compareId(req.params.id, req.user.id);
  if (!task) {
    res.status(401).send();
  } else {
    taskActions
      .deleteTasks(task)
      .then((rowCount) =>
        rowCount > 0
          ? res
              .status(200)
              .json({ message: `Task with id ${req.params.id} deleted` })
          : res.status(400).json({
              message: `Could not delete the task with id ${req.params.id}`,
            }),
      )
      .catch((error) => next(error));
  }
}

export default router;

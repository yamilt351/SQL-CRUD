import { Router } from 'express';
import taskActions from './tasksActions.js';
const router = Router();

router.post('/create', createTasks);
router.get('/getAll', getTasks);
router.get('/getBy?date=:date', getByDate);
router.get('/getBy?query=:query', searchTask);
router.get('/:id', getTasksById);
router.put('/:id', editTasks);
router.delete('/:id', deleteTasks);

function createTasks(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'Name or Description cannot be empty' });
  } else {
    taskActions
      .createTasks(req.body)
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
function getTasksById(req, res, next) {
  taskActions
    .getTasksById(req.params.id)
    .then((task) => res.json(task))
    .catch((error) => next(error));
}

function getByDate(req, res, next) {
  taskActions
    .getByDate(req.query.date)
    .then((task) => res.json(task))
    .catch((error) => next(error));
}
function editTasks(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400);
  } else if (req.params.id !== req.body.id) {
    res.status(401);
  } else {
    taskActions
      .editTasks(req.body)
      .then((task) => res.json(task))
      .catch((error) => next(error));
  }
}

function deleteTasks(req, res, next) {
  if (req.params.id !== req.body.id) {
    res.status(401);
  } else {
    taskActions
      .deleteTasks(req.params.id)
      .then((task) =>
        task
          ? res.status(200).json(task)
          : res.status(400).json({
              message: `Could not delete the task with id ${req.params.id}`,
            }),
      )
      .catch((error) => next(error));
  }
}
function searchTask(req, res, next) {
  if (!req.query.query) {
    res.status(400).json({ message: 'query cannot be empty' });
  } else {
    taskActions
      .searchTask(req.query.query)
      .then((task) => res.json(task))
      .catch((error) => next(error));
  }
}

export default router;

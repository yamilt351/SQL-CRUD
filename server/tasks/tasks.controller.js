import { Router } from 'express';
import taskActions from './tasksActions.js';
const router = Router();

router.post('/tasks', createTasks);
router.get('/tasks', getTasks);
router.get('/tasks?date=:date', getByDate);
router.get('/task?query=:query', searchTask);
router.get('/tasks/:id', getTasksById);
router.put('/tasks/:id', editTasks);
router.delete('/tasks/:id', deleteTasks);

function createTasks(req, res, next) {
  taskActions
    .createTasks(req.body)
    .then((task) => res.json(task))
    .catch((error) => next(error));
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
  taskActions
    .editTasks(req.body)
    .then((task) => res.json(task))
    .catch((error) => next(error));
}

function deleteTasks(req, res, next) {
  taskActions
    .deleteTasks(req.params.id)
    .then((task) =>
      !task
        ? res.status(200).json({
            message: `task with id ${req.params.id} was deleted succesfully`,
          })
        : res.status(400).json({
            message: `Could not delete the task with id ${req.params.id}`,
          }),
    )
    .catch((error) => next(error));
}
function searchTask(req, res, next) {
  taskActions
    .searchTask(req.query.query)
    .then((task) => res.json(task))
    .catch((error) => next(error));
}

export default router;

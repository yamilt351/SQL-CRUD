import { Router } from 'express';
const router = Router();

router.post('/tasks', createTasks);
router.get('/tasks', getTasks);
router.put('/tasks', editTasks);
router.get('/search/tasks', searchTasks);
router.delete('/tasks', deleteTasks);

function createTasks(req, res, next) {
asdas
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

function getTasks(req, res, next) {
ads
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}
function editTasks(req, res, next) {
asdas
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

function deleteTasks(req, res, next) {
ads
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}
function searchTasks(req, res, next) {
ads
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

export default router;

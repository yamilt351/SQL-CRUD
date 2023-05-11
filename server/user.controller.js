import { Router } from 'express';
import UserActions from './userActions.js';
const router = Router();

router.post('/signIn', signIn);
router.put('/editUser', editUser);
router.post('/signUp', signUp);
router.delete('/deleteUser', deleteUser);
router.get('/getUserById', getById);

function signIn(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'bad request' });
  }
  UserActions.signIn(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res
            .status(404)
            .json({ message: 'user with those credentials not found' }),
    )
    .catch((error) => next(error));
}

function signUp(req, res, next) {
  UserActions.signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

function editUser(req, res, next) {
  UserActions.editUser(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

function deleteUser(req, res, next) {
  UserActions.deleteUser(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

function getById(req, res, next) {
  UserActions.getById(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

export default router;

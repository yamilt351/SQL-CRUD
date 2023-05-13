import { Router } from 'express';
import userActions from './userActions.js';
const router = Router();

router.post('/signIn', signIn);
router.put('/editUser', editUser);
router.post('/signUp', signUp);
router.delete('/deleteUser', deleteUser);

function signIn(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'bad request' });
  } else {
    userActions
      .signIn(req.body)
      .then(({ dbUser, sendToken }) => {
        if (dbUser) {
          res.cookie('token', sendToken, {
            httpOnly: true,
            secure: true,
          });
          res.json(dbUser);
        } else {
          res
            .status(404)
            .json({ message: 'user with those credentials not found' });
        }
      })
      .catch((error) => next(error));
  }
}

function signUp(req, res, next) {
  userActions
    .signUp(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

function editUser(req, res, next) {
  userActions
    .editUser(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

function deleteUser(req, res, next) {
  userActions
    .deleteUser(req.body)
    .then((user) => res.json(user))
    .catch((error) => next(error));
}

export default router;

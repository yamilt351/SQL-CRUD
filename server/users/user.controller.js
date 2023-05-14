import { Router } from 'express';
import userActions from './userActions.js';
const router = Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);

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

export default router;

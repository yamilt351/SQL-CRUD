import { pool } from '../server.js';
import bcrypt from 'bcryptjs';
const client = await pool.connect();
import { JWT_TOKEN } from '../index.js';
import jwt from 'jsonwebtoken';

export async function token(userId, cookie) {
  const sendToken = jwt.sign({ id: userId }, JWT_TOKEN);
  console.log(sendToken);
  cookie.set('token', sendToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
}

async function signIn(user) {
  const email = user.email;
  const password = user.password;
  const alreadyExists = await findEmail(email);
  if (!alreadyExists) {
    return null;
  } else {
    const dbUser = alreadyExists;
    const passwordMatch = await bcrypt.compare(password, dbUser.password);
    if (passwordMatch) {
      return dbUser;
    } else {
      return null;
    }
  }
}

async function findEmail(email) {
  const result = await client.query('SELECT * FROM users WHERE email =$1', [
    email,
  ]);
  if (result.rowCount > 0) {
    const user = result.rows[0];
    return user;
  } else {
    return false;
  }
}

async function encrypt(user) {
  const bcryptSalt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash(user.password, bcryptSalt);
  return hashed;
}

async function signUp(user) {
  const alreadyExists = await findEmail(user.email, client);
  if (!alreadyExists) {
    const encryptedPass = await encrypt(user);
    const result = await client.query(
      'INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *',
      [user.email, encryptedPass],
    );
    return result.rows[0];
  } else {
    throw new Error('bad request');
  }
}

const UserActions = {
  signIn,
  signUp,
};
export default UserActions;

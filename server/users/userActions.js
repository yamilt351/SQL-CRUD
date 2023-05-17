import { pool } from '../../server.js';
import bcrypt from 'bcryptjs';
import { JWT_TOKEN } from '../../index.js';
import jwt from 'jsonwebtoken';

const client = await pool.connect();
const userActions = {
  signIn,
  signUp,
};

async function findUserByEmail(email) {
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

async function hasPassword(user) {
  const validPassword = validatePassword(user.password);
  if (validPassword) {
    const bcryptSalt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(user.password, bcryptSalt);
    return hashed;
  } else {
    throw new Error('bad request');
  }
}

export async function generateToken(userId) {
  const sendToken = jwt.sign({ id: userId }, JWT_TOKEN, {
    expiresIn: '48h',
  });
  return sendToken;
}

async function signIn(user) {
  const email = user.email;
  const password = user.password;
  const alreadyExists = await findUserByEmail(email);
  if (!alreadyExists) {
    return false;
  } else {
    const dbUser = alreadyExists;
    const passwordMatch = await bcrypt.compare(password, dbUser.password);
    if (passwordMatch) {
      const sendToken = await generateToken(dbUser.id);
      return { dbUser, sendToken };
    } else {
      return false;
    }
  }
}

async function signUp(user) {
  const validEmail = validateEmail(user.email);
  if (validEmail) {
    const alreadyExists = await findUserByEmail(user.email, client);
    if (!alreadyExists) {
      const encryptedPass = await hasPassword(user);
      const result = await client.query(
        'INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *',
        [user.email, encryptedPass],
      );
      return result.rows[0];
    } else {
      throw new Error('bad request');
    }
  } else {
    throw new Error('bad request');
  }
}

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default userActions;

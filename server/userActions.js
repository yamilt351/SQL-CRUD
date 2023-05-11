import { pool } from '../server.js';
import bcrypt from 'bcryptjs';

async function signIn(user) {
  const client = await pool.connect();

  const result = await client.query(
    'SELECT * FROM users WHERE email = $1 AND password = $2',
    [user.email, user.password],
  );

  if (result.rowCount === 0) {
    return null;
  } else {
    const user = result.rows[0];
    client.release();
    return user;
  }
}

async function findEmail(email, client) {
  const result = await client.query('SELECT * FROM users WHERE email =$1', [
    email,
  ]);

  if (result.rowCount > 0) {
    const user = result.rows[0];
    await client.release();
    return user;
  } else {
    await client.release();
    return null;
  }
}

async function encrypt(user) {
  const bcryptSalt = bcrypt.genSaltSync(12);
  const salt = bcryptSalt;
  const hash = await bcrypt.hash(user.password, salt);
  return hash;
}

async function signUp(user) {
  const client = await pool.connect();

  const alreadyExists = await findEmail(user.email, client);
  if (!alreadyExists) {
    const encryptedPass = await encrypt(user);
    console.log(encryptedPass);
    const result = await client.query(
      'INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *',
      [user.email, encryptedPass],
    );
    console.log(result);
    client.release();
    return result;
  } else {
    throw new Error('bad request');
  }
}

const UserActions = {
  signIn,
  signUp,
};
export default UserActions;

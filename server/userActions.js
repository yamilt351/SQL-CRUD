import { pool } from '../server.js';
import bcrypt from 'bcryptjs';

async function signIn(user) {
  const client = await pool.connect();

  const result = await client.query(
    'SELECT * FROM users WHERE email = $1',
    [user.email],
  );

  if (result.rowCount === 0) {
    return null;
  } else {
    const dbUser = result.rows[0];
    const passwordMatch = await bcrypt.compare(user.password, dbUser.password);
    console.log(passwordMatch);
    if (passwordMatch) {
      client.release();
      return dbUser;
    } else {
      return null;
    }
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
  const bcryptSalt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(user.password, bcryptSalt);
  return hash;
}

async function signUp(user) {
  const client = await pool.connect();

  const alreadyExists = await findEmail(user.email, client);
  if (!alreadyExists) {
    const encryptedPass = await encrypt(user);

    const result = await client.query(
      'INSERT INTO users (email,password) VALUES ($1,$2) RETURNING *',
      [user.email, encryptedPass],
    );
    // client.release();
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

import { pool } from '../server.js';

async function signIn({ user }) {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT * FROM user WHERE email = $1 AND password = $2',
      [user.email, user.password],
    );
    if (result.rowCount === 0) {
      return null;
    } else {
      const user = result.rows[0];
      return user;
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
}

async function findEmail(email, client) {
  try {
    const result = await client.query('SELECT * FROM user WHERE email =$1', [
      email,
    ]);
    if (result.rowCount > 0) {
      return res.status(400).json({ message: 'bad request' });
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.release;
  }
}

async function signUp(user) {
  console.log(user);
  const client = await pool.connect();
  try {
    findEmail(user.email, client);
    const result = await client.query(
      'INSERT INTO user (user,email) VALUES ($1,$2) RETURNING *',
      [user.email, user.password],
    );
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
}

const UserActions = {
  signIn,
  signUp,
};
export default UserActions;

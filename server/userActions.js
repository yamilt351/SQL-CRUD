import { pool } from '../index.js';

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

async function signUp(params) {
  
}
const UserActions = {
  signIn,
};
export default UserActions;

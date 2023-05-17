import { pool } from '../../server.js';

const client = await pool.connect();
const taskActions = {
  createTasks,
  getTasks,
  editTasks,
  deleteTasks,
  compareId,
};

async function createTasks(body, userId) {
  const addTask = await client.query(
    'INSERT INTO task (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
    [body.name, body.description, userId],
  );
  return addTask.rows[0];
}

async function getTasks(userId) {
  const getTasksByUserId = await client.query(
    'SELECT * FROM task WHERE user_id=$1',
    [userId],
  );
  return getTasksByUserId.rows;
}

async function editTasks(body, id) {
  const editedTasks = await client.query(
    `UPDATE task SET name=\$1, description=\$2 WHERE id=\$3 RETURNING *`,
    [body.name, body.description, id],
  );
  return editedTasks.rows[0];
}

async function deleteTasks(task) {
  const deleteTasksById = await client.query('DELETE FROM task WHERE id=$1', [
    task.id,
  ]);
  return deleteTasksById.rowCount;
}

async function compareId(postid, userid) {
  const findPost = await client.query('SELECT * FROM task WHERE id=$1', [
    postid,
  ]);
  if (findPost.rows[0].user_id === userid) {
    return findPost.rows[0];
  } else {
    return null;
  }
}
export default taskActions;

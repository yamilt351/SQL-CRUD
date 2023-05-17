import { pool } from '../../server.js';

const client = await pool.connect();
const taskActions = {
  createTasks,
  getTasks,
  editTasks,
  deleteTasks,
  getByDate,
  searchTask,
  getTasksById,
};

async function createTasks(body, userId) {
  console.log(userId);
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

async function getByDate(date) {
  const getTaskByDate = await client.query(
    'SELECT * FROM task WHERE updatet_at=$1',
    [date],
  );
  return getTaskByDate.rows[0];
}

async function getTasksById(taskId) {
  const getById = await client.query('SELECT * FROM task WHERE id=$1', [
    taskId,
  ]);
  return getById.rows[0];
}

async function searchTask(query) {
  const getByQuery = await client.query(
    'SELECT * FROM task WHERE name LIKE $1 OR description LIKE $1',
    [`%${query}%`],
  );
  return getByQuery.rows;
}

async function editTasks(body) {
  const getTasks = await client.query(
    `UPDATE task SET name=$1, description=$2 WHERE id=$3`,
    [body.name, body.description, body.id],
  );
  return getTasks.rows[0];
}

async function deleteTasks(taskId) {
  const deleteTasksById = await client.query('DELETE FROM task WHERE id=$1', [
    taskId,
  ]);
  return deleteTasksById;
}

export default taskActions;

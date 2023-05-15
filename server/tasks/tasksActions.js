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

async function createTasks(body) {
  const addTask = await client.query('INSERT INTO tasks (name, description)');
}
async function getTasks(userId) {}
async function getByDate(date) {}
async function getTasksById(taskId) {}
async function searchTask(query) {}
async function editTasks(body) {}
async function deleteTasks(taskId) {}

export default taskActions;

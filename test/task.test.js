const Request = require('supertest');
const { expect } = require('chai');
const myReq = Request('http://localhost:4000');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.TOKEN;

function generateAccessToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1800s' });
}

describe('Create task', () => {
  let token;
  let testUser;
  const test = { name: 'created', description: '123123123213' };

  beforeEach(() => {
    testUser = {
      id: 9,
      email: '12234l@hotmail',
      password: '134',
      created_at: '2023-05-11T13:47:41.354Z',
      updated_at: '2023-05-11T13:47:41.354Z',
    };

    token = generateAccessToken(testUser.id);
  });

  it('should return status 201 if the task is created POST (/tasks)', async () => {
    const response = await myReq
      .post('/tasks')
      .set('Cookie', `token=${token}`)
      .send(test);
    expect(response.statusCode).to.be.equal(200);
  });

  it('should return status code 401 if the user is not logged POST (/tasks)', async () => {
    const response = await myReq.post('/tasks').send(test);
    expect(response.statusCode).to.be.equal(401);
  });
});

describe('Edit Task', () => {
  let token;
  let testUser;
  const test = { name: 'edited__test', description: '123123123213' };
  const taskId = 30;

  beforeEach(() => {
    testUser = {
      id: 9,
      email: '12234l@hotmail',
      password: '134',
      created_at: '2023-05-11T13:47:41.354Z',
      updated_at: '2023-05-11T13:47:41.354Z',
    };

    token = generateAccessToken(testUser.id);
  });

  it('should return status 200 if the user is the correct user and send a proper body request PUT (/tasks/:id)', async () => {
    const response = await myReq
      .put(`/tasks/${taskId}`)
      .set('Cookie', `token=${token}`)
      .send(test);
    expect(response.statusCode).to.be.equal(200);
  });

  it('should return status code 401 if the user is not logged PUT (/tasks/:id)', async () => {
    const response = await myReq.put(`/tasks/${taskId}`).send(test);
    expect(response.statusCode).to.be.equal(401);
  });
});

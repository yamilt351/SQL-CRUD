const Request = require('supertest');
const { expect } = require('chai');
const myReq = Request('http://localhost:4000');

const test = {
  user_id: '1',
  name: '134',
  description: 'firs task',
  hide: false,
  task_day: 2023 / 22 / 21,
};
const emptyTest = {
  user_id: '1',
  name: '',
  description: '',
  hide: false,
  task_day: 2023 / 22 / 21,
};
const emptyDescription = {
  user_id: '',
  name: '134',
  description: '',
  hide: false,
  task_day: 2023 / 22 / 21,
};
const emptyName = {
  user_id: '',
  name: '',
  description: 'firs task',
  hide: false,
  task_day: 2023 / 22 / 21,
};

describe('Create task', () => {
  it('should return status code 200 if the user is loged POST (/tasks/create)', async () => {
    const response = await myReq.post('/tasks/create').send(test);
    expect(response.statusCode).to.be.equal(200);
  });
  it('should return status code 401 if the user is not loged POST (/tasks/create)', async () => {
    const response = await myReq.post('/tasks/create').send(test);
    expect(response.statusCode).to.be.equal(401);
  });
  it(' should return status code 400 if the user send empty body POST (/tasks/create)', async () => {
    const response = await myReq.post('/tasks/create').send(emptyTest);
    expect(response.statusCode).to.be.equal(400);
  });
  it(' should return status code 400 if the user send empty Description POST (/tasks/create)', async () => {
    const response = await myReq.post('/tasks/create').send(emptyDescription);
    expect(response.statusCode).to.be.equal(400);
  });
  it(' should return status code 400 if the user send empty Name POST (/tasks/create)', async () => {
    const response = await myReq.post('/tasks/create').send(emptyName);
    expect(response.statusCode).to.be.equal(400);
  });
});

describe('Edit Task', () => {
  it('should return status 200 if the user is the correct user and send a proper body request PUT (/tasks/edit)', async () => {
    const response = await myReq.post('/tasks/editTask').send(test);
    expect(response.statusCode).to.be.equal(200);
  });
  it('should return status code 401 if the user is not loged POST (/tasks/create)', async () => {
    const response = await myReq.post('/tasks/editTask').send(test);
    expect(response.statusCode).to.be.equal(401);
  });
  it(' should return status code 400 if the user send empty body POST (/tasks/create)', async () => {
    const response = await myReq.post('/tasks/editTask').send(emptyTest);
    expect(response.statusCode).to.be.equal(400);
  });
  it(' should return status code 400 if the user send empty Description POST (/tasks/create)', async () => {
    const response = await myReq.post('/tasks/editTask').send(emptyDescription);
    expect(response.statusCode).to.be.equal(400);
  });
  it(' should return status code 400 if the user send empty Name POST (/tasks/create)', async () => {
    const response = await myReq.post('/tasks/editTask').send(emptyName);
    expect(response.statusCode).to.be.equal(400);
  });
});

describe('Delete task', () => {
  it(' should return status code 401 if the task is deleted succesfully DELETE (/:id)', async () => {
    const response = await myReq.delete(`/${id}`);
    expect(response.statusCode).to.be.equal(401);
  });
});

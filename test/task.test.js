const Request = require('supertest');
const { expect } = require('chai');
const session = require('supertest-session');
const express = require('express');
const app = express();
const mySession = session(app);
const myReq = Request('http://localhost:4000');

const test = {
  user_id: '1',
  name: '134',
  description: 'firs task',
  hide: false,
  task_day: 2023 / 22 / 21,
};


describe('Create task', () => {
  beforeEach(async () => {
    await mySession
      .post('/users/signin')
      .send({ email: '12234l@hotmail', password: '134' });
  });
  it('should return status code 200 if the user is logged in POST (/tasks/)', async () => {
    const response = await mySession.post('/tasks/').send(test);
    expect(response.statusCode).to.be.equal(200);
  });
  it('should return status code 401 if the user is not logged in POST (/tasks/)', async () => {
    const response = await mySession.post('/tasks/').send(test);
    expect(response.statusCode).to.be.equal(401);
  });
});

// describe('Edit Task', () => {
//   beforeEach(async () => {
//     await mySession
//       .post('/users/signin')
//       .send({ email: '12234l@hotmail', password: '134' });
//   });
//   it('should return status 200 if the user is the correct user and send a proper body request PUT (/tasks/:id)', async () => {
//     const response = await mySession.put('/tasks/:id').send(test);
//     expect(response.statusCode).to.be.equal(200);
//   });
//   it('should return status code 401 if the user is not loged POST (/tasks/:id)', async () => {
//     const response = await mySession.put('/tasks/:id').send(test);
//     expect(response.statusCode).to.be.equal(401);
//   });
// });

// describe('Delete tasks', () => {
//   beforeEach(async () => {
//     await mySession
//       .post('/users/signin')
//       .send({ email: '12234l@hotmail', password: '134' });
//   });
//   it('should return status 200 if the tasks was deleted succesfully DELETE (/tasks/:id)', async () => {
//     const response = await myReq.delete('/tasks/:id');
//   });
// });

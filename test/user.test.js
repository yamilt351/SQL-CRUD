import Request from 'supertest';
import { expect } from 'chai';
const myReq = Request('http://localhost:4000');

const test = {
  email: 'email33@hotmail.com',
  password: '1234',
};
const emptyTest = {
  email: '',
  password: '',
};
const badPassword = {
  email: 'email33@hotmail.com',
  password: '3333',
};
const badEmail = {
  email: 'inexistentEmail@hotmail.com',
  password: '1234',
};
describe('Auth function', () => {
  it('should return status code 200 when valid credentials are provided POST (/users/signin)', async () => {
    const response = await myReq.post('/users/signin').send(test);
    expect(response.statusCode).to.be.equal(200);
  });
  it('should return status code 400 and a descriptive error message when empty credentials are provided POST (/users/signin)', async () => {
    const response = await myReq.post('/users/signin').send(emptyTest);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body.message).to.be.equal('Missing required fields');
  });
  it('should return status code 400 and a descriptive error message when invalid password is provided POST (/users/signin)', async () => {
    const response = await myReq.post('/users/signin').send(badPassword);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid password');
  });
  it('should return status code 400 and a descriptive error message when invalid email is provided POST (/users/signin)', async () => {
    const response = await myReq.post('/users/signin').send(badEmail);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body.message).to.be.equal('User not found');
  });
});

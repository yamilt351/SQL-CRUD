const Request = require('supertest');
const { expect } = require('chai');
const myReq = Request('http://localhost:4000');
const dotenv = require('dotenv');
dotenv.config();
const randomNumber = Math.floor(Math.random() * 1000);
const test = {
  email: '12234l@hotmail',
  password: '134',
};
const emptyTest = {
  email: '',
  password: '',
};
const badPassword = {
  email: '12234l@hotmail',
  password: '3333',
};
const badEmail = {
  email: 'inexiskientEmail@hotmail.com',
  password: '1234',
};
const randomEmail = {
  email: `email${randomNumber}@hotmail.com`,
  password: `${randomNumber}`,
};

describe('Auth function', () => {
  it('should return status code 200 when valid credentials are provided POST (/users/signin)', async () => {
    const response = await myReq.post('/users/signin').send(test);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.email).to.be.equal(test.email);
    expect(response.headers['content-type']).to.include('application/json');
  });
  it('should return status code 400 and a descriptive error message when empty credentials are provided POST (/users/signin)', async () => {
    const response = await myReq.post('/users/signin').send(emptyTest);
    expect(response.statusCode).to.be.equal(400);
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.body.message).to.be.equal('bad request');
  });
  it('should return status code 404 and a descriptive error message when invalid password is provided POST (/users/signin)', async () => {
    const response = await myReq.post('/users/signin').send(badPassword);
    expect(response.statusCode).to.be.equal(404);
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.body.message).to.be.equal(
      'user with those credentials not found',
    );
  });
  it('should return status code 404 and a descriptive error message when invalid email is provided POST (/users/signin)', async () => {
    const response = await myReq.post('/users/signin').send(badEmail);
    expect(response.statusCode).to.be.equal(404);
    expect(response.headers['content-type']).to.include('application/json');
    expect(response.body.message).to.be.equal(
      'user with those credentials not found',
    );
  });
});

describe('Sign Up function', () => {
  it('should return status code 200 when valid credentials are provided POST (/users/signup)', async () => {
    const response = await myReq.post('/users/signup').send(randomEmail);
    expect(response.statusCode).to.be.equal(200);
  });
  it('should return status code 400 and a error message when empty credentials are provided POST (/users/signup)', async () => {
    const response = await myReq.post('/users/signup').send(emptyTest);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body.error).to.be.equal('bad request');
  });
  it('should return status code 400 and a error message when the email already exists POST (/users/signup)', async () => {
    const response = await myReq.post('/users/signup').send(test);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body.error).to.be.equal('bad request');
  });
});

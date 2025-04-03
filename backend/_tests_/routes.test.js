const request = require('supertest');
const express = require('express');
const routes = require('../routes');
const db = require('../database');

const app = express();
app.use(express.json());
app.use('/api', routes);

describe('Authentication and API routes', () => {
  test('Login succeeds with valid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'securepassword123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Login fails with wrong password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'wrong' });

    expect(res.statusCode).toBe(401);
  });

  test('Contact info requires token', async () => {
    const res = await request(app).get('/api/contact-info?email=sender@example.com');
    expect(res.statusCode).toBe(401);
  });
});

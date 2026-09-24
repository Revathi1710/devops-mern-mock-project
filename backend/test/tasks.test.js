const request = require('supertest');
const { server, app } = require('../index');
const mongoose = require('mongoose');

describe('GET /api/tasks', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
  });

  it('should return object with tasks property', async () => {
    const res = await request(app).get('/api/tasks');
    
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('tasks');
    
    // Fixed typo: res.body.tasks instead of res.body.taaks
    console.log(res.body.tasks, 'Data seeded');
  });
});

afterAll(async () => {
  // Gracefully close connections
  await mongoose.disconnect();
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});
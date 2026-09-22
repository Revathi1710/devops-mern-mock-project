const request =require('supertest');
const {server,app}=require('../index');
const mongoose=require('mongoose');

describe('GET api/tasks', () => {
    it('it should retun 200 ok',async()=>{
     const res=   await request(app).get('/api/tasks')
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).toBe(200);
    })
     it('it should retun object and task property ok',async()=>{
     const res=   await request(app).get('/api/tasks')
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe("object");
        expect(res.body).toHaveProperty("tasks");
    })
})

afterAll(async () => {
    
    await mongoose.connection.close();
    await server.close();
})
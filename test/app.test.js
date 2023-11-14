const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 
const Task = require('../models/task');

beforeAll(async () => {
    // database baglantısı
    await mongoose.connect('mongodb://127.0.0.1:27017/to-do-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    });

beforeEach(async () => {
    // Testen önce database temizleme
    await Task.deleteMany({});
});

describe('Express App Tests', () => {
    test('GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    test('POST /task', async () => {
        const taskData = { name: 'Test Task', status: 'Incomplete' };
        const response = await request(app).post('/task').send(taskData);
        expect(response.status).toBe(302);

        const tasks = await Task.find({});
        expect(tasks).toHaveLength(1);
        expect(tasks[0].name).toBe(taskData.name);
    });

    test('GET /task/edit/:id', async () => {
        const createdTask = await Task.create({ name: 'Test Task', status: 'Incomplete' });
        const response = await request(app).get(`/task/edit/${createdTask._id}`);
        expect(response.status).toBe(200);
    });

    test('PUT /task/:id', async () => {
        const createdTask = await Task.create({ name: 'Test Task', status: 'Incomplete' });
        const updatedData = { name: 'Updated Task', status: 'Complete' };
        const response = await request(app).put(`/task/${createdTask._id}`).send(updatedData);
        expect(response.status).toBe(302);

        const updatedTask = await Task.findById(createdTask._id);
        expect(updatedTask.name).toBe(updatedData.name);
        expect(updatedTask.status).toBe(updatedData.status);
    });

    test('DELETE /task/:id', async () => {
        const createdTask = await Task.create({ name: 'Test Task', status: 'Incomplete' });
        const response = await request(app).delete(`/task/${createdTask._id}`);
        expect(response.status).toBe(302);

        const deletedTask = await Task.findById(createdTask._id);
        expect(deletedTask).toBeNull();
    });
});

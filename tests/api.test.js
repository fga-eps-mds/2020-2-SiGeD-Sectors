const app = require('../src/index');
const request = require('supertest');

describe('Sample Test', () => {

    it('App is defined', () => {
      expect(app).toBeDefined();
    })

    it('Post message', async () => {

        const message = {name: 'enfermagem', description: 'setor de enfermagem'}
    
        const res = await request(app).post('/sector/create').send(message)
        // console.log(res);
        // expect(res.statusCode).toBe(200);
        // expect(res.body.name).toBe(message.name);
        // expect(res.body.description).toBe(message.description);
    
    })
    
    it('Post message error', async () => {

    const errorMessage = {name: '', description: ''}

    const res = await request(app).post('/sector/create').send(errorMessage)
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toEqual(["invalid name", "invalid description"]);
    
    })


})
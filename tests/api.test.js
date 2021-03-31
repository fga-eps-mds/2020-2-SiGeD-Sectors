const request = require('supertest');
const app = require('../src/index');

describe('Sample Test', () => {

  it('App is defined', () => {
    expect(app).toBeDefined();
  });

  // sector
  it('Get message', async () => {

    const res = await request(app).get('/sector/');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(11)
  });
  
  it('Get message error', async () => {

    const res = await request(app).get('/sectors');
    expect(res.statusCode).toBe(404);
  });

  // sector/:id
  it('Get id message', async () => {

    const res = await request(app).get('/sector/606500c2641be1003f3296c8');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        "_id": "606500c2641be1003f3296c8",
        "name": "enfermagemalo",
        "description": "setor de enfermagemalo",
        "createdAt": "2021-03-31T20:07:46.000Z",
        "updatedAt": "2021-03-31T20:07:46.000Z",
        "__v": 0
      },
    ]);
  });

  it('Get id message error', async () => {
    const res = await request(app).get('/sector/123456789123456789123456');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual([]);
  });

  // sector/create
  it('Post message', async () => {
    const message = {
      name: 'enfermagem',
      description: 'setor de enfermagem',
    };

    const res = await request(app).post('/sector/create').send(message);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(message.name);
    expect(res.body.description).toBe(message.description);
  });

  it('Post message error', async () => {
    const errorMessage = {
      name: '',
      description: '',
    };

    const res = await request(app).post('/sector/create').send(errorMessage);
    expect(res.statusCode).toBe(500);
    expect(res.body.status).toEqual(['invalid name', 'invalid description']);
  });

  // sector/update/:id
  // sector/delete/:id
});

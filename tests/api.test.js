const request = require('supertest');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

describe('Sample Test', () => {
  let id;
  const message = {
    name: 'enfermagem',
    description: 'setor de enfermagem',
  };

  const token = jwt.sign({ name: "Teste", description: "Teste" }, process.env.SECRET, {
    expiresIn: 240,
  });

  it('App is defined', (done) => {
    expect(app).toBeDefined();
    done();
  });

  // sector/create
  it('Post message', async (done) => {
    const res = await request(app).post('/sector/create').set('x-access-token', token).send(message);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(message.name);
    expect(res.body.description).toBe(message.description);
    id = res.body._id;
    done();
  });

  it('Post message error', async (done) => {
    const errorMessage = {
      name: '',
      description: '',
    };

    const res = await request(app).post('/sector/create').set('x-access-token', token).send(errorMessage);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid name', 'invalid description']);
    done();
  });

  // sector
  it('Get message', async (done) => {
    const res = await request(app).get('/sector/').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    done();
  });

  // sector/:id
  it('Get id message', async (done) => {
    const res = await request(app).get(`/sector/${id}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(message.name);
    expect(res.body.description).toBe(message.description);
    done();
  });

  it('Get id message error', async (done) => {
    const res = await request(app).get('/sector/12345678912345678912345').set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe("Invalid ID");
    done();
  });

  // sector/update/:id
  it('Update message', async () => {
    const message = {
        name: "fisioterapia",
        description: "setor de fisioterapia"
    };

    const res = await request(app)
    .put(`/sector/update/${id}`)
    .set('x-access-token', token)
    .send(message);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(message.name);
    expect(res.body.description).toBe(message.description);
});

// Invalido
it('Update message error', async () => {
    const message = {
        name: "",
        description: "Jest description"
    }

    const res = await request(app)
    .put(`/sector/update/${id}`)
    .set('x-access-token', token)
    .send(message);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual([ 'invalid name' ]);
});

it('Update with invalid id', async () => {
    const message = {
        name: "fisioterapia",
        description: "setor de fisioterapia"
    };

    const res = await request(app)
    .put(`/sector/update/123abc`)
    .set('x-access-token', token)
    .send(message)
    expect(res.statusCode).toBe(400);
    console.log(res.body);
    expect(res.body.err).toBe('invalid id')
});

it('Update message without token', async () => {
    const message = {
        name: "Jest test",
        description: "Jest description"
    }

    const res = await request(app)
    .put(`/sector/update/${id}`)
    .send(message);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ auth: false, message: 'No token was provided' });
});

it('Update message with invalid token', async () => {
    const tokenFalho = 'abc123';
    const message = {
        name: "Jest test",
        description: "Jest description"
    }

    const res = await request(app)
    .put(`/sector/update/${id}`)
    .set('x-access-token', tokenFalho)
    .send(message);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ auth: false, message: 'It was not possible to authenticate the token.' });
});

it('Delete message', async (done) => {
    const res = await request(app).delete(`/sector/delete/${id}`).set('x-access-token', token)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({"message":"success"});
    done();
  });

  it('Delete message error', async (done) => {
    const res = await request(app).del('/sector/delete/09876543210987654321').set('x-access-token', token)
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({"message":"failure"});
    done();
  });
});

afterAll(async (done) => {
  done();
});

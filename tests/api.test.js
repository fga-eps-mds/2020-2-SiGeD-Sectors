const request = require('supertest');
const app = require('../src/index');
const jwt = require('jsonwebtoken');

describe('Sample Test', () => {
  let id;
  const sector = {
    name: Math.random().toString(36).substr(2, 5),
    description: 'setor teste',
  };

  const token = jwt.sign({ name: "Teste", description: "Teste" }, process.env.SECRET, {
    expiresIn: 240,
  });

  it('App is defined', (done) => {
    expect(app).toBeDefined();
    done();
  });

  it('Post sector', async (done) => {
    const res = await request(app).post('/sector/create').set('x-access-token', token).send(sector);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(sector.name);
    expect(res.body.description).toBe(sector.description);
    id = res.body._id;
    done();
  });

  it('Post duplicated sector', async (done) => {
    const res = await request(app).post('/sector/create').set('x-access-token', token).send(sector);
    console.log(res);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 11000 });
    done();
  });

  it('Post sector error', async (done) => {
    const errorSector = {
      name: '',
      description: '',
    };

    const res = await request(app).post('/sector/create').set('x-access-token', token).send(errorSector);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual(['invalid name', 'invalid description']);
    done();
  });

  it('Get sector', async (done) => {
    const res = await request(app).get('/sector/').set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    done();
  });

  it('Get id sector', async (done) => {
    const res = await request(app).get(`/sector/${id}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(sector.name);
    expect(res.body.description).toBe(sector.description);
    done();
  });

  it('Get id sector error', async (done) => {
    const res = await request(app).get('/sector/12345678912345678912345').set('x-access-token', token);
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe("Invalid ID");
    done();
  });

  it('Update sector', async (done) => {
    const sector = {
      name: "fisioterapia",
      description: "setor de fisioterapia"
    };
    const res = await request(app)
    .put(`/sector/update/${id}`)
    .set('x-access-token', token)
    .send(sector);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(sector.name);
    expect(res.body.description).toBe(sector.description);
    done();
  });

  it('Update sector error', async (done) => {
    const sector = {
      name: "",
      description: "Jest description"
    };
    const res = await request(app)
    .put(`/sector/update/${id}`)
    .set('x-access-token', token)
    .send(sector);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toEqual([ 'invalid name' ]);
    done();
  });

  it('Update with invalid id', async (done) => {
    const sector = {
      name: "fisioterapia",
      description: "setor de fisioterapia"
    };
    const res = await request(app)
    .put(`/sector/update/123abc`)
    .set('x-access-token', token)
    .send(sector);
    expect(res.statusCode).toBe(400);
    expect(res.body.err).toBe('invalid id');
    done();
  });

  it('Update sector without token', async (done) => {
    const sector = {
      name: "Jest test",
      description: "Jest description"
    };
    const res = await request(app)
    .put(`/sector/update/${id}`)
    .send(sector);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ auth: false, message: 'No token was provided' });
    done();
  });

  it('Update sector with invalid token', async (done) => {
    const tokenFalho = 'abc123';
    const sector = {
      name: "Jest test",
      description: "Jest description"
    }
    const res = await request(app)
    .put(`/sector/update/${id}`)
    .set('x-access-token', tokenFalho)
    .send(sector);
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ auth: false, message: 'It was not possible to authenticate the token.' });
    done();
  });

  it('Delete sector', async (done) => {
    const res = await request(app).delete(`/sector/delete/${id}`).set('x-access-token', token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({"message":"success"});
    done();
  });

  it('Delete sector error', async (done) => {
    const res = await request(app).del('/sector/delete/09876543210987654321').set('x-access-token', token)
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({"message":"failure"});
    done();
  });
});

afterAll(async (done) => {
  done();
});

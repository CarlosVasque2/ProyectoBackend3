import { expect } from 'chai';  // Manteniendo la importación de Chai
import request from 'supertest';  // Usamos Supertest en lugar de chai-http
import app from '../src/app.js';  // Asegúrate de que 'app.js' sea tu archivo de servidor

describe('Test de los endpoints de Users', () => {

  it('Debería obtener todos los usuarios', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).to.equal(200); // Cambié a res.status
    expect(res.body).to.be.an('array');
  });

  it('Debería crear un nuevo usuario', async () => {
    const newUser = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      password: '123456'
    };

    const res = await request(app).post('/api/users').send(newUser);
    expect(res.status).to.equal(201); // Cambié a res.status
    expect(res.body).to.have.property('name', 'Juan Pérez');
    expect(res.body).to.have.property('email', 'juan@example.com');
  });

  it('Debería devolver el usuario creado por su ID', async () => {
    const newUser = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      password: '123456'
    };

    const resCreate = await request(app).post('/api/users').send(newUser);
    const userId = resCreate.body.id;

    const resGet = await request(app).get(`/api/users/${userId}`);
    expect(resGet.status).to.equal(200); // Cambié a res.status
    expect(resGet.body).to.have.property('id', userId);
  });

  it('Debería devolver un error si se intenta crear un usuario sin datos necesarios', async () => {
    const invalidUser = { email: 'sin_nombre@example.com' };

    const res = await request(app).post('/api/users').send(invalidUser);
    expect(res.status).to.equal(400); // Cambié a res.status
    expect(res.body).to.have.property('message', 'Datos incompletos');
  });

});












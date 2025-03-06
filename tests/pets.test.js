import { expect } from 'chai';  // Manteniendo la importación de Chai
import request from 'supertest';  // Usamos Supertest en lugar de chai-http
import app from '../src/app.js';  // Asegúrate de que 'app.js' sea tu archivo de servidor

describe('Test de los endpoints de Pets', () => {

  it('Debería obtener todas las mascotas', async () => {
    const res = await request(app).get('/api/pets');
    expect(res.status).to.equal(200); // Cambié a res.status en lugar de res
    expect(res.body).to.be.an('array');
  });

  it('Debería crear una nueva mascota', async () => {
    const newPet = {
      name: 'Fido',
      breed: 'Labrador',
      age: 2
    };

    const res = await request(app).post('/api/pets').send(newPet);
    expect(res.status).to.equal(201); // Cambié a res.status
    expect(res.body).to.have.property('name', 'Fido');
    expect(res.body).to.have.property('breed', 'Labrador');
  });

  it('Debería devolver la mascota creada por su ID', async () => {
    const newPet = {
      name: 'Fido',
      breed: 'Labrador',
      age: 2
    };

    const resCreate = await request(app).post('/api/pets').send(newPet);
    const petId = resCreate.body.id; // Asumiendo que la API devuelve un ID

    const resGet = await request(app).get(`/api/pets/${petId}`);
    expect(resGet.status).to.equal(200); // Cambié a res.status
    expect(resGet.body).to.be.an('object');
    expect(resGet.body).to.have.property('id', petId);
  });

  it('Debería devolver un error si se intenta crear una mascota sin datos necesarios', async () => {
    const invalidPet = { breed: 'Labrador' };

    const res = await request(app).post('/api/pets').send(invalidPet);
    expect(res.status).to.equal(400); // Cambié a res.status
    expect(res.body).to.have.property('message', 'Datos incompletos');
  });

});












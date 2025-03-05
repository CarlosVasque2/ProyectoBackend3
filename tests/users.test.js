import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'; // Importar la aplicación para hacer las peticiones
import { expect } from 'chai';

chai.use(chaiHttp);

describe('Test de los endpoints de Users', () => {

  it('Debería obtener todos los usuarios', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        if (err) {
          done(err); // Manejamos el error si ocurre
          return;
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Debería obtener un usuario por su UID', (done) => {
    const uid = 'some-valid-uid'; // Sustituir con un UID válido
    chai.request(app)
      .get(`/api/users/${uid}`)
      .end((err, res) => {
        if (err) {
          done(err); // Manejamos el error si ocurre
          return;
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('uid', uid);
        done();
      });
  });

  it('Debería actualizar un usuario', (done) => {
    const uid = 'some-valid-uid'; // Sustituir con un UID válido
    const updatedData = {
      name: 'Nuevo Nombre',
      email: 'nuevoemail@dominio.com',
    };

    chai.request(app)
      .put(`/api/users/${uid}`)
      .send(updatedData)
      .end((err, res) => {
        if (err) {
          done(err); // Manejamos el error si ocurre
          return;
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name', 'Nuevo Nombre');
        expect(res.body).to.have.property('email', 'nuevoemail@dominio.com');
        done();
      });
  });

  it('Debería eliminar un usuario', (done) => {
    const uid = 'some-valid-uid'; // Sustituir con un UID válido
    chai.request(app)
      .delete(`/api/users/${uid}`)
      .end((err, res) => {
        if (err) {
          done(err); // Manejamos el error si ocurre
          return;
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Usuario eliminado correctamente');
        done();
      });
  });

});


import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'; // Importar la aplicación para hacer las peticiones
import { expect } from 'chai';

chai.use(chaiHttp);

describe('Test de los endpoints de Pets', () => {

  it('Debería obtener todas las mascotas', (done) => {
    chai.request(app)
      .get('/api/pets')
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

  it('Debería crear una nueva mascota', (done) => {
    const newPet = {
      name: 'Fido',
      breed: 'Labrador',
      age: 2
    };

    chai.request(app)
      .post('/api/pets')
      .send(newPet)
      .end((err, res) => {
        if (err) {
          done(err); // Manejamos el error si ocurre
          return;
        }
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('name', 'Fido');
        expect(res.body).to.have.property('breed', 'Labrador');
        done();
      });
  });

  it('Debería devolver la mascota creada por su ID', (done) => {
    // Crear una mascota para obtener su ID
    const newPet = {
      name: 'Fido',
      breed: 'Labrador',
      age: 2
    };

    chai.request(app)
      .post('/api/pets')
      .send(newPet)
      .end((err, res) => {
        if (err) {
          done(err); // Manejamos el error si ocurre
          return;
        }
        const petId = res.body.id;  // Asumiendo que la mascota creada devuelve un ID en la respuesta
        
        // Ahora hacemos la solicitud GET con el ID de la mascota
        chai.request(app)
          .get(`/api/pets/${petId}`)
          .end((err, res) => {
            if (err) {
              done(err); // Manejamos el error si ocurre
              return;
            }
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id', petId);
            done();
          });
      });
  });

  it('Debería devolver un error si se intenta crear una mascota sin datos necesarios', (done) => {
    const invalidPet = {
      breed: 'Labrador'
    };

    chai.request(app)
      .post('/api/pets')
      .send(invalidPet)
      .end((err, res) => {
        if (err) {
          done(err); // Manejamos el error si ocurre
          return;
        }
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'Datos incompletos');
        done();
      });
  });

});



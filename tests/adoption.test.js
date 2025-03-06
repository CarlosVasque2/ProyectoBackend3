import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'; // Importamos nuestra app de Express

chai.use(chaiHttp);
const { expect } = chai;

describe('Pruebas funcionales para Adoption Router', () => {
    let adoptionId = '';

    // Caso de éxito: Obtener todas las adopciones
    it('GET /api/adoptions debería retornar todas las adopciones', async () => {
        const res = await chai.request(app).get('/api/adoptions');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });

    // Caso de éxito: Crear una adopción
    it('POST /api/adoptions debería crear una nueva adopción', async () => {
        const newAdoption = {
            userId: '60d0fe4f5311236168a109ca',
            petId: '60d0fe4f5311236168a109cb',
            adoptionDate: '2025-03-06'
        };

        const res = await chai.request(app).post('/api/adoptions').send(newAdoption);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        adoptionId = res.body._id; // Guardamos el ID para pruebas posteriores
    });

    // Caso de error: Crear adopción sin userId
    it('POST /api/adoptions debería devolver error si falta userId', async () => {
        const invalidAdoption = {
            petId: '60d0fe4f5311236168a109cb',
            adoptionDate: '2025-03-06'
        };

        const res = await chai.request(app).post('/api/adoptions').send(invalidAdoption);
        expect(res).to.have.status(400);
    });

    // Caso de éxito: Obtener una adopción por ID
    it('GET /api/adoptions/:id debería retornar una adopción específica', async () => {
        const res = await chai.request(app).get(`/api/adoptions/${adoptionId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id', adoptionId);
    });

    // Caso de error: Obtener una adopción con ID inválido
    it('GET /api/adoptions/:id debería devolver error si el ID es inválido', async () => {
        const res = await chai.request(app).get('/api/adoptions/12345');
        expect(res).to.have.status(400);
    });

    // Caso de éxito: Eliminar una adopción
    it('DELETE /api/adoptions/:id debería eliminar una adopción', async () => {
        const res = await chai.request(app).delete(`/api/adoptions/${adoptionId}`);
        expect(res).to.have.status(200);
    });

    // Caso de error: Eliminar una adopción con ID inválido
    it('DELETE /api/adoptions/:id debería devolver error si el ID no existe', async () => {
        const res = await chai.request(app).delete('/api/adoptions/12345');
        expect(res).to.have.status(400);
    });
});

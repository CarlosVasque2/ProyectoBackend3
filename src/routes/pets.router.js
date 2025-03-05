import express from 'express';
import petsController from '../controllers/pets.controller.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Gestión de mascotas.
 */

/**
 * @swagger
 * path:
 *  /api/pets/mockingpets:
 *    get:
 *      summary: Obtener mascotas de prueba
 *      tags: [Pets]
 *      responses:
 *        200:
 *          description: Lista de mascotas de prueba.
 */
router.get('/mockingpets', petsController.getMockPets);

/**
 * @swagger
 * path:
 *  /api/pets:
 *    get:
 *      summary: Obtener todas las mascotas
 *      tags: [Pets]
 *      responses:
 *        200:
 *          description: Lista de todas las mascotas.
 */
router.get('/', petsController.getAllPets);

/**
 * @swagger
 * path:
 *  /api/pets:
 *    post:
 *      summary: Crear una nueva mascota
 *      tags: [Pets]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Nombre de la mascota
 *                age:
 *                  type: integer
 *                  description: Edad de la mascota
 *                species:
 *                  type: string
 *                  description: Especie de la mascota
 *      responses:
 *        201:
 *          description: Mascota creada con éxito.
 */
router.post('/', petsController.createPet);

export default router;


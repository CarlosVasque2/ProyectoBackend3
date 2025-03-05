import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Gestión de adopciones de mascotas.
 */

/**
 * @swagger
 * path:
 *  /api/adoptions:
 *    get:
 *      summary: Obtener todas las adopciones
 *      tags: [Adoptions]
 *      responses:
 *        200:
 *          description: Lista de todas las adopciones.
 */
router.get('/', adoptionsController.getAllAdoptions);

/**
 * @swagger
 * path:
 *  /api/adoptions/{aid}:
 *    get:
 *      summary: Obtener detalles de una adopción
 *      tags: [Adoptions]
 *      parameters:
 *        - in: path
 *          name: aid
 *          required: true
 *          description: ID de la adopción
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Detalles de la adopción solicitada.
 *        404:
 *          description: Adopción no encontrada.
 */
router.get('/:aid', adoptionsController.getAdoption);

/**
 * @swagger
 * path:
 *  /api/adoptions/{uid}/{pid}:
 *    post:
 *      summary: Crear una nueva adopción
 *      tags: [Adoptions]
 *      parameters:
 *        - in: path
 *          name: uid
 *          required: true
 *          description: ID del usuario que adopta
 *          schema:
 *            type: string
 *        - in: path
 *          name: pid
 *          required: true
 *          description: ID de la mascota adoptada
 *          schema:
 *            type: string
 *      responses:
 *        201:
 *          description: Adopción creada exitosamente.
 *        400:
 *          description: Datos inválidos.
 */
router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;

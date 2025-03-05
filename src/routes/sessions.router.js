import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Gestión de sesiones de usuarios.
 */

/**
 * @swagger
 * path:
 *  /api/sessions/register:
 *    post:
 *      summary: Registrar un nuevo usuario
 *      tags: [Sessions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: Nombre de usuario
 *                password:
 *                  type: string
 *                  description: Contraseña del usuario
 *      responses:
 *        201:
 *          description: Usuario registrado exitosamente.
 *        400:
 *          description: Datos inválidos.
 */
router.post('/register', sessionsController.register);

/**
 * @swagger
 * path:
 *  /api/sessions/login:
 *    post:
 *      summary: Iniciar sesión de usuario
 *      tags: [Sessions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: Nombre de usuario
 *                password:
 *                  type: string
 *                  description: Contraseña del usuario
 *      responses:
 *        200:
 *          description: Sesión iniciada exitosamente.
 *        401:
 *          description: Credenciales inválidas.
 */
router.post('/login', sessionsController.login);

/**
 * @swagger
 * path:
 *  /api/sessions/current:
 *    get:
 *      summary: Obtener la sesión actual
 *      tags: [Sessions]
 *      responses:
 *        200:
 *          description: Información de la sesión actual.
 *        401:
 *          description: No autenticado.
 */
router.get('/current', sessionsController.current);

/**
 * @swagger
 * path:
 *  /api/sessions/unprotectedLogin:
 *    get:
 *      summary: Iniciar sesión sin protección
 *      tags: [Sessions]
 *      responses:
 *        200:
 *          description: Sesión sin protección iniciada.
 */
router.get('/unprotectedLogin', sessionsController.unprotectedLogin);

/**
 * @swagger
 * path:
 *  /api/sessions/unprotectedCurrent:
 *    get:
 *      summary: Obtener la sesión actual sin protección
 *      tags: [Sessions]
 *      responses:
 *        200:
 *          description: Información de la sesión actual sin protección.
 */
router.get('/unprotectedCurrent', sessionsController.unprotectedCurrent);

export default router;

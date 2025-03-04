// src/routes/mocks.router.js

import { Router } from 'express';
import { generatePets } from '../utils/mockingPets.js';  // Usamos la función correcta para generar mascotas
import { generateUsers } from '../utils/mockingUsers.js';  // Usamos la función correcta para generar usuarios
import { petsService } from '../services/petsService.js';
import { usersService } from '../services/usersService.js';

const router = Router();

// Endpoint GET para generar mascotas
router.get('/mockingpets', async (req, res) => {
    try {
        const num = parseInt(req.query.num) || 100;  // Recibimos un parámetro 'num' para generar un número específico de mascotas
        const mockPets = generatePets(num);  // Generamos las mascotas
        res.json({ status: 'success', payload: mockPets });  // Respondemos con las mascotas generadas
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// Endpoint GET para generar usuarios
router.get('/mockingusers', async (req, res) => {
    try {
        const num = parseInt(req.query.num) || 50;  // Recibimos un parámetro 'num' para generar un número específico de usuarios
        const mockUsers = generateUsers(num);  // Generamos los usuarios
        res.json({ status: 'success', payload: mockUsers });  // Respondemos con los usuarios generados
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// Endpoint POST para generar e insertar datos en la base de datos
router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;  // Recibimos los parámetros numéricos para generar usuarios y mascotas
        if (!users || !pets) {
            return res.status(400).json({ status: 'error', message: 'Missing parameters' });  // Verificamos que ambos parámetros estén presentes
        }

        // Generamos los usuarios y mascotas
        const generatedUsers = generateUsers(users);  // Generamos los usuarios con el número solicitado
        const generatedPets = generatePets(pets);    // Generamos las mascotas con el número solicitado

        // Insertamos los datos en la base de datos
        const createdUsers = await usersService.createMany(generatedUsers);  // Usamos el servicio para insertar los usuarios
        const createdPets = await petsService.createMany(generatedPets);    // Usamos el servicio para insertar las mascotas

        // Respondemos con un mensaje de éxito
        res.json({
            status: 'success',
            message: `${createdUsers.length} users and ${createdPets.length} pets created`,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

export default router;


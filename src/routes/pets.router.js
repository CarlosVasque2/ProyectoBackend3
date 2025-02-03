import express from 'express';
import petsController from '../controllers/pets.controller.js';
const router = express.Router();

router.get('/mockingpets', petsController.getMockPets);

router.get('/', petsController.getAllPets);
router.post('/', petsController.createPet);

export default router;

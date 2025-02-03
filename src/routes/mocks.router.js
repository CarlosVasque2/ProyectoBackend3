import { Router } from 'express';
import { generateMockPets } from '../utils/mockingPets.js';  
import { generateMockUsers } from '../utils/mockingUsers.js';  
import { petsService } from '../services/petsService.js';
import { usersService } from '../services/usersService.js';

const router = Router();

router.get('/mockingpets', async (req, res) => {
    try {
        const mockPets = generateMockPets(100);
        res.json({ status: 'success', payload: mockPets });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});


router.get('/mockingusers', async (req, res) => {
    try {
        const mockUsers = generateMockUsers(50);
        res.json({ status: 'success', payload: mockUsers });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;
        if (!users || !pets) {
            return res.status(400).json({ status: 'error', message: 'Missing parameters' });
        }

        const generatedUsers = generateMockUsers(users);
        const createdUsers = await usersService.createMany(generatedUsers);


        const generatedPets = generateMockPets(pets);
        const createdPets = await petsService.createMany(generatedPets);

        res.json({
            status: 'success',
            message: `${createdUsers.length} users and ${createdPets.length} pets created`,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

export default router;

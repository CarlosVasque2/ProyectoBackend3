import { usersService } from '../services/usersService.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await usersService.getById(uid);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        res.json({ status: 'success', payload: user });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const updatedUser = await usersService.update(uid, req.body);
        res.json({ status: 'success', payload: updatedUser });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

const deleteUser = async (req, res) => {  // Aquí también cambiamos el nombre a deleteUser
    try {
        const { uid } = req.params;
        const result = await usersService.deleteUser(uid);  // Usamos la función con el nuevo nombre
        if (!result) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }
        res.json({ status: 'success', message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export default {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,  // Aquí también cambiamos el nombre
};


// src/services/usersService.js

import User from '../models/User.js';
import bcrypt from 'bcryptjs';  // Asegúrate de importar bcryptjs

// Función para obtener todos los usuarios
const getAll = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Función para obtener un usuario por ID
const getById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Función para crear varios usuarios
const createMany = async (users) => {
    try {
        // Iteramos sobre cada usuario y encriptamos la contraseña
        const usersWithEncryptedPassword = await Promise.all(
            users.map(async (user) => {
                const salt = await bcrypt.genSalt(10);  // Generamos un "salt" para encriptar
                user.password = await bcrypt.hash(user.password, salt);  // Encriptamos la contraseña
                return user;
            })
        );
        
        // Insertamos los usuarios con las contraseñas encriptadas
        const result = await User.insertMany(usersWithEncryptedPassword);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Función para actualizar un usuario
const update = async (id, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Función para eliminar un usuario
const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const usersService = {
    getAll,
    getById,
    createMany,
    update,
    deleteUser, 
};




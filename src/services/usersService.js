import User from '../models/User.js';

const getAll = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createMany = async (users) => {
    try {
        const result = await User.insertMany(users);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

const update = async (id, userData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

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



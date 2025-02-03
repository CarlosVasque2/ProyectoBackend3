import Pet from '../models/Pet.js';

const createMany = async (pets) => {
    try {
        const result = await Pet.insertMany(pets);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const petsService = {
    createMany,
};

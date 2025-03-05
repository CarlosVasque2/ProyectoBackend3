import Pet from '../dao/models/Pet.js';

const createMany = async (pets) => {
    try {
        // Verifica que pets sea un array
        if (!Array.isArray(pets)) {
            throw new Error('El parámetro pets debe ser un arreglo.');
        }

        // Insertar múltiples mascotas en la base de datos
        const result = await Pet.insertMany(pets);

        // Retorna el resultado de la inserción
        return result;
    } catch (error) {
        // Manejo de errores más específico
        throw new Error(`Error al crear mascotas: ${error.message}`);
    }
};

export const petsService = {
    createMany,
};


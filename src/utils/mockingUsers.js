import bcrypt from 'bcrypt';
import faker from 'faker';
import { Types } from 'mongoose';  // Importamos Types para generar ObjectId

const generateMockUsers = (num) => {
    if (typeof num !== 'number' || num <= 0) {
        throw new Error('El número de usuarios debe ser un valor numérico mayor que 0');
    }

    const users = [];

    for (let i = 0; i < num; i++) {
        const user = {
            _id: new Types.ObjectId(),  // Usar ObjectId de MongoDB en lugar de faker.datatype.uuid
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('coder123', 10),  // Contraseña encriptada
            role: faker.random.arrayElement(['user', 'admin']),  // Puede ser "user" o "admin"
            pets: [],  // Array vacío para las mascotas
        };

        users.push(user);
    }

    return users;
};

export { generateMockUsers };


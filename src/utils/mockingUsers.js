import bcrypt from 'bcrypt';
import faker from 'faker';

const generateMockUsers = (num) => {
    const users = [];

    for (let i = 0; i < num; i++) {
        const user = {
            _id: faker.datatype.uuid(),
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

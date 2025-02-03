import { faker } from '@faker-js/faker';  // Usando faker-js

// Función para generar mascotas mockeadas
const generateMockPets = (num) => {
    const pets = [];
    
    for (let i = 0; i < num; i++) {
        const pet = {
            _id: faker.datatype.uuid(),  
            name: faker.animal.dog(),  
            species: faker.animal.type(),  
            breed: faker.animal.breed(),  
            adopted: false,  
            owner: null,  // Sin dueño
            age: faker.datatype.number({ min: 1, max: 10 }),  
            imageUrl: faker.image.animals(),  // Imagen aleatoria de animal
        };
        
        pets.push(pet);
    }

    return pets;
};

export { generateMockPets };


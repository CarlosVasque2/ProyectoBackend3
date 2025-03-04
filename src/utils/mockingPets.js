// src/utils/mockingPets.js

import { faker } from '@faker-js/faker';  // Para generar datos falsos de manera aleatoria

// Generar mascotas sin owner y con adopted en false
export const generatePets = (num) => {
  const pets = [];
  
  for (let i = 0; i < num; i++) {
    const pet = {
      _id: faker.database.mongodbObjectId(),
      name: faker.animal.dog(),  // O puedes usar faker.animal.cat() para diferentes tipos
      type: faker.helpers.arrayElement(['Dog', 'Cat', 'Bird', 'Rabbit']), // Tipos de mascotas
      age: faker.datatype.number({ min: 1, max: 10 }),  // Edad aleatoria
      adopted: false,
    };
    pets.push(pet);
  }
  
  return pets;
};

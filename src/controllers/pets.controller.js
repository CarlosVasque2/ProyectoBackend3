import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import { generateMockPets } from "../utils/mocking.js"; 

const getAllPets = async (req, res) => {
    try {
        const pets = await petsService.getAll(); 
        
        // Puedes usar un DTO para transformar los datos si es necesario
        const petsDTO = pets.map(pet => new PetDTO(pet)); 
        
        res.status(200).json({
            status: "success",
            payload: petsDTO,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Error fetching pets",
        });
    }
};

const createPet = async (req, res) => {
    // Definición de la función createPet aquí
};

const updatePet = async (req, res) => {
    // Definición de la función updatePet aquí
};

const deletePet = async (req, res) => {
    // Definición de la función deletePet aquí
};

const createPetWithImage = async (req, res) => {
    // Definición de la función createPetWithImage aquí
};

const getMockPets = async (req, res) => {
    try {
        const num = parseInt(req.query.num) || 100;
        const mockPets = generateMockPets(num);
        
        res.status(200).json({
            status: "success",
            payload: mockPets,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Error generating mock pets",
        });
    }
};

export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage,
    getMockPets,
};


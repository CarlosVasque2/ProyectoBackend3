import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import { generateMockPets } from "../utils/mocking.js"; 

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

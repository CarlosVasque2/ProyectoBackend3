import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Adopción de Mascotas",
      version: "1.0.0",
      description: "Documentación de la API para la gestión de usuarios, mascotas y adopciones."
    }
  },
  apis: ["./src/routes/*.js"] // Se documentarán las rutas dentro de la carpeta 'routes'
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;

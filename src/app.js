// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';  
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();  

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Adopción de Mascotas",
            version: "1.0.0",
            description: "Documentación de la API para la gestión de usuarios, mascotas y adopciones."
        }
    },
    apis: ["./src/routes/*.js"] // Documentará las rutas en la carpeta 'routes'
};

const specs = swaggerJsdoc(swaggerOptions);

// Conectar a MongoDB usando la variable de entorno
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// Ruta para la documentación de Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}\nDocumentación disponible en http://localhost:${PORT}/api/docs`));

// Exportamos app para pruebas
export default app;

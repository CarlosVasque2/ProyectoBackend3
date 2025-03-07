# Usa una imagen base oficial de Node.js
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe) en el contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto en el que la app va a correr (si usas el puerto 3000)
EXPOSE 3000

# El comando que se ejecutará al iniciar el contenedor
CMD ["npm", "start"]

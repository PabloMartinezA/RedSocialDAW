# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

# Utiliza una imagen base de Node.js
FROM node:20.10.0-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Crea el directorio .cache y asigna los permisos adecuados
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Descarga las dependencias como un paso separado para aprovechar el almacenamiento en caché de Docker
# Monta un volumen de caché en /root/.npm para acelerar compilaciones posteriores
# Utiliza montajes de bind para package.json y package-lock.json para evitar tener que copiarlos
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --unsafe-perm --omit=dev

# Cambia la propiedad del directorio node_modules al usuario node
RUN chown -R node:node node_modules

# Copia el resto de los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Expose el puerto en el que la aplicación se ejecutará dentro del contenedor
EXPOSE 3002

# Define el comando para iniciar la aplicación
CMD npm start

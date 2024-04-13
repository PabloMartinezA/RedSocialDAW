# RedSocial SOA Y DAW

Proyecto basado en el siguiente video: <https://www.youtube.com/watch?v=K8YELRmUb5o>

## Requerimientos

- Es necesario tener instalado [Node.js](https://nodejs.org/en).
- Es necesario tener una cuenta de [MongoDB Cloud](https://account.mongodb.com/account/login?nStitch=https%3A%2F%2Fservices.cloud.mongodb.com%2Fgroups%2F65d55d88e22629010aa7aa61%2Fapps).

## PASOS PARA EJECUTAR EL PROYECTO

### SERVER

  1. Abrir una terminal en la carpeta `server`.
  2. Si no cuentas con nodemon, instalalo con el siguiente comando.

    npm install -g nodemon
  
  3. Instalar las dependencias de Node.js con `npm install`.
  4. Crear un cluster con su cuenta en MongoDB.
  5. Copiar la conexión al cluster para la aplicación.
  6. Crear un archivo llamado `.env` en el directorio con la siguiente estructura y reemplazar los elementos:

    MONGO_URL = [conexion a mongodb]
    JWT_SECRET = [palabra]
    PORT = 3001

  7. Correr la aplicación con `npm run start`.

### CLIENT

  1. Abrir una terminal en la carpeta `client`.
  2. Instalar las dependencias de Node.js con `npm install`.
  3. Correr la aplicación con `npm run start`.

### DATOS DE PRUEBA

  1. Los datos de prueba se encuentran en el directorio `server > data > index.js`.
  2. Dentro del archivo `server > index.js` descomentar las líneas 67 - 68:<br>

    66 /* INICIALIZACION DE DATOS */
    67 //User.insertMany(users);
    68 //Post.insertMany(posts);

  3. Correr el comando para iniciar el servidor `nodemon index.js` en la carpeta `server`.
  4. Una vez hecho el paso anterior es necesario volver a comentar las líneas de código del paso 2.

## CORRER EN DOCKER

### SERVER

Abre una terminal en el directorio `/server` y corre los comandos.

  1. Crea la imagen con el tag redsocialdaw-server.

    docker build -t redsocialdaw-server .
  
  2. Crea un contenedor  usando la imagen creada, con el nombre redsocialdaw-server-1, expone el puerto 3001 y lo corre como daemon.

    docker run --name redsocialdaw-server-1 -p 3001:3001 -d redsocialdaw-server

### CLIENT

Abre una terminal en el directorio `/client` y corre los comandos.

  1. Crea la imagen con el tag redsocialdaw-client.

    docker build -t redsocialdaw-client .
  
  2. Crea un contenedor  usando la imagen creada, con el nombre redsocialdaw-client-1, expone el puerto 3000 y lo corre como daemon.

    docker run --name redsocialdaw-client-1 -p 3000:3000 -d redsocialdaw-client

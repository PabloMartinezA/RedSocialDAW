# RedSocial SOA Y DAW

Proyecto basado en el siguiente video: <https://www.youtube.com/watch?v=K8YELRmUb5o>

## Requerimientos

- Es necesario tener instalado [Node.js](https://nodejs.org/en).
- Es necesario tener una cuenta de [MongoDB Cloud](https://account.mongodb.com/account/login?nStitch=https%3A%2F%2Fservices.cloud.mongodb.com%2Fgroups%2F65d55d88e22629010aa7aa61%2Fapps).

## PASOS PARA EJECUTAR EL PROYECTO

### SERVER

  1. Abrir una terminal en la carpeta `server`.
  2. Instalar las dependencias de Node.js con `npm install`.
  3. Crear un cluster con su cuenta en MongoDB.
  4. Copiar la conexión al cluster para la aplicación.
  5. Crear un archivo llamado `.env` en el directorio con la siguiente estructura y reemplazar los elementos:

    MONGO_URL = [conexion a mongodb]
    JWT_SECRET = [palabra]
    PORT = 3001

  6. Correr la aplicación con `nodemon index.js`.

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

De momento se puede observar la barra de navegacion y el modo oscuro en funcionamiento pero es necesario entrar en la pagina de `/home` ademas de retirar el elemento de autorizacion dentro de `client > src > App.js` en la línea 26

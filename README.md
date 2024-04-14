# RedSocial SOA Y DAW

Proyecto basado en el siguiente video: <https://www.youtube.com/watch?v=K8YELRmUb5o>

1. [Requerimientos](#requerimientos)
2. [Pasos para ejecutar el proyecto](#pasos-para-ejecutar-el-proyecto)
    1. [Server](#server)
    2. [Client](#client)
    3. [Datos de prueba](#datos-de-prueba)
3. [Correr en Docker](#correr-en-docker)
    1. [Posibles errores de importación](#posibles-errores-de-importación)
    2. [Borrar volumenes sin utilizar](#borrar-volumenes-sin-utilizar)

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

Levantar el server, cliente y base de datos de mongo ingresando el siguiente comando en el directorio principal:

    docker compose up -d

Para detenerlo use:

    docker compose down

### Posibles errores de importación

Si ha creado imágenes de la aplicación anteriormente, es posible que le aparezcan errores de importaciones que no se resuelven que contienen una estructura como "@/components/MyComponent"

Se ha cambiado de usar CRA a Vite, por lo que si antes había creado las imagenes para la aplicación tendrá que reconstruirlas con el siguiente comando:

    docker compose build --no-cache

Aunque le dejará unas imágenes que aparecerán con un tag "none" y estado "dangling", remuevelas con el siguiente comando ya que solo consumen espacio en disco.

    docker images --quiet --filter=dangling=true | xargs --no-run-if-empty docker rmi

### Borrar volumenes sin utilizar

Puede que tenga volumenes en docker que no son utilizados por ningún contenedor, puede eliminarlos con:

    docker system prune --volumes

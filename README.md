# RedSocial SOA Y DAW

Proyecto basado en el siguiente video: https://www.youtube.com/watch?v=K8YELRmUb5o

PASOS PARA EJECUTAR EL PROYECTO:
  1. Descargar todas las dependencias de nodejs
  2. Es necesario crease una cuenta en MongoDB Cloud: https://account.mongodb.com/account/login?nStitch=https%3A%2F%2Fservices.cloud.mongodb.com%2Fgroups%2F65d55d88e22629010aa7aa61%2Fapps
  3. Es necesario la creacion de un cluster
  4. De ser necesario pueden modificar los datos de la BD dentro del archivo [ server > .env ]
  5. Los datos que seran introducidos dentro de la BD se encuentran en [ server > data > index.js ]
  6. Dentro del archivo [ server > index.js [ linea 67 - 68 ] ] Se encuentra 2 lineas de codigo comentadas, es necesario quitar el comentario para que pueden ejecutarse una vez e inicializar los datos en la BD
  7. Es necesario ejecutar el comando [ nodemon index.js ] en una terminal dentro de la carpeta server. Ejemplo: C:\Users\pama_\Documents\ProyectoDAW\server> nodemon index.js
  8. Una vez hecho el paso anterior es necesario volver a comentar las lineas de codigo del paso 5
  9. Es necesario ejecutar el comando [ npm run start ] en una terminal dentro de la carpeta client. Ejemplo: C:\Users\pama_\Documents\ProyectoDAW\server> npm run start

De momento se puede observar la barra de navegacion y el modo oscuro en funcionamiento pero es necesario entrar en la pagina de /home ademas de retirar el elemento de autorizacion dentro de [ client > src > App.js linea 26 ]

<script>
    const URL = "http://localhost:3001/usuarios/";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjQ0NDVkNjc5ZjYzMGJmMzY5NGUwYiIsImlhdCI6MTcxNDMzNzg2OH0.UgEAR23X3HUfC3e2UAML5mJnXElTDLi9QdjYwV9UYuY";

    async function getUser() {
        const id = document.getElementById("id").value;

        const response = await fetch(`${URL}${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const json = await response.json();
            document.getElementById("id").value = json._id;
            document.getElementById("nombre").value = json.nombre;
            document.getElementById("apellido").value = json.apellido;
            document.getElementById("email").value = json.email;
            document.getElementById("ubicacion").value = json.ubicacion;
            document.getElementById("ocupacion").value = json.ocupacion;
            document.getElementById("vistasPerfil").value = json.vistasPerfil;
            document.getElementById("impresiones").value = json.impresiones;
        } else {
            alert(response.statusText);
        }
    }

    async function postUser() {
        const formData = new FormData(document.getElementById("userForm"));
        formData.append("imgRuta", document.getElementById("img").files[0].name);

        const response = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const json = await response.json();
            document.getElementById("id").value = json._id;
            document.getElementById("nombre").value = json.nombre;
            document.getElementById("apellido").value = json.apellido;
            document.getElementById("email").value = json.email;
            document.getElementById("ubicacion").value = json.ubicacion;
            document.getElementById("ocupacion").value = json.ocupacion;
            document.getElementById("vistasPerfil").value = json.vistasPerfil;
            document.getElementById("impresiones").value = json.impresiones;

            alert("Usuario creado");
        } else {
            alert(response.statusText);
        }
    }

    async function putUser() {
        const id = document.getElementById("id").value;
        const data = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            email: document.getElementById("email").value,
            ubicacion: document.getElementById("ubicacion").value,
            ocupacion: document.getElementById("ocupacion").value,
            vistasPerfil: document.getElementById("vistasPerfil").value,
            impresiones: document.getElementById("impresiones").value,
        }

        const response = await fetch(`${URL}${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const json = await response.json();
            document.getElementById("id").value = json._id;
            document.getElementById("nombre").value = json.nombre;
            document.getElementById("apellido").value = json.apellido;
            document.getElementById("email").value = json.email;
            document.getElementById("ubicacion").value = json.ubicacion;
            document.getElementById("ocupacion").value = json.ocupacion;
            document.getElementById("vistasPerfil").value = json.vistasPerfil;
            document.getElementById("impresiones").value = json.impresiones;

            alert("Usuario actualizado");
        } else {
            alert(response.statusText);
        }
    }

    async function deleteUser() {
        const id = document.getElementById("id").value;

        const response = await fetch(`${URL}${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            alert("Usuario eliminado");
        } else {
            alert(response.statusText);
        }
    }

    function clear() {
        document.getElementById("userForm").reset();
    }
</script>

<head>
    <title>Usuario</title>
</head>

<body>
    <a href="/">Regresar</a>
    <h1>Usuario</h1>
    <button on:click={getUser}>GET</button>
    <button on:click={postUser}>POST</button>
    <button on:click={putUser}>PUT</button>
    <button on:click={deleteUser}>DELETE</button>
    <button on:click={clear}>Limpiar</button>
    <form id="userForm">
        <div>ID: <input id="id" type="text" /></div>
        <div>Nombre: <input id="nombre" name="nombre" type="text" /></div>
        <div>Apellido: <input id="apellido" name="apellido" type="text" /></div>
        <div>Email: <input id="email" name="email" type="text" /></div>
        <div>Contraseña: <input id="contrasena" name="contrasena" type="password" /></div>
        <div>Ubicación: <input id="ubicacion" name="ubicacion" type="text" /></div>
        <div>Ocupación: <input id="ocupacion" name="ocupacion" type="text" /></div>
        <div>Vistas de Perfil: <input id="vistasPerfil" type="number" value="0" min="0" /></div>
        <div>Impresiones: <input id="impresiones" type="number" value="0" min="0" /></div>
        <div>Imagen: <input id="img" name="img" type="file" accept="image/*, text/*"/></div>
    </form>
</body>
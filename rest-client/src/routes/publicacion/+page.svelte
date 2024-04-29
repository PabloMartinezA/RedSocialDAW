<script>
    const URL = "http://localhost:3001/publicaciones/";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjQ0NDVkNjc5ZjYzMGJmMzY5NGUwYiIsImlhdCI6MTcxNDMzNzg2OH0.UgEAR23X3HUfC3e2UAML5mJnXElTDLi9QdjYwV9UYuY";

    async function getPost() {
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
            document.getElementById("usuarioId").value = json.usuarioId;
            document.getElementById("nombre").value = json.nombre;
            document.getElementById("apellido").value = json.apellido;
            document.getElementById("ubicacion").value = json.ubicacion;
            document.getElementById("descripcion").value = json.descripcion;
        } else {
            alert(response.statusText);
        }
    }

    async function postPost() {
        const formData = new FormData(document.getElementById("postForm"));
        formData.append("imgRuta", document.getElementById("img").files[0].name);

        const response = await fetch(URL, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const json = await response.json();
            document.getElementById("id").value = json[0]._id;
            document.getElementById("nombre").value = json[0].nombre;
            document.getElementById("apellido").value = json[0].apellido;
            document.getElementById("ubicacion").value = json[0].ubicacion;

            alert("Publicación creada");
        } else {
            alert(response.statusText);
        }
    }

    async function putPost() {
        const id = document.getElementById("id").value;
        const data = {
            ubicacion: document.getElementById("ubicacion").value,
            descripcion: document.getElementById("descripcion").value,
        };

        const response = await fetch(`${URL}${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const json = await response.json();
            document.getElementById("id").value = json._id;
            document.getElementById("usuarioId").value = json.usuarioId;
            document.getElementById("nombre").value = json.nombre;
            document.getElementById("apellido").value = json.apellido;
            document.getElementById("ubicacion").value = json.ubicacion;
            document.getElementById("descripcion").value = json.descripcion;
            alert("Publicación actualizada");
        } else {
            alert(response.statusText);
        }
    }

    async function deletePost() {
        const id = document.getElementById("id").value;

        const response = await fetch(`${URL}${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            clear();
            alert("Publicación eliminada");
        } else {
            alert(response.statusText);
        }
    }

    function clear() {
        document.getElementById("postForm").reset();
    }
</script>

<head>
    <title>Publicación</title>
</head>

<body>
    <a href="/">Regresar</a>
    <h1>Publicación</h1>
    <button on:click={getPost}>GET</button>
    <button on:click={postPost}>POST</button>
    <button on:click={putPost}>PUT</button>
    <button on:click={deletePost}>DELETE</button>
    <button on:click={clear}>Limpiar</button>

    <form id="postForm">
        <div>ID: <input id="id" type="text"/></div>
        <div>Usuario ID: <input id="usuarioId" name="usuarioId" type="text"/></div>
        <div>Usuario Nombre: <input id="nombre" name="nombre" type="text" disabled/></div>
        <div>Usuario Apellido: <input id="apellido" name="apellido" type="text" disabled/></div>
        <div>Ubicación: <input id="ubicacion" name="ubicacion" type="text"/></div>
        <div>Descripción: <input id="descripcion" name="descripcion" type="text"/></div>
        <div>Imagen: <input id="img" name="img" type="file" accept="image/*, text/*"/></div>
    </form>
</body>
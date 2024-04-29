<script>
    const URL = "http://localhost:3001/mensajes/";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjQ0NDVkNjc5ZjYzMGJmMzY5NGUwYiIsImlhdCI6MTcxNDMzNzg2OH0.UgEAR23X3HUfC3e2UAML5mJnXElTDLi9QdjYwV9UYuY";

    async function getMessage() {
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
            document.getElementById("remitenteId").value = json.remitenteId;
            document.getElementById("destinatarioId").value = json.destinatarioId;
            document.getElementById("contenido").value = json.contenido;
        } else {
            alert(response.statusText);
        }
    }

    async function postMessage() {
        const data = {
            remitenteId: document.getElementById("remitenteId").value,
            destinatarioId: document.getElementById("destinatarioId").value,
            contenido: document.getElementById("contenido").value,
        }

        const response = await fetch(`${URL}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const json = await response.json();
            document.getElementById("id").value = json._id;
            document.getElementById("remitenteId").value = json.remitenteId;
            document.getElementById("destinatarioId").value = json.destinatarioId;
            document.getElementById("contenido").value = json.contenido;
            alert("Mensaje creado");
        } else {
            alert(response.statusText);
        }
    }

    async function putMessage() {
        const id = document.getElementById("id").value;

        const data = {
            contenido: document.getElementById("contenido").value,
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
            document.getElementById("remitenteId").value = json.remitenteId;
            document.getElementById("destinatarioId").value = json.destinatarioId;
            document.getElementById("contenido").value = json.contenido;
            alert("Mensaje actualizado");
        } else {
            alert(response.statusText);
        }
    }

    async function deleteMessage() {
        const id = document.getElementById("id").value;

        const response = await fetch(`${URL}${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            clear();
            alert("Mensaje eliminado");
        } else {
            alert(response.statusText);
        }
    }

    function clear() {
        document.getElementById("messageForm").reset();
    }
</script>

<head>
    <title>Mensaje</title>
</head>

<body>
    <a href="/">Regresar</a>
    <h1>Mensaje</h1>
    <button on:click={getMessage}>GET</button>
    <button on:click={postMessage}>POST</button>
    <button on:click={putMessage}>PUT</button>
    <button on:click={deleteMessage}>DELETE</button>
    <button on:click={clear}>Limpiar</button>

    <form id="messageForm">
        <div>ID: <input type="text" id="id"></div>
        <div>Remitente ID: <input type="text" id="remitenteId" name="remitenteId"></div>
        <div>Destinatario ID: <input type="text" id="destinatarioId" name="destinatarioId"></div>
        <div>Contenido: <input type="text" id="contenido" name="contenido"></div>
    </form>
</body>
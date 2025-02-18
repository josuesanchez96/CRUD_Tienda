const apiUrl = "http://localhost:5219/api/Clientes";

// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get("id");

    if (clienteId) {
        cargarCliente(clienteId);
        document.getElementById("form-editar-cliente").addEventListener("submit", function (event) {
            event.preventDefault();
            actualizarCliente(clienteId);
        });
    } else {
        console.error("ID del cliente no encontrado en la URL");
    }
});

// Cargar datos del cliente en el formulario
async function cargarCliente(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error("Error al obtener los datos del cliente");
        }
        const cliente = await response.json();

        document.getElementById("clienteId").value = cliente.id;
        document.getElementById("nombre").value = cliente.nombre;
        document.getElementById("fechaNacimiento").value = cliente.fechaNacimiento.split("T")[0];
        document.getElementById("genero").value = cliente.genero;
        document.getElementById("direccion").value = cliente.direccion;
        document.getElementById("telefono").value = cliente.telefono;
    } catch (error) {
        console.error("Error:", error);
    }
}

// Actualizar cliente en la API
async function actualizarCliente(id) {
    const cliente = {
        id: id,
        nombre: document.getElementById("nombre").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value + "T00:00:00.000Z",
        genero: document.getElementById("genero").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value
    };

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el cliente");
        }

        alert("Cliente actualizado correctamente!");
        window.location.href = "index.html"; // Redirigir al inicio después de actualizar
    } catch (error) {
        console.error("Error:", error);
    }
}

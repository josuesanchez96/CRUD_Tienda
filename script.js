document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("tabla-clientes")) {
        obtenerClientes();
    }
    if (document.getElementById("form-cliente")) {
        document.getElementById("form-cliente").addEventListener("submit", agregarOActualizarCliente);
    }
});

const apiUrl = "http://localhost:5219/api/Clientes"; // URL de la API
let clienteIdActual = null; // Para saber si estamos agregando o editando un cliente

// Obtener clientes de la API
async function obtenerClientes() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Error al obtener los clientes");
        }
        const clientes = await response.json();
        mostrarClientes(clientes);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Mostrar clientes en la tabla con botones de editar y eliminar
function mostrarClientes(clientes) {
    const tabla = document.getElementById("tabla-clientes");
    tabla.innerHTML = ""; // Limpiar contenido previo

    clientes.forEach(cliente => {
        const fila = `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${new Date(cliente.fechaNacimiento).toLocaleDateString()}</td>
                <td>${cliente.genero}</td>
                <td>${cliente.direccion}</td>
                <td>${cliente.telefono}</td>
                <td>
                    <button onclick="editarCliente(${cliente.id})">✏ Editar</button>
                    <button onclick="eliminarCliente(${cliente.id})" style="background-color: red;">🗑 Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// Agregar o actualizar cliente
async function agregarOActualizarCliente(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const cliente = {
        id: clienteIdActual || 0, // Si estamos editando, usamos el ID; si no, es un nuevo cliente
        nombre: document.getElementById("nombre").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value + "T00:00:00.000Z",
        genero: document.getElementById("genero").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value
    };

    try {
        const response = await fetch(apiUrl + (clienteIdActual ? `/${clienteIdActual}` : ""), {
            method: clienteIdActual ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });

        if (!response.ok) {
            throw new Error(clienteIdActual ? "Error al actualizar el cliente" : "Error al agregar el cliente");
        }

        alert(clienteIdActual ? "Cliente actualizado correctamente!" : "Cliente agregado correctamente!");
        clienteIdActual = null; // Resetear variable
        document.getElementById("form-cliente").reset(); // Limpiar formulario
        obtenerClientes(); // Recargar la tabla con los nuevos datos
    } catch (error) {
        console.error("Error:", error);
    }
}

// Editar un cliente (carga los datos en el formulario)
async function editarCliente(id) {
    window.location.href = `editar-cliente.html?id=${id}`;
}

// Eliminar un cliente
async function eliminarCliente(id) {
    if (!confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
        return;
    }

    try {
        const response = await fetch(apiUrl + `/${id}`, { method: "DELETE" });

        if (!response.ok) {
            throw new Error("Error al eliminar el cliente");
        }

        alert("Cliente eliminado correctamente!");
        obtenerClientes(); // Recargar la tabla
    } catch (error) {
        console.error("Error:", error);
    }
}

const apiUrl = "http://localhost:5219/api/Proveedores";

// Obtener y mostrar proveedores
async function obtenerProveedores() {
    try {
        const response = await fetch(apiUrl);
        const proveedores = await response.json();

        const tabla = document.getElementById("tabla-proveedores");
        tabla.innerHTML = "";

        proveedores.forEach(proveedor => {
            const fila = `
                <tr>
                    <td>${proveedor.id}</td>
                    <td>${proveedor.nombre}</td>
                    <td>${proveedor.direccion}</td>
                    <td>
                        <button onclick="editarProveedor(${proveedor.id})">✏ Editar</button>
                        <button onclick="eliminarProveedor(${proveedor.id})" style="background-color: red;">🗑 Eliminar</button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Agregar proveedor
document.getElementById("form-proveedor")?.addEventListener("submit", async function(event) {
    event.preventDefault();

    const proveedor = {
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value
    };

    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proveedor)
    });

    alert("Proveedor agregado");
    window.location.href = "proveedores.html";
});

// Editar proveedor
function editarProveedor(id) {
    window.location.href = `editar_proveedor.html?id=${id}`;
}

// Eliminar proveedor
async function eliminarProveedor(id) {
    if (confirm("¿Seguro que deseas eliminar este proveedor?")) {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        obtenerProveedores();
    }
}

document.addEventListener("DOMContentLoaded", obtenerProveedores);

document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const response = await fetch(`http://localhost:5219/api/Proveedores/${id}`);
    const proveedor = await response.json();

    document.getElementById("proveedorId").value = proveedor.id;
    document.getElementById("nombre").value = proveedor.nombre;
    document.getElementById("direccion").value = proveedor.direccion;
});

document.getElementById("form-editar-proveedor").addEventListener("submit", async function(event) {
    event.preventDefault();
    const id = document.getElementById("proveedorId").value;
    
    await fetch(`http://localhost:5219/api/Proveedores/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
            nombre: document.getElementById("nombre").value,
            direccion: document.getElementById("direccion").value
        })
    });

    alert("Proveedor actualizado");
    window.location.href = "proveedores.html";
});

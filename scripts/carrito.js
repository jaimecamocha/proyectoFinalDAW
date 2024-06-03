//https://github.com/jaimecamocha/proyectoFinalDAW

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pedidoForm');
    const mensajeExito = document.getElementById('mensajeExito');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const direccion = document.getElementById('direccion').value.trim();

        if (nombre && direccion) {
            form.style.display = 'none';
            mensajeExito.style.display = 'block';
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

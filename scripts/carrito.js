//https://github.com/jaimecamocha/proyectoFinalDAW

//mostrar productos del carrito
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('catalog');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const form = document.getElementById('pedidoForm');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>No hay productos en el carrito</p>';
        form.style.display = 'none';
    } else {
        cartItems.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';

            cartItemDiv.innerHTML = `
                <h3>${item.nombre}</h3>
                <p>Equipo: ${item.equipo}</p>
                <p>Precio: ${item.precio} €</p>
                <p>Talla: ${item.talla}</p>
                <button class="remove-from-cart" data-index="${index}">Eliminar</button>
            `;

            cartContainer.appendChild(cartItemDiv);
        });
        form.style.display = 'block';
    }

    updateTotalPrice();

    //elimina el producto del carrito que el usuario seleccione mediante el botón
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            location.reload();
        });
    });

    const mensajeExito = document.getElementById('mensajeExito');

    //formulario de envío
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const direccion = document.getElementById('direccion').value.trim();

        if (nombre && direccion) {
            form.style.display = 'none';
            mensajeExito.style.display = 'block';

            localStorage.removeItem('cartItems');
            cartContainer.innerHTML = '<p>No hay productos en el carrito</p>';
            updateTotalPrice();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });
});

// calculo precio total carrito
function updateTotalPrice() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.precio), 0);
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Total: ${totalPrice.toFixed(2)} €`;
}

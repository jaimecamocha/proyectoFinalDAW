//https://github.com/jaimecamocha/proyectoFinalDAW

document.addEventListener('DOMContentLoaded', () => {
    const catalog = document.getElementById('catalog');

    fetch('http://localhost/get_products.php')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                productDiv.innerHTML = `
                    <h3>${product.nombre}</h3>
                    <img src="../assets/img/productos/${product.imagen}" alt="${product.nombre}">
                    <p>Equipo: ${product.equipo}</p>
                    <p>Precio: ${product.precio} €</p>
                    <select class="size-selector">
                        <option value="">Seleccione una talla</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                    <button class="add-to-cart" disabled>Añadir al carrito</button>
                `;

                const sizeSelector = productDiv.querySelector('.size-selector');
                const addToCartButton = productDiv.querySelector('.add-to-cart');

                sizeSelector.addEventListener('change', () => {
                    addToCartButton.disabled = false;
                });

                addToCartButton.addEventListener('click', () => {
                    const selectedSize = sizeSelector.value;
                    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

                    if (selectedSize) {
                        const cartItem = {
                            id: product.idProducto,
                            nombre: product.nombre,
                            equipo: product.equipo,
                            precio: parseFloat(product.precio),
                            talla: selectedSize
                        };

                        cartItems.push(cartItem);
                        localStorage.setItem('cartItems', JSON.stringify(cartItems));

                        alert('Producto añadido al carrito');
                        updateTotalPrice();
                    } else {
                        alert('Por favor, seleccione una talla antes de añadir al carrito.');
                    }
                });

                catalog.appendChild(productDiv);
            });
            updateTotalPrice();
        })
        .catch(error => console.error('Error en la solicitud:', error));
});
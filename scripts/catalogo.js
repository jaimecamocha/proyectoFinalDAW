document.addEventListener('DOMContentLoaded', () => {
    const catalog = document.getElementById('catalog');

    fetch('http://localhost/get_products.php')
        .then(response => {
            console.log('Respuesta del servidor:', response);
            return response.json();
        })
        .then(products => {
            console.log('Productos obtenidos:', products);
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                productDiv.innerHTML = `
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <h3>${product.equipo}</h3>
                    <p>${product.equipo}</p>
                    <p>${product.precio} €</p>
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
                    addToCartButton.disabled = sizeSelector.value === '';
                });

                catalog.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error en la solicitud:', error));
});

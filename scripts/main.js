//https://github.com/jaimecamocha/proyectoFinalDAW


//animación del banner del inicio
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.banner-image');
    let currentImageIndex = 0;

    function changeImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    setInterval(changeImage, 4000);
});


//envío al correo de las sugerencias del cliente a través del formulario
(function(){
    emailjs.init("p3zMs5W5lxXz-FugB");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('proyecto', 'template_3zb7wsg', '#contact-form')
        .then(function(response) {
            console.log('Correo enviado', response.status, response.text);
            alert('Sugerencia enviada exitosamente');
        }, function(error) {
            console.log('Error...', error);
            alert('Error al enviar el la sugerencia');
        });
});

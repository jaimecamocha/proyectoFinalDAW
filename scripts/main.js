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

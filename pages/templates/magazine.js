let currentIndex = 0;

function showSlide(index) {
    const images = document.querySelectorAll('.carousel-images img');
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) {
            img.classList.add('active');
        }
    });
}

function nextSlide() {
    const images = document.querySelectorAll('.carousel-images img');
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
}

function prevSlide() {
    const images = document.querySelectorAll('.carousel-images img');
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
}

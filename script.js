document.addEventListener('DOMContentLoaded', function () {
    // Image Array derived from HTML convention
    const images = [
        "images/hero_slide_0.png",
        "images/hero_slide_1.png",
        "images/hero_slide_2.png",
        "images/hero_slide_3.png",
        "images/hero_slide_4.png"
    ];

    let currentIndex = 0;
    let autoPlayTimer;

    // Elements
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.thumb');

    // Function to update the view
    window.updateMainImage = function (index) {
        // Reset Timer
        clearInterval(autoPlayTimer);

        // Update State
        currentIndex = index;

        // 1. Fade Out
        mainImage.style.opacity = '0.4';

        setTimeout(() => {
            // 2. Change Source
            mainImage.src = images[index];

            // 3. Fade In
            mainImage.style.opacity = '1';
        }, 150); // Short delay for blink effect

        // Update Active Class on Thumbs
        thumbs.forEach(t => t.classList.remove('active'));
        thumbs[index].classList.add('active');

        // Restart Timer
        startAutoPlay();
    }

    // Auto Play Logic
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= images.length) nextIndex = 0;
            updateMainImage(nextIndex);
        }, 5000); // 5 seconds per slide
    }

    // Initialize
    startAutoPlay();
});

// Shared gallery functionality with performance optimizations

class Gallery {
    constructor(images) {
        this.images = images;
        this.currentIndex = 0;
        this.preloadedImages = {};
        this.isLoading = false;

        this.galleryImage = document.getElementById('galleryImage');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.imageTitle = document.getElementById('imageTitle');
        this.imageMedium = document.getElementById('imageMedium');
        this.imageYear = document.getElementById('imageYear');
        this.imageDimensions = document.getElementById('imageDimensions');

        this.init();
    }

    init() {
        // Preload all images on page load for smoother navigation
        this.preloadAllImages();

        // Set up event listeners
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });

        // Handle image load events for smooth transitions
        this.galleryImage.addEventListener('load', () => {
            this.galleryImage.classList.remove('loading');
            this.isLoading = false;
        });

        // Initial update
        this.updateGallery();
    }

    preloadAllImages() {
        // Preload all images in the background
        this.images.forEach((image, index) => {
            const img = new Image();
            img.src = image.src;
            this.preloadedImages[index] = img;
        });
    }

    navigate(direction) {
        const newIndex = this.currentIndex + direction;
        if (newIndex >= 0 && newIndex < this.images.length && !this.isLoading) {
            this.currentIndex = newIndex;
            this.updateGallery();
        }
    }

    updateGallery() {
        const image = this.images[this.currentIndex];

        // Add loading class for fade effect
        this.galleryImage.classList.add('loading');
        this.isLoading = true;

        // Use preloaded image if available
        if (this.preloadedImages[this.currentIndex] && this.preloadedImages[this.currentIndex].complete) {
            this.galleryImage.src = image.src;
        } else {
            this.galleryImage.src = image.src;
        }

        this.galleryImage.alt = image.title;

        // Update metadata
        this.imageTitle.innerHTML = image.title;
        this.imageMedium.textContent = image.medium;
        this.imageYear.textContent = image.year;

        if (image.dimensions && image.dimensions !== "Dimensions available upon request") {
            this.imageDimensions.innerHTML = image.dimensions;
            this.imageDimensions.style.display = 'block';
        } else {
            this.imageDimensions.style.display = 'none';
        }

        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.images.length - 1;
    }
}

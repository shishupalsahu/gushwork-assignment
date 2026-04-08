document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sticky Header Logic ---
    const stickyHeader = document.getElementById('sticky-header');
    const heroSection = document.getElementById('hero-section');

    // Using IntersectionObserver for optimal performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Show header when hero section is out of view (scrolled past first fold)
            if (!entry.isIntersecting) {
                stickyHeader.classList.add('header-visible');
            } else {
                stickyHeader.classList.remove('header-visible');
            }
        });
    }, { 
        threshold: 0.1 // Triggers slightly before the hero completely disappears
    });

    observer.observe(heroSection);

    // --- 2. Image Carousel Logic ---
    const track = document.getElementById('hero-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    
    let currentIndex = 0;

    function updateCarousel() {
        // Calculate dynamic width to handle resizing
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Update carousel transform on window resize to prevent misalignment
    window.addEventListener('resize', updateCarousel);

    // --- 3. Image Hover Zoom Logic ---
    const zoomContainers = document.querySelectorAll('.zoom-container');

    zoomContainers.forEach(container => {
        const img = container.querySelector('.zoom-img');

        // Track mouse movement to pan around the zoomed image
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            // Calculate mouse position as a percentage
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Set the transform origin dynamically to the mouse position
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(1.6)'; // Zoom level
        });

        // Reset zoom when mouse leaves
        container.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            setTimeout(() => {
                img.style.transformOrigin = 'center center';
            }, 300); // Wait for transition to finish
        });
    });

    // --- 4. FAQ Accordion Logic ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.icon').textContent = '+';
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const icon = item.querySelector('.icon');
            icon.textContent = item.classList.contains('active') ? '−' : '+';
        });
    });
});
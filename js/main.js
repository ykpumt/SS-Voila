document.addEventListener('DOMContentLoaded', () => {
    // Page Fade-In
    document.body.classList.add('fade-in');

    // Active Navigation Link
    const navLinks = document.querySelectorAll('header nav ul li a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
        link.classList.remove('active');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // Page Fade-Out on Navigation
    const allLinks = document.querySelectorAll('a:not(.lightbox-prev):not(.lightbox-next)');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && (href.startsWith('/') || href.includes('.html'))) {
                if (this.getAttribute('target') !== '_blank' && !href.startsWith('#')) {
                    e.preventDefault();
                    document.body.classList.add('page-fade-out');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            }
        });
    });

    // IntersectionObserver for On-Scroll Reveals
    const revealItems = document.querySelectorAll('.lookbook-grid .grid-item');
    if (revealItems.length > 0) {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // observer.unobserve(entry.target);
                }
            });
        };
        const revealObserver = new IntersectionObserver(observerCallback, observerOptions);
        revealItems.forEach(item => {
            item.classList.add('reveal-item');
            revealObserver.observe(item);
        });
    }

    // Lightbox Functionality
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let currentImageIndex = -1;
    let galleryItems = [];

    const lookbookGridItems = document.querySelectorAll('.lookbook-grid .grid-item');
    lookbookGridItems.forEach((item, index) => {
        const imgElement = item.querySelector('img');
        const captionElement = item.querySelector('.item-caption');
        if (imgElement && captionElement) {
            galleryItems.push({
                src: imgElement.src,
                alt: imgElement.alt,
                caption: captionElement.textContent
            });
            imgElement.addEventListener('click', (e) => {
                e.preventDefault();
                currentImageIndex = index;
                updateLightboxImage();
                if(lightboxOverlay) lightboxOverlay.classList.add('visible');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    function updateLightboxImage() {
        if (currentImageIndex >= 0 && currentImageIndex < galleryItems.length) {
            const item = galleryItems[currentImageIndex];
            if(lightboxImage) lightboxImage.src = item.src;
            if(lightboxImage) lightboxImage.alt = item.alt;
            if(lightboxCaption) lightboxCaption.textContent = item.caption;
        }
        if(lightboxPrev) lightboxPrev.style.display = (currentImageIndex > 0) ? 'block' : 'none';
        if(lightboxNext) lightboxNext.style.display = (currentImageIndex < galleryItems.length - 1) ? 'block' : 'none';
    }

    function showNextImage() {
        if (currentImageIndex < galleryItems.length - 1) {
            currentImageIndex++;
            updateLightboxImage();
        }
    }

    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxImage();
        }
    }

    function closeLightbox() {
        if(lightboxOverlay) lightboxOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    if (lightboxOverlay) {
        if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if(lightboxNext) lightboxNext.addEventListener('click', showNextImage);
        if(lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (lightboxOverlay.classList.contains('visible')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
            }
        });
    }

    // Custom Cursor Effect
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor');
    document.body.appendChild(cursorDot);
    let cursorVisible = false;

    document.addEventListener('mousemove', (e) => {
        if (!cursorVisible) {
            cursorDot.style.display = 'block'; // Show cursor on first move
            document.body.classList.add('custom-cursor-active'); // Hide default cursor
            cursorVisible = true;
        }
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Add hover effect for links and buttons (interactive elements)
    const interactiveElements = document.querySelectorAll('a, button, .grid-item img, .lightbox-close, .lightbox-prev, .lightbox-next');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover-effect');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover-effect');
        });
    });
    // Hide custom cursor if mouse leaves window (optional)
     document.addEventListener('mouseleave', () => {
        cursorDot.style.display = 'none';
        document.body.classList.remove('custom-cursor-active');
        cursorVisible = false;
     });
     document.addEventListener('mouseenter', () => { // Show again if mouse re-enters
        if (cursorVisible) { // Only if it was visible before leaving (this logic might need adjustment based on desired exact behavior)
            // This part ensures that if the cursor was made visible by a mousemove, then hidden by mouseleave,
            // it only reappears on mouseenter if it *should* be visible (i.e. mouse is moving inside the window).
            // The mousemove event will handle making it visible again more reliably.
            // For simplicity, we can rely on the next mousemove to show it.
            // Or, ensure it's shown if it was meant to be visible:
            // cursorDot.style.display = 'block';
            // document.body.classList.add('custom-cursor-active');
        }
     });


}); // Closes DOMContentLoaded

// Contact Form Submission Placeholder
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        console.log('Form submitted to Formspree via default HTML action.');
    });
}

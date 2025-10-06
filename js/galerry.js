// ===== VARIABLES GLOBALES =====
let currentImageIndex = 0;
let galleryData = [];
let currentlyShowing = 6;
const itemsToShow = 6;

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(currentTheme === 'light' ? 'light-theme' : 'dark-theme');
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.contains('light-theme');
        
        if (isLight) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        }
    });

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }
}

// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
    });
}

// Hide menu
if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
}

// Hide menu when clicking on nav links
if (navLinks.length > 0 && navMenu) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = 'auto';
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.style.background = body.classList.contains('light-theme') 
                ? 'rgba(255, 255, 255, 0.98)' 
                : 'rgba(26, 26, 26, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = body.classList.contains('light-theme') 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'));
            if (!isNaN(target)) {
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        }
    });
}, observerOptions);

// Observe counters
const counters = document.querySelectorAll('.stat__number');
if (counters.length > 0) {
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== SCROLL REVEAL ANIMATION =====
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all elements with data-aos attribute
const aosElements = document.querySelectorAll('[data-aos]');
if (aosElements.length > 0) {
    aosElements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// ===== GALLERY FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            button.classList.add('filter-btn--active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    
                    // Trigger reflow for animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Add button click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
}

// ===== LIGHTBOX FUNCTIONALITY =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

// Initialize gallery data
function initializeGalleryData() {
    if (galleryItems.length === 0) return;
    
    galleryData = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        const titleElement = item.querySelector('.gallery-item__title');
        const descriptionElement = item.querySelector('.gallery-item__description');
        const button = item.querySelector('.gallery-item__btn');
        
        return {
            src: button ? button.getAttribute('data-image') || (img ? img.src : '') : (img ? img.src : ''),
            title: titleElement ? titleElement.textContent : 'Sin título',
            description: descriptionElement ? descriptionElement.textContent : 'Sin descripción',
            element: item
        };
    });
}

// Open lightbox
function openLightbox(index) {
    if (!lightbox || !galleryData[index]) return;
    
    currentImageIndex = index;
    const imageData = galleryData[index];
    
    if (lightboxImage) lightboxImage.src = imageData.src;
    if (lightboxTitle) lightboxTitle.textContent = imageData.title;
    if (lightboxDescription) lightboxDescription.textContent = imageData.description;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Preload adjacent images
    preloadAdjacentImages(index);
}

// Close lightbox
function closeLightbox() {
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate to previous image
function previousImage() {
    if (galleryData.length === 0) return;
    
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryData.length - 1;
    updateLightboxImage();
}

// Navigate to next image
function nextImage() {
    if (galleryData.length === 0) return;
    
    currentImageIndex = currentImageIndex < galleryData.length - 1 ? currentImageIndex + 1 : 0;
    updateLightboxImage();
}

// Update lightbox image
function updateLightboxImage() {
    if (!lightboxImage || !galleryData[currentImageIndex]) return;
    
    const imageData = galleryData[currentImageIndex];
    
    // Fade out
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = imageData.src;
        if (lightboxTitle) lightboxTitle.textContent = imageData.title;
        if (lightboxDescription) lightboxDescription.textContent = imageData.description;
        
        // Fade in
        lightboxImage.style.opacity = '1';
    }, 150);
    
    preloadAdjacentImages(currentImageIndex);
}

// Preload adjacent images for better performance
function preloadAdjacentImages(index) {
    if (galleryData.length === 0) return;
    
    const prevIndex = index > 0 ? index - 1 : galleryData.length - 1;
    const nextIndex = index < galleryData.length - 1 ? index + 1 : 0;
    
    [prevIndex, nextIndex].forEach(i => {
        if (galleryData[i]) {
            const img = new Image();
            img.src = galleryData[i].src;
        }
    });
}

// ===== LOAD MORE FUNCTIONALITY =====
const loadMoreBtn = document.getElementById('load-more');

// Initially hide items beyond the first 6
function initializeGalleryDisplay() {
    if (galleryItems.length === 0) return;
    
    galleryItems.forEach((item, index) => {
        if (index >= itemsToShow) {
            item.style.display = 'none';
        }
    });
    
    updateLoadMoreButton();
}

// Update load more button visibility
function updateLoadMoreButton() {
    if (!loadMoreBtn) return;
    
    if (currentlyShowing >= galleryItems.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
}

// Load more items
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const itemsToLoad = 3;
        const endIndex = Math.min(currentlyShowing + itemsToLoad, galleryItems.length);
        
        // Show next batch of items
        for (let i = currentlyShowing; i < endIndex; i++) {
            if (galleryItems[i]) {
                const item = galleryItems[i];
                item.style.display = 'block';
                
                // Animate in
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, (i - currentlyShowing) * 100);
            }
        }
        
        currentlyShowing = endIndex;
        updateLoadMoreButton();
        
        // Update button text if all items are shown
        if (currentlyShowing >= galleryItems.length) {
            const loadMoreText = loadMoreBtn.querySelector('.load-more-text');
            const loadMoreIcon = loadMoreBtn.querySelector('.load-more-icon');
            
            if (loadMoreText) loadMoreText.textContent = 'Todos los trabajos mostrados';
            if (loadMoreIcon) loadMoreIcon.textContent = '✓';
        }
        
        // Add button animation
        loadMoreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            loadMoreBtn.style.transform = '';
        }, 150);
    });
}

// ===== GALLERY ITEM HOVER EFFECTS =====
if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        const image = item.querySelector('.gallery-item__image img');
        
        if (image) {
            item.addEventListener('mouseenter', () => {
                // Add subtle parallax effect
                item.addEventListener('mousemove', handleMouseMove);
            });
            
            item.addEventListener('mouseleave', () => {
                // Reset transform
                image.style.transform = 'scale(1.1)';
                item.removeEventListener('mousemove', handleMouseMove);
            });
            
            function handleMouseMove(e) {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                image.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        }
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Scroll-dependent animations go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// ===== LAZY LOADING FOR IMAGES =====
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px'
});

// Observe all gallery images
const galleryImages = document.querySelectorAll('.gallery-item__image img');
if (galleryImages.length > 0) {
    galleryImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for gallery items
if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Ver imagen ${index + 1}`);
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });
}

// ===== EVENT LISTENERS INITIALIZATION =====
function initializeEventListeners() {
    // Gallery item click handlers
    if (galleryItems.length > 0) {
        galleryItems.forEach((item, index) => {
            const button = item.querySelector('.gallery-item__btn');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    openLightbox(index);
                });
            }
        });
    }
    
    // Close lightbox event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }
    
    // Navigation event listeners
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', previousImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery data and display
    initializeGalleryData();
    initializeGalleryDisplay();
    initializeEventListeners();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🎨 Wrap Company Arg - Galería Cargada!');
    console.log(`📸 ${galleryItems.length} trabajos disponibles`);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Error en la galería:', e.error);
});

// Handle image loading errors
const allImages = document.querySelectorAll('img');
if (allImages.length > 0) {
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = '/placeholder.svg?height=400&width=600&text=Error+al+cargar+imagen';
            this.alt = 'Error al cargar imagen';
        });
    });
}
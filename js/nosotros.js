// ===== GLOBAL VARIABLES =====
let isScrolling = false;

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

// ===== SMOOTH SCROLL FOR HERO SCROLL BUTTON =====
const heroScroll = document.querySelector('.hero-scroll');
const storySection = document.querySelector('.story-section');

if (heroScroll && storySection) {
    heroScroll.addEventListener('click', () => {
        storySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// ===== AOS (ANIMATE ON SCROLL) IMPLEMENTATION =====
class AOSAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.createObserver();
        this.bindEvents();
    }

    createObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                    
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    bindEvents() {
        // Refresh animations on window resize
        window.addEventListener('resize', () => {
            this.refresh();
        });
    }

    refresh() {
        this.elements.forEach(element => {
            element.classList.remove('aos-animate');
            this.observer.observe(element);
        });
    }
}

// Initialize AOS animations
document.addEventListener('DOMContentLoaded', () => {
    new AOSAnimations();
});

// ===== PARALLAX EFFECTS =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-background, .cta-background');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
            
            isScrolling = false;
        });
    });
}

// ===== COUNTER ANIMATIONS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isNumber = /^\d+$/.test(target.replace('+', ''));
                
                if (isNumber) {
                    const finalNumber = parseInt(target.replace('+', ''));
                    animateNumber(counter, finalNumber, target.includes('+'));
                }
                
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateNumber(element, target, hasPlus = false) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
    }, 16);
}

// ===== INTERACTIVE HOVER EFFECTS =====
function initHoverEffects() {
    // Team member cards
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Value items
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Detail items
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}

// ===== BUTTON CLICK ANIMATIONS =====
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.cta-btn, .location-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// ===== TYPING ANIMATION FOR MOTTO =====
function initTypingAnimation() {
    const mottoText = document.querySelector('.motto-text');
    if (!mottoText) return;

    const text = mottoText.textContent;
    mottoText.textContent = '';
    mottoText.style.borderRight = '2px solid var(--electric-blue)';
    
    let index = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (index < text.length) {
            mottoText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typeSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                mottoText.style.borderRight = 'none';
            }, 1000);
        }
    }

    // Start typing animation when element is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(mottoText);
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, var(--electric-blue), var(--accent-blue));
        z-index: var(--z-fixed);
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[src*="placeholder"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0.5';
                img.style.transition = 'opacity 0.3s ease';
                
                // Simulate loading delay for better UX
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 300);
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
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

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initAccessibility() {
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.member-card, .value-item, .detail-item');
    
    interactiveElements.forEach((element, index) => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });

    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .member-card:focus,
        .value-item:focus,
        .detail-item:focus {
            outline: 2px solid var(--electric-blue);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// ===== EASTER EGG =====
function initEasterEgg() {
    let clickCount = 0;
    const logo = document.querySelector('.logo-text');
    
    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 5) {
                // Create confetti effect
                createConfetti();
                clickCount = 0;
            }
        });
    }
}

function createConfetti() {
    const colors = ['#0066ff', '#00ccff', '#ffffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            z-index: 9999;
            pointer-events: none;
            animation: confetti-fall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
    
    // Add confetti animation if not exists
    if (!document.querySelector('#confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confetti-fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initParallax();
    animateCounters();
    initHoverEffects();
    initButtonAnimations();
    initTypingAnimation();
    initScrollProgress();
    initLazyLoading();
    initAccessibility();
    initEasterEgg();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🚗 Wrap Company Arg - Sobre Nosotros Cargado!');
    console.log('✨ Todas las animaciones inicializadas');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Error en sobre nosotros:', e.error);
});

// Handle image loading errors
const allImages = document.querySelectorAll('img');
if (allImages.length > 0) {
    allImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = '/placeholder.svg?height=300&width=400&text=Error+al+cargar+imagen';
            this.alt = 'Error al cargar imagen';
        });
    });
}

// ===== CONSOLE MESSAGE =====
console.log(`
🎨 Wrap Company Arg - Sobre Nosotros
👥 Conoce nuestro equipo y valores
🚗 Desarrollado por SacksVerse
`);

// ===== EXPORT FOR EXTERNAL USE =====
window.AboutPageAPI = {
    refreshAnimations: () => new AOSAnimations().refresh(),
    animateCounters,
    createConfetti
};
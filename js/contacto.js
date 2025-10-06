// ===== GLOBAL VARIABLES =====
let isFormSubmitting = false;
let formData = {};

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

// ===== FORM VALIDATION =====
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.fields = {
            name: this.form.querySelector('#name'),
            email: this.form.querySelector('#email'),
            phone: this.form.querySelector('#phone'),
            service: this.form.querySelector('#service'),
            message: this.form.querySelector('#message')
        };
        this.errors = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupRealTimeValidation();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    setupRealTimeValidation() {
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field) {
                field.addEventListener('blur', () => {
                    this.validateField(fieldName);
                });
                
                field.addEventListener('input', () => {
                    this.clearFieldError(fieldName);
                });
            }
        });
    }

    validateField(fieldName) {
        const field = this.fields[fieldName];
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El nombre es obligatorio';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'El nombre debe tener al menos 2 caracteres';
                } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'El nombre solo puede contener letras y espacios';
                }
                break;

            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El email es obligatorio';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un email válido';
                }
                break;

            case 'phone':
                if (value && !/^[\+]?[0-9\s\-$$$$]{8,}$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Ingresa un teléfono válido';
                }
                break;

            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'El mensaje es obligatorio';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'El mensaje debe tener al menos 10 caracteres';
                } else if (value.length > 1000) {
                    isValid = false;
                    errorMessage = 'El mensaje no puede exceder 1000 caracteres';
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(fieldName, errorMessage);
            this.errors[fieldName] = errorMessage;
        } else {
            this.clearFieldError(fieldName);
            delete this.errors[fieldName];
        }

        return isValid;
    }

    showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const field = this.fields[fieldName];
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        if (field) {
            field.style.borderColor = 'var(--error-red)';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        }
    }

    clearFieldError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const field = this.fields[fieldName];
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        
        if (field) {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
    }

    validateForm() {
        let isFormValid = true;
        
        // Validate required fields
        ['name', 'email', 'message'].forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isFormValid = false;
            }
        });
        
        // Validate optional fields if they have values
        if (this.fields.phone.value.trim()) {
            if (!this.validateField('phone')) {
                isFormValid = false;
            }
        }

        return isFormValid;
    }

    getFormData() {
        return {
            name: this.fields.name.value.trim(),
            email: this.fields.email.value.trim(),
            phone: this.fields.phone.value.trim(),
            service: this.fields.service.value,
            message: this.fields.message.value.trim(),
            timestamp: new Date().toISOString(),
            source: 'Página de Contacto'
        };
    }

    resetForm() {
        this.form.reset();
        Object.keys(this.fields).forEach(fieldName => {
            this.clearFieldError(fieldName);
        });
        this.errors = {};
    }

    async handleSubmit() {
        if (isFormSubmitting) return;
        
        if (!this.validateForm()) {
            this.showFormError('Por favor, corrige los errores antes de enviar');
            return;
        }

        isFormSubmitting = true;
        formData = this.getFormData();
        
        this.showLoadingState();
        
        try {
            await this.submitForm(formData);
            this.showSuccessState();
            this.resetForm();
            
            // Track form submission
            this.trackFormSubmission(formData);
            
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            this.showErrorState('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.');
        } finally {
            isFormSubmitting = false;
        }
    }

    async submitForm(data) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would integrate with your preferred email service
        // Examples: EmailJS, Formspree, Netlify Forms, etc.
        
        // For now, we'll create a mailto link as fallback
        const subject = `Consulta de ${data.name} - ${data.service || 'Consulta General'}`;
        const body = `
Nombre: ${data.name}
Email: ${data.email}
Teléfono: ${data.phone || 'No proporcionado'}
Servicio: ${data.service || 'No especificado'}

Mensaje:
${data.message}

---
Enviado desde: ${data.source}
Fecha: ${new Date(data.timestamp).toLocaleString('es-AR')}
        `.trim();
        
        const mailtoLink = `mailto:contacto@wrapcompanyarg.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open mailto link
        window.open(mailtoLink);
        
        return { success: true };
    }

    showLoadingState() {
        const submitBtn = document.getElementById('submit-btn');
        const btnLoader = document.getElementById('btn-loader');
        
        if (submitBtn && btnLoader) {
            submitBtn.disabled = true;
            btnLoader.classList.add('show');
        }
    }

    showSuccessState() {
        const submitBtn = document.getElementById('submit-btn');
        const btnLoader = document.getElementById('btn-loader');
        const successMessage = document.getElementById('success-message');
        
        if (submitBtn && btnLoader) {
            submitBtn.disabled = false;
            btnLoader.classList.remove('show');
        }
        
        if (successMessage) {
            successMessage.classList.add('show');
        }
    }

    showErrorState(message) {
        const submitBtn = document.getElementById('submit-btn');
        const btnLoader = document.getElementById('btn-loader');
        
        if (submitBtn && btnLoader) {
            submitBtn.disabled = false;
            btnLoader.classList.remove('show');
        }
        
        this.showFormError(message);
    }

    showFormError(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.form-error-general');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error-general';
            errorDiv.style.cssText = `
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.3);
                color: var(--error-red);
                padding: var(--spacing-md);
                border-radius: var(--radius-lg);
                margin-top: var(--spacing-md);
                text-align: center;
                font-weight: 500;
            `;
            this.form.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        }, 5000);
    }

    trackFormSubmission(data) {
        // Track form submission for analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: data.service || 'General',
                value: 1
            });
        }
        
        console.log('📧 Formulario enviado:', data);
    }
}

// ===== FAQ FUNCTIONALITY =====
class FAQManager {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    this.toggleFAQ(item);
                });
            }
        });
    }

    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        this.faqItems.forEach(faqItem => {
            if (faqItem !== item) {
                faqItem.classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    }
}

// ===== WHATSAPP FLOAT BUTTON =====
class WhatsAppFloat {
    constructor() {
        this.floatButton = document.getElementById('whatsapp-float');
        this.init();
    }

    init() {
        if (!this.floatButton) return;
        
        this.bindEvents();
        this.setupScrollBehavior();
    }

    bindEvents() {
        this.floatButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.openWhatsApp();
        });
    }

    setupScrollBehavior() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide button
                this.floatButton.style.transform = 'translateY(100px)';
            } else {
                // Scrolling up - show button
                this.floatButton.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    openWhatsApp() {
        const message = this.generateWhatsAppMessage();
        const whatsappURL = `https://wa.me/5491123456789?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappURL, '_blank');
        
        // Track WhatsApp click
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                event_category: 'Contact',
                event_label: 'Float Button'
            });
        }
    }

    generateWhatsAppMessage() {
        const currentTime = new Date().toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return `¡Hola! Me interesa conocer más sobre los servicios de Wrap Company ARG. 

Estoy visitando su página web y me gustaría recibir información sobre:
• Car Wrapping
• PPF (Paint Protection Film)
• Pulido profesional
• Recubrimiento cerámico

¿Podrían enviarme más detalles y disponibilidad?

Gracias! 🚗✨

Enviado desde la web a las ${currentTime}`;
    }
}

// ===== FORM ENHANCEMENTS =====
class FormEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupPhoneFormatting();
        this.setupCharacterCounter();
        this.setupServiceIcons();
        this.setupFormAnimations();
    }

    setupPhoneFormatting() {
        const phoneInput = document.getElementById('phone');
        
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    if (value.startsWith('54')) {
                        // Argentina format
                        value = value.replace(/(\d{2})(\d{1})(\d{2})(\d{4})(\d{4})/, '+$1 $2 $3 $4-$5');
                    } else if (value.length === 10) {
                        // Local format
                        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2-$3');
                    }
                }
                
                e.target.value = value;
            });
        }
    }

    setupCharacterCounter() {
        const messageTextarea = document.getElementById('message');
        
        if (messageTextarea) {
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.style.cssText = `
                text-align: right;
                font-size: var(--font-size-sm);
                color: var(--text-secondary);
                margin-top: var(--spacing-xs);
            `;
            
            messageTextarea.parentNode.appendChild(counter);
            
            const updateCounter = () => {
                const length = messageTextarea.value.length;
                const maxLength = 1000;
                counter.textContent = `${length}/${maxLength}`;
                
                if (length > maxLength * 0.9) {
                    counter.style.color = 'var(--warning-yellow)';
                } else if (length > maxLength) {
                    counter.style.color = 'var(--error-red)';
                } else {
                    counter.style.color = 'var(--text-secondary)';
                }
            };
            
            messageTextarea.addEventListener('input', updateCounter);
            updateCounter();
        }
    }

    setupServiceIcons() {
        const serviceSelect = document.getElementById('service');
        
        if (serviceSelect) {
            const serviceIcons = {
                'polarizado': '🕶️',
                'ppf': '🛡️',
                'pulido': '✨',
                'ceramico': '💎',
                'antivandálico': '🔒',
                'interior': '🧽',
                'ploteo': '🎨',
                'consulta': '💬'
            };
            
            serviceSelect.addEventListener('change', (e) => {
                const selectedValue = e.target.value;
                const icon = serviceIcons[selectedValue];
                
                if (icon) {
                    const labelIcon = serviceSelect.parentNode.querySelector('.label-icon');
                    if (labelIcon) {
                        labelIcon.textContent = icon;
                    }
                }
            });
        }
    }

    setupFormAnimations() {
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'translateY(-2px)';
                input.style.boxShadow = '0 8px 25px rgba(0, 102, 255, 0.15)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = '';
                input.style.boxShadow = '';
            });
        });
    }
}

// ===== SUCCESS MESSAGE HANDLER =====
function setupSuccessMessage() {
    const newMessageBtn = document.getElementById('new-message-btn');
    const successMessage = document.getElementById('success-message');
    
    if (newMessageBtn && successMessage) {
        newMessageBtn.addEventListener('click', () => {
            successMessage.classList.remove('show');
        });
    }
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
    // Add keyboard navigation for FAQ items
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
                
                const isExpanded = question.parentNode.classList.contains('active');
                question.setAttribute('aria-expanded', isExpanded.toString());
            }
        });
    });
    
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .faq-question:focus {
            outline: 2px solid var(--electric-blue);
            outline-offset: 2px;
        }
        
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
            outline: none;
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new AOSAnimations();
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        new FormValidator(contactForm);
    }
    
    new FAQManager();
    new WhatsAppFloat();
    new FormEnhancements();
    
    setupSuccessMessage();
    initAccessibility();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('📞 Wrap Company Arg - Contacto Cargado!');
    console.log('✅ Formulario con validación completa');
    console.log('💬 WhatsApp integrado');
    console.log('❓ FAQ interactivo');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Error en contacto:', e.error);
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
📞 Wrap Company Arg - Contacto
📧 Formulario completo con validación
🗺️ Mapa integrado y FAQ interactivo
🚗 Desarrollado por SacksVerse
`);

// ===== EXPORT FOR EXTERNAL USE =====
window.ContactPageAPI = {
    submitForm: (data) => new FormValidator(document.getElementById('contact-form')).submitForm(data),
    openWhatsApp: () => new WhatsAppFloat().openWhatsApp(),
    refreshAnimations: () => new AOSAnimations().refresh()
};
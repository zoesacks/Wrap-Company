// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("mainNavbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = {
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    email: document.getElementById("email").value,
    servicio: document.getElementById("servicio").value,
    mensaje: document.getElementById("mensaje").value,
  }

  // Basic validation
  if (!formData.nombre || !formData.telefono || !formData.email || !formData.servicio) {
    alert("Por favor, completa todos los campos obligatorios.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    alert("Por favor, ingresa un email válido.")
    return
  }

  // Simulate form submission
  const submitBtn = document.querySelector('#contactForm button[type="submit"]')
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("¡Gracias por tu consulta! Te contactaremos pronto.")
    document.getElementById("contactForm").reset()
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Initialize carousel with custom settings
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("#trabajosCarousel")
  if (carousel) {
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: 5000,
      wrap: true,
      touch: true,
    })
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe service cards for animation
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })
})

// Mobile menu close on link click
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse")
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse)
      bsCollapse.hide()
    }
  })
})

// Preload images for better performance
function preloadImages() {
  const imageUrls = ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=1080&width=1920"]

  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

// Initialize preloading
document.addEventListener("DOMContentLoaded", preloadImages)

// Add loading states for better UX
function addLoadingState(element) {
  element.classList.add("loading")
  setTimeout(() => {
    element.classList.remove("loading")
  }, 1000)
}

// Error handling for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "/placeholder.svg?height=300&width=500"
      this.alt = "Imagen no disponible"
    })
  })
})

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("loading")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Utility function for smooth animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll")
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("active")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)

// Initialize tooltips if Bootstrap tooltips are used
document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
})

// Console log for debugging
console.log("Wrap Company ARG - Website loaded successfully")
console.log("Developed by: Mauro – Wrap Company ARG")

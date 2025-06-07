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
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Gallery lightbox functionality
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item")
  const modal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")

  if (galleryItems.length > 0 && modal && modalImage) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const imageSrc = this.getAttribute("data-image")
        modalImage.src = imageSrc
      })
    })
  }
})

// Color filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const finishFilter = document.getElementById("finishFilter")
  const serviceFilter = document.getElementById("serviceFilter")
  const colorFilter = document.getElementById("colorFilter")
  const colorItems = document.querySelectorAll(".color-item")

  if (finishFilter && serviceFilter && colorFilter && colorItems.length > 0) {
    function filterColors() {
      const selectedFinish = finishFilter.value
      const selectedService = serviceFilter.value
      const selectedColor = colorFilter.value

      colorItems.forEach((item) => {
        const itemFinish = item.getAttribute("data-finish")
        const itemService = item.getAttribute("data-service")
        const itemColor = item.getAttribute("data-color")

        let showItem = true

        if (selectedFinish && itemFinish !== selectedFinish) {
          showItem = false
        }

        if (selectedService && itemService !== selectedService) {
          showItem = false
        }

        if (selectedColor && itemColor !== selectedColor) {
          showItem = false
        }

        if (showItem) {
          item.style.display = "block"
          item.style.animation = "fadeIn 0.5s ease-in-out"
        } else {
          item.style.display = "none"
        }
      })
    }

    finishFilter.addEventListener("change", filterColors)
    serviceFilter.addEventListener("change", filterColors)
    colorFilter.addEventListener("change", filterColors)
  }
})

// Contact form handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const nombre = document.getElementById("nombre").value
      const email = document.getElementById("email").value
      const telefono = document.getElementById("telefono").value
      const servicio = document.getElementById("servicio").value
      const vehiculo = document.getElementById("vehiculo").value
      const mensaje = document.getElementById("mensaje").value

      // Basic validation
      if (!nombre || !email || !telefono || !servicio) {
        alert("Por favor completa todos los campos obligatorios.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Por favor ingresa un email válido.")
        return
      }

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...'
      submitButton.disabled = true

      // Simulate API call
      setTimeout(() => {
        alert("¡Gracias por tu consulta! Te contactaremos pronto.")
        this.reset()
        submitButton.innerHTML = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }
})

// Carousel auto-play control
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel")

  carousels.forEach((carousel) => {
    // Pause carousel on hover
    carousel.addEventListener("mouseenter", function () {
      const carouselInstance = bootstrap.Carousel.getInstance(this)
      if (carouselInstance) {
        carouselInstance.pause()
      }
    })

    // Resume carousel when mouse leaves
    carousel.addEventListener("mouseleave", function () {
      const carouselInstance = bootstrap.Carousel.getInstance(this)
      if (carouselInstance) {
        carouselInstance.cycle()
      }
    })
  })
})

// Intersection Observer for animations
document.addEventListener("DOMContentLoaded", () => {
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

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".service-card, .color-card, .gallery-item, .contact-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// WhatsApp integration
function openWhatsApp(message = "") {
  const phoneNumber = "5491112345678"
  const defaultMessage = message || "Hola! Me interesa conocer más sobre sus servicios de wrapping."
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`
  window.open(url, "_blank")
}

// Add WhatsApp floating button
document.addEventListener('DOMContentLoaded', () => {
    const whatsappButton = document.createElement('div');
    whatsappButton.innerHTML = `
        <a href="javascript:void(0)" onclick="openWhatsApp()" class="whatsapp-float">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    
    // Add WhatsApp floating button styles
    const whatsappStyles = `
        .whatsapp-float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 20px;
            right: 20px;
            background-color: #25d366;
            color: white;
            border-radius: 50%;
            text-align: center;
            font-size: 24px;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;

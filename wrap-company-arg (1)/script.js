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

// Gallery filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter]")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter")

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        this.classList.add("active")

        // Filter items
        galleryItems.forEach((item) => {
          if (filter === "all" || item.getAttribute("data-category") === filter) {
            item.style.display = "block"
            item.classList.add("fade-in-up")
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }
})

// Color filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const finishFilter = document.getElementById("finishFilter")
  const applicationFilter = document.getElementById("applicationFilter")
  const colorSearch = document.getElementById("colorSearch")
  const colorItems = document.querySelectorAll(".color-item")
  const noResults = document.getElementById("noResults")

  function filterColors() {
    const finishValue = finishFilter ? finishFilter.value : "all"
    const applicationValue = applicationFilter ? applicationFilter.value : "all"
    const searchValue = colorSearch ? colorSearch.value.toLowerCase() : ""

    let visibleCount = 0

    colorItems.forEach((item) => {
      const finish = item.getAttribute("data-finish")
      const application = item.getAttribute("data-application")
      const name = item.getAttribute("data-name").toLowerCase()

      const finishMatch = finishValue === "all" || finish === finishValue
      const applicationMatch = applicationValue === "all" || application === applicationValue
      const nameMatch = searchValue === "" || name.includes(searchValue)

      if (finishMatch && applicationMatch && nameMatch) {
        item.style.display = "block"
        visibleCount++
      } else {
        item.style.display = "none"
      }
    })

    // Show/hide no results message
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none"
    }
  }

  // Add event listeners
  if (finishFilter) finishFilter.addEventListener("change", filterColors)
  if (applicationFilter) applicationFilter.addEventListener("change", filterColors)
  if (colorSearch) colorSearch.addEventListener("input", filterColors)
})

// Image modal functionality
document.addEventListener("DOMContentLoaded", () => {
  const imageModal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")

  if (imageModal && modalImage) {
    document.querySelectorAll('[data-bs-toggle="modal"][data-image]').forEach((button) => {
      button.addEventListener("click", function () {
        const imageSrc = this.getAttribute("data-image")
        modalImage.src = imageSrc
      })
    })
  }
})

// Contact form validation and submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const successMessage = document.getElementById("successMessage")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Add Bootstrap validation classes
      contactForm.classList.add("was-validated")

      // Check if form is valid
      if (contactForm.checkValidity()) {
        // Simulate form submission
        setTimeout(() => {
          contactForm.reset()
          contactForm.classList.remove("was-validated")
          if (successMessage) {
            successMessage.style.display = "block"
            setTimeout(() => {
              successMessage.style.display = "none"
            }, 5000)
          }
        }, 1000)
      }
    })
  }
})

// Initialize Bootstrap components
document.addEventListener("DOMContentLoaded", () => {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Initialize carousels
  const carousels = document.querySelectorAll(".carousel")
  carousels.forEach((carousel) => {
    new bootstrap.Carousel(carousel, {
      interval: 5000,
      wrap: true,
    })
  })
})

// Loading animation
window.addEventListener("load", () => {
  const loadingElements = document.querySelectorAll(".loading")
  loadingElements.forEach((element) => {
    element.classList.add("loaded")
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
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe service cards, gallery items, and other elements
  const elementsToObserve = document.querySelectorAll(
    ".service-card, .gallery-card, .color-card, .contact-form-container, .contact-info",
  )
  elementsToObserve.forEach((element) => {
    observer.observe(element)
  })
})

// Mobile menu close on link click
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })
})

// Preload critical images
document.addEventListener("DOMContentLoaded", () => {
  const criticalImages = [
    "/placeholder.svg?height=1080&width=1920", // Hero background
    "/placeholder.svg?height=400&width=600", // Service images
  ]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})

// Performance optimization: Lazy loading for non-critical images
document.addEventListener("DOMContentLoaded", () => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }
})

// Error handling for images
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "/placeholder.svg?height=300&width=400"
      this.alt = "Imagen no disponible"
    })
  })
})

// WhatsApp integration
function openWhatsApp(message = "") {
  const phone = "541112345678"
  const defaultMessage = "Hola! Me interesa conocer más sobre sus servicios de Wrap Company ARG."
  const finalMessage = message || defaultMessage
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`
  window.open(url, "_blank")
}

// Add WhatsApp functionality to relevant buttons
document.addEventListener("DOMContentLoaded", () => {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]')
  whatsappLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      openWhatsApp()
    })
  })
})

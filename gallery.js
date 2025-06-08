// Gallery filtering functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      // Filter items
      galleryItems.forEach((item) => {
        const categories = item.getAttribute("data-category")

        if (filter === "all" || categories.includes(filter)) {
          item.classList.remove("hidden")
        } else {
          item.classList.add("hidden")
        }
      })
    })
  })

  // Modal functionality with carousel
  const imageModal = document.getElementById("imageModal")
  const modalTitle = document.getElementById("imageModalLabel")
  const modalDescription = document.getElementById("modalDescription")
  const modalCarouselInner = document.getElementById("modalCarouselInner")

  // Datos de imágenes para el carrusel (simulando múltiples imágenes por proyecto)
  const galleryProjects = {
    "BMW M3 - Ploteo Mate Negro": [
      { src: "/placeholder.svg?height=600&width=800", alt: "BMW M3 Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "BMW M3 Lateral" },
      { src: "/placeholder.svg?height=600&width=800", alt: "BMW M3 Trasero" },
    ],
    "Audi A4 - Wrapping Satinado": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Audi A4 Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Audi A4 Lateral" },
    ],
    "Mercedes-Benz C63 - Ploteo Corporativo": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Mercedes Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Mercedes Lateral" },
    ],
    "Porsche 911 - PPF Completo": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Porsche Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Porsche Lateral" },
    ],
    "Tesla Model S - PPF Frontal": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Tesla Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Tesla Lateral" },
    ],
    "Ferrari 488 - Tratamiento Cerámico": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Ferrari Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Ferrari Lateral" },
    ],
    "Lamborghini Huracán - Cerámico": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Lamborghini Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Lamborghini Lateral" },
    ],
    "Range Rover - Polarizado Intermedio": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Range Rover Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Range Rover Lateral" },
    ],
    "Ford Mustang - Polarizado Claro": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Mustang Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Mustang Lateral" },
    ],
    "Chevrolet Camaro - Llantas Personalizadas": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Camaro Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Camaro Lateral" },
    ],
    "Volkswagen Golf GTI - Llantas Azules": [
      { src: "/placeholder.svg?height=600&width=800", alt: "Golf Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "Golf Lateral" },
    ],
    "Proyecto Completo - McLaren 720S": [
      { src: "/placeholder.svg?height=600&width=800", alt: "McLaren Frontal" },
      { src: "/placeholder.svg?height=600&width=800", alt: "McLaren Lateral" },
      { src: "/placeholder.svg?height=600&width=800", alt: "McLaren Trasero" },
    ],
  }

  // Handle modal data
  imageModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget
    const title = button.getAttribute("data-title")
    const description = button.getAttribute("data-description")

    modalTitle.textContent = title
    modalDescription.textContent = description

    // Limpiar el carrusel
    modalCarouselInner.innerHTML = ""

    // Obtener las imágenes para este proyecto
    const images = galleryProjects[title] || [{ src: button.getAttribute("data-image"), alt: title }]

    // Agregar las imágenes al carrusel
    images.forEach((image, index) => {
      const carouselItem = document.createElement("div")
      carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`

      const img = document.createElement("img")
      img.src = image.src
      img.alt = image.alt
      img.className = "img-fluid w-100"

      carouselItem.appendChild(img)
      modalCarouselInner.appendChild(carouselItem)
    })

    // Inicializar el carrusel
    const modalCarouselElement = document.getElementById("modalCarousel")
    const modalCarousel = new bootstrap.Carousel(modalCarouselElement, {
      interval: 3000,
      wrap: true,
    })
  })

  // Lazy loading for gallery images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute("data-src")
          observer.unobserve(img)
        }
      }
    })
  })

  // Observe all images with data-src
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
})

// Keyboard navigation for modal
document.addEventListener("keydown", (e) => {
  const modal = document.querySelector("#imageModal.show")
  if (modal) {
    if (e.key === "ArrowLeft") {
      // Previous image logic could be added here
    } else if (e.key === "ArrowRight") {
      // Next image logic could be added here
    }
  }
})

// Console log for debugging
console.log("Gallery functionality loaded - Mauro – Wrap Company ARG")

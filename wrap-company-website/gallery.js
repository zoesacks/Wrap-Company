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

  // Modal functionality
  const imageModal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("imageModalLabel")
  const modalDescription = document.getElementById("modalDescription")

  // Handle modal data
  imageModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget
    const imageSrc = button.getAttribute("data-image")
    const title = button.getAttribute("data-title")
    const description = button.getAttribute("data-description")

    modalImage.src = imageSrc
    modalImage.alt = title
    modalTitle.textContent = title
    modalDescription.textContent = description
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

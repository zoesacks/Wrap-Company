// ===== GLOBAL VARIABLES =====
let currentFilter = "all"
let searchTerm = ""
let visibleCards = 12
const cardsPerLoad = 12

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("theme-toggle")
const body = document.body

if (themeToggle) {
  const themeIcon = themeToggle.querySelector(".theme-icon")

  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem("theme") || "dark"
  body.classList.add(currentTheme === "light" ? "light-theme" : "dark-theme")
  updateThemeIcon(currentTheme)

  themeToggle.addEventListener("click", () => {
    const isLight = body.classList.contains("light-theme")

    if (isLight) {
      body.classList.remove("light-theme")
      body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
      updateThemeIcon("dark")
    } else {
      body.classList.remove("dark-theme")
      body.classList.add("light-theme")
      localStorage.setItem("theme", "light")
      updateThemeIcon("light")
    }
  })

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === "light" ? "🌙" : "☀️"
    }
  }
}

// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navClose = document.getElementById("nav-close")
const navLinks = document.querySelectorAll(".nav__link")

// Show menu
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
    document.body.style.overflow = "hidden"
  })
}

// Hide menu
if (navClose && navMenu) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
    document.body.style.overflow = "auto"
  })
}

// Hide menu when clicking on nav links
if (navLinks.length > 0 && navMenu) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show-menu")
      document.body.style.overflow = "auto"
    })
  })
}

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById("header")

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      header.style.background = body.classList.contains("light-theme")
        ? "rgba(255, 255, 255, 0.98)"
        : "rgba(26, 26, 26, 0.98)"
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.background = body.classList.contains("light-theme")
        ? "rgba(255, 255, 255, 0.95)"
        : "rgba(26, 26, 26, 0.95)"
      header.style.boxShadow = "none"
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const colorCards = document.querySelectorAll(".color-card")
  const colorModal = document.getElementById("color-modal")
  const colorModalOverlay = document.getElementById("color-modal-overlay")
  const colorModalClose = document.getElementById("color-modal-close")
  const colorModalContent = document.getElementById("color-modal-content")
  const loadMoreBtn = document.getElementById("load-more-btn")

  // Show more colors initially
  const initialCardsToShow = 12
  const cardsToShowOnLoad = 6
  const currentCardsShown = 0

  // Initialize cards display
  //showInitialCards()

  // Event Listeners
  /*colorCards.forEach((card) => {
    card.querySelector(".color-btn").addEventListener("click", () => {
      openColorModal(card)
    })
  })

  colorModalOverlay.addEventListener("click", closeColorModal)
  colorModalClose.addEventListener("click", closeColorModal)

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMoreColors)
  }*/

  // Functions
  /*function showInitialCards() {
    colorCards.forEach((card, index) => {
      if (index < initialCardsToShow) {
        card.style.display = "block"
        currentCardsShown++
      } else {
        card.style.display = "none"
      }
    })

    updateLoadMoreButton()
  }

  function loadMoreColors() {
    const cardsToShow = Math.min(currentCardsShown + cardsToShowOnLoad, colorCards.length)

    for (let i = currentCardsShown; i < cardsToShow; i++) {
      if (colorCards[i]) {
        colorCards[i].style.display = "block"
      }
    }

    currentCardsShown = cardsToShow
    updateLoadMoreButton()
  }

  function updateLoadMoreButton() {
    if (currentCardsShown >= colorCards.length) {
      loadMoreBtn.style.display = "none"
    } else {
      loadMoreBtn.style.display = "inline-flex"
    }
  }

  function openColorModal(card) {
    const colorName = card.getAttribute("data-name")
    const colorCategory = card.querySelector(".color-category").textContent
    const colorCode = card.querySelector(".color-code").textContent
    const colorSample = card.querySelector(".color-sample").getAttribute("style")

    // Create modal content
    colorModalContent.innerHTML = `
            <div class="modal-color-preview" style="${colorSample}; height: 200px; border-radius: 8px;"></div>
            <div class="modal-color-details">
                <h2>${colorName}</h2>
                <p>${colorCategory}</p>
                <p>Código: ${colorCode}</p>
                <div class="modal-color-actions">
                    <button class="modal-btn modal-btn--primary">Solicitar este color</button>
                    <button class="modal-btn">Agregar a favoritos</button>
                </div>
            </div>
        `

    // Show modal
    colorModal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeColorModal() {
    colorModal.classList.remove("active")
    document.body.style.overflow = ""
  }*/
})

// ===== FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll(".filter-btn")
const searchInput = document.getElementById("color-search")
const searchClear = document.getElementById("search-clear")
const colorCards = document.querySelectorAll(".color-card")

// Filter by category
function filterColors(category) {
  currentFilter = category
  applyFilters()
  updateFilterCounts()
  updateActiveFilter(category)
}

// Search functionality
function searchColors(term) {
  searchTerm = term.toLowerCase()
  applyFilters()

  // Show/hide clear button
  if (searchClear) {
    searchClear.style.display = term ? "flex" : "none"
  }
}

// Apply both filters and search
function applyFilters() {
  let visibleCount = 0

  colorCards.forEach((card, index) => {
    const category = card.getAttribute("data-category")
    const name = card.getAttribute("data-name").toLowerCase()

    const matchesFilter = currentFilter === "all" || category === currentFilter
    const matchesSearch = !searchTerm || name.includes(searchTerm)
    const shouldShow = matchesFilter && matchesSearch && index < visibleCards

    if (shouldShow) {
      card.classList.remove("hidden")
      card.style.display = "block"
      visibleCount++

      // Animate in
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "scale(1)"
      }, index * 50)
    } else {
      card.style.opacity = "0"
      card.style.transform = "scale(0.8)"

      setTimeout(() => {
        card.classList.add("hidden")
        if (!matchesFilter || !matchesSearch) {
          card.style.display = "none"
        }
      }, 300)
    }
  })

  updateLoadMoreButton()
}

// Update filter button counts
function updateFilterCounts() {
  const counts = {
    all: 0,
    mate: 0,
    brillante: 0,
    satinado: 0,
    especial: 0,
  }

  colorCards.forEach((card) => {
    const category = card.getAttribute("data-category")
    const name = card.getAttribute("data-name").toLowerCase()
    const matchesSearch = !searchTerm || name.includes(searchTerm)

    if (matchesSearch) {
      counts.all++
      counts[category]++
    }
  })

  Object.keys(counts).forEach((category) => {
    const countElement = document.getElementById(`count-${category}`)
    if (countElement) {
      countElement.textContent = counts[category]
    }
  })
}

// Update active filter button
function updateActiveFilter(activeCategory) {
  filterButtons.forEach((btn) => {
    btn.classList.remove("filter-btn--active")
    if (btn.getAttribute("data-filter") === activeCategory) {
      btn.classList.add("filter-btn--active")
    }
  })
}

// Event listeners for filter buttons
if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")
      filterColors(filter)

      // Add button click animation
      button.style.transform = "scale(0.95)"
      setTimeout(() => {
        button.style.transform = ""
      }, 150)
    })
  })
}

// Event listeners for search
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchColors(e.target.value)
  })
}

if (searchClear) {
  searchClear.addEventListener("click", () => {
    searchInput.value = ""
    searchColors("")
  })
}

// ===== LOAD MORE FUNCTIONALITY =====
const loadMoreBtn = document.getElementById("load-more-btn")
const loadMoreContainer = document.getElementById("load-more-container")

function updateLoadMoreButton() {
  if (!loadMoreBtn || !loadMoreContainer) return

  const totalMatchingCards = Array.from(colorCards).filter((card) => {
    const category = card.getAttribute("data-category")
    const name = card.getAttribute("data-name").toLowerCase()
    const matchesFilter = currentFilter === "all" || category === currentFilter
    const matchesSearch = !searchTerm || name.includes(searchTerm)
    return matchesFilter && matchesSearch
  }).length

  if (visibleCards >= totalMatchingCards) {
    loadMoreContainer.style.display = "none"
  } else {
    loadMoreContainer.style.display = "block"
  }
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visibleCards += cardsPerLoad
    applyFilters()

    // Add button animation
    loadMoreBtn.style.transform = "scale(0.95)"
    setTimeout(() => {
      loadMoreBtn.style.transform = ""
    }, 150)
  })
}

// ===== COLOR MODAL FUNCTIONALITY =====
const colorModal = document.getElementById("color-modal")
const colorModalOverlay = document.getElementById("color-modal-overlay")
const colorModalClose = document.getElementById("color-modal-close")
const colorModalContent = document.getElementById("color-modal-content")

// Color details data
const colorDetails = {
  mate: {
    description:
      "Los acabados mate ofrecen una apariencia sofisticada y moderna, sin reflejos. Ideales para un look elegante y discreto.",
    features: [
      { icon: "🎯", title: "Sin Reflejos", text: "Superficie completamente mate" },
      { icon: "🛡️", title: "Resistente", text: "Alta durabilidad y resistencia" },
      { icon: "✨", title: "Elegante", text: "Apariencia premium y sofisticada" },
    ],
  },
  brillante: {
    description:
      "Los acabados brillantes proporcionan un brillo intenso y colores vibrantes que destacan bajo cualquier luz.",
    features: [
      { icon: "💎", title: "Alto Brillo", text: "Reflejo intenso y luminoso" },
      { icon: "🌈", title: "Colores Vivos", text: "Tonalidades vibrantes y saturadas" },
      { icon: "🔥", title: "Impactante", text: "Máximo impacto visual" },
    ],
  },
  satinado: {
    description:
      "Los acabados satinados combinan lo mejor de ambos mundos: elegancia mate con un sutil brillo perlado.",
    features: [
      { icon: "🌟", title: "Brillo Sutil", text: "Reflejo suave y elegante" },
      { icon: "🎨", title: "Versátil", text: "Perfecto para cualquier estilo" },
      { icon: "💫", title: "Perlado", text: "Efecto nacarado único" },
    ],
  },
  especial: {
    description:
      "Los acabados especiales incluyen efectos únicos como cromo, camaleón y holográfico para resultados extraordinarios.",
    features: [
      { icon: "🔮", title: "Efectos Únicos", text: "Acabados exclusivos y llamativos" },
      { icon: "🌈", title: "Cambia Color", text: "Tonalidades que varían con la luz" },
      { icon: "⭐", title: "Premium", text: "Máxima calidad y exclusividad" },
    ],
  },
}

// Open color modal
function openColorModal(colorCard) {
  if (!colorModal || !colorCard) return

  const colorName = colorCard.getAttribute("data-name")
  const colorCategory = colorCard.getAttribute("data-category")
  const colorImage = colorCard.querySelector(".color-image")
  const colorCode = colorCard.querySelector(".color-code").textContent

  const categoryDetails = colorDetails[colorCategory] || colorDetails["mate"]

  const modalHTML = `
        <div class="modal-color-sample" style="background-image: url('${colorImage.src}'); background-size: cover; background-position: center;"></div>
        <div class="modal-color-info">
            <h2 class="modal-color-name">${colorName}</h2>
            <p class="modal-color-category">Acabado: ${colorCategory.charAt(0).toUpperCase() + colorCategory.slice(1)}</p>
            <span class="modal-color-code">${colorCode}</span>
            
            <p class="modal-color-description">${categoryDetails.description}</p>
            
            <div class="modal-color-features">
                ${categoryDetails.features
                  .map(
                    (feature) => `
                    <div class="modal-feature">
                        <div class="modal-feature-icon">${feature.icon}</div>
                        <h4 class="modal-feature-title">${feature.title}</h4>
                        <p class="modal-feature-text">${feature.text}</p>
                    </div>
                `,
                  )
                  .join("")}
            </div>
            
            <div class="modal-color-actions">
                <a href="https://wa.me/5491162601611?text=Hola! Me interesa el color ${colorName} (${colorCategory})" 
                   class="modal-color-btn modal-color-btn--primary" target="_blank">
                    <span>💬</span>
                    Consultar Disponibilidad
                </a>
                <button class="modal-color-btn modal-color-btn--secondary" onclick="closeColorModal()">
                    <span>←</span>
                    Volver al Catálogo
                </button>
            </div>
        </div>
    `

  colorModalContent.innerHTML = modalHTML
  colorModal.classList.add("active")
  document.body.classList.add("modal-open")
}

// Close color modal
function closeColorModal() {
  if (!colorModal) return

  colorModal.classList.remove("active")
  document.body.classList.remove("modal-open")

  setTimeout(() => {
    if (colorModalContent) {
      colorModalContent.innerHTML = ""
    }
  }, 300)
}

// Event listeners for color cards
if (colorCards.length > 0) {
  colorCards.forEach((card) => {
    const colorBtn = card.querySelector(".color-btn")

    if (colorBtn) {
      colorBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        openColorModal(card)
      })
    }

    // Also allow clicking the entire card
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".color-btn")) {
        openColorModal(card)
      }
    })
  })
}

// Close modal event listeners
if (colorModalClose) {
  colorModalClose.addEventListener("click", closeColorModal)
}

if (colorModalOverlay) {
  colorModalOverlay.addEventListener("click", closeColorModal)
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (colorModal && colorModal.classList.contains("active")) {
    if (e.key === "Escape") {
      closeColorModal()
    }
  }
})

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Initialize filters and display
  applyFilters()
  updateFilterCounts()

  // Add loading animation
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)

  console.log("🎨 Wrap Company Arg - Catálogo Cargado!")
  console.log(`🌈 ${colorCards.length} colores disponibles`)
})

// Export functions for external use
window.CatalogAPI = {
  filterColors,
  searchColors,
  openColorModal,
  closeColorModal,
}

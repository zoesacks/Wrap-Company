// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("theme-toggle")
const body = document.body
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
  themeIcon.textContent = theme === "light" ? "🌙" : "☀️"
}

// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const navClose = document.getElementById("nav-close")
const navLinks = document.querySelectorAll(".nav__link")

// Show menu
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
    document.body.style.overflow = "hidden"
  })
}

// Hide menu
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
    document.body.style.overflow = "auto"
  })
}

// Hide menu when clicking on nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
    document.body.style.overflow = "auto"
  })
})

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById("header")

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

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate")
    }
  })
}, observerOptions)

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el)
})

// ===== SERVICE DETAILS TOGGLE =====
const serviceButtons = document.querySelectorAll(".service__btn")

serviceButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const service = this.getAttribute("data-service")
    const details = document.getElementById(`${service}-details`)
    const isActive = details.classList.contains("active")

    // Close all other details
    document.querySelectorAll(".service__details").forEach((detail) => {
      detail.classList.remove("active")
    })

    // Reset all button texts
    serviceButtons.forEach((btn) => {
      btn.textContent = "Ver más"
    })

    // Toggle current details
    if (!isActive) {
      details.classList.add("active")
      this.textContent = "Ver menos"
    }

    // Add click animation
    this.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.style.transform = ""
    }, 150)
  })
})

// ===== GALLERY CAROUSEL =====
class Carousel {
  constructor(carouselSelector, slideSelector, navPrevSelector, navNextSelector, indicatorsSelector) {
    this.carousel = document.querySelector(carouselSelector)
    this.slides = document.querySelectorAll(slideSelector)
    this.navPrev = document.querySelector(navPrevSelector)
    this.navNext = document.querySelector(navNextSelector)
    this.indicators = document.querySelectorAll(
      `${indicatorsSelector} .gallery__indicator, ${indicatorsSelector} .testimonials__indicator`,
    )

    this.currentSlide = 0
    this.totalSlides = this.slides.length
    this.autoPlayInterval = null

    this.init()
  }

  init() {
    if (!this.carousel || this.totalSlides === 0) return

    this.showSlide(0)
    this.bindEvents()
    this.startAutoPlay()
  }

  bindEvents() {
    // Navigation buttons
    if (this.navPrev) {
      this.navPrev.addEventListener("click", () => {
        this.prevSlide()
        this.resetAutoPlay()
      })
    }

    if (this.navNext) {
      this.navNext.addEventListener("click", () => {
        this.nextSlide()
        this.resetAutoPlay()
      })
    }

    // Indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index)
        this.resetAutoPlay()
      })
    })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prevSlide()
        this.resetAutoPlay()
      } else if (e.key === "ArrowRight") {
        this.nextSlide()
        this.resetAutoPlay()
      }
    })

    // Touch/swipe support
    let startX = 0
    let endX = 0

    this.carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX
    })

    this.carousel.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX
      const diff = startX - endX

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide()
        } else {
          this.prevSlide()
        }
        this.resetAutoPlay()
      }
    })

    // Pause autoplay on hover
    this.carousel.addEventListener("mouseenter", () => {
      this.stopAutoPlay()
    })

    this.carousel.addEventListener("mouseleave", () => {
      this.startAutoPlay()
    })
  }

  showSlide(index) {
    // Remove active class from all slides
    this.slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove active class from all indicators
    this.indicators.forEach((indicator) => {
      indicator.classList.remove("active")
    })

    // Add active class to current slide and indicator
    if (this.slides[index]) {
      this.slides[index].classList.add("active")
    }

    if (this.indicators[index]) {
      this.indicators[index].classList.add("active")
    }

    // Update carousel transform
    const translateX = -index * 100
    this.carousel.style.transform = `translateX(${translateX}%)`

    this.currentSlide = index
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides
    this.showSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides
    this.showSlide(prevIndex)
  }

  goToSlide(index) {
    if (index >= 0 && index < this.totalSlides) {
      this.showSlide(index)
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay()
    this.startAutoPlay()
  }
}

// Initialize carousels
document.addEventListener("DOMContentLoaded", () => {
  // Gallery carousel
  new Carousel("#gallery-carousel", ".gallery__slide", "#gallery-prev", "#gallery-next", "#gallery-indicators")

  // Testimonials carousel
  new Carousel(
    "#testimonials-carousel",
    ".testimonial__slide",
    "#testimonials-prev",
    "#testimonials-next",
    "#testimonials-indicators",
  )
})

// ===== PARALLAX EFFECT =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const heroContent = document.querySelector(".hero__content")

  if (hero && heroContent) {
    // Parallax effect for hero background
    const rate = scrolled * -0.5
    hero.style.transform = `translateY(${rate}px)`

    // Fade out hero content on scroll
    const opacity = Math.max(0, 1 - scrolled / (window.innerHeight * 0.8))
    heroContent.style.opacity = opacity
  }
})

// ===== FADE-IN ANIMATION FOR HERO TITLE =====
function fadeInText(element, text, speed = 100) {
  element.innerHTML = "" // limpio el contenido

  // Creo un span para cada letra y lo escondo
  text.split("").forEach((char, i) => {
    const span = document.createElement("span")
    span.textContent = char
    span.style.opacity = 0
    span.style.transition = `opacity ${speed}ms ease`
    element.appendChild(span)

    // hago que aparezca con delay
    setTimeout(() => {
      span.style.opacity = 1
    }, i * speed)
  })
}

// Initialize fade-in animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero__title-main")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    fadeInText(heroTitle, originalText, 80) // podés cambiar la velocidad
  }
})

// Initialize counter animations when footer stats come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".footer__stat-number")
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-count"))
          animateCounter(counter, target)
        })
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const statsSection = document.querySelector(".footer__stats")
if (statsSection) {
  statsObserver.observe(statsSection)
}

// ===== FORM VALIDATION (if contact form exists) =====
const contactForm = document.getElementById("contact-form")

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Basic validation
    const name = this.querySelector('input[name="name"]').value
    const email = this.querySelector('input[name="email"]').value
    const message = this.querySelector('textarea[name="message"]').value

    if (!name || !email || !message) {
      alert("Por favor, completa todos los campos")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un email válido")
      return
    }

    // Success animation
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Enviando..."
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      submitBtn.textContent = "¡Enviado!"
      setTimeout(() => {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
        this.reset()
      }, 2000)
    }, 1000)
  })
}

// ===== NEWSLETTER FUNCTIONALITY =====
const newsletterForm = document.getElementById("newsletter-form")

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const emailInput = this.querySelector(".footer__newsletter-input")
    const submitBtn = this.querySelector(".footer__newsletter-btn")
    const btnText = submitBtn.querySelector(".footer__newsletter-btn-text")
    const btnIcon = submitBtn.querySelector(".footer__newsletter-btn-icon")

    const email = emailInput.value.trim()

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      // Show error animation
      emailInput.style.borderColor = "#ff4444"
      emailInput.style.boxShadow = "0 0 0 3px rgba(255, 68, 68, 0.2)"
      setTimeout(() => {
        emailInput.style.borderColor = ""
        emailInput.style.boxShadow = ""
      }, 2000)
      return
    }

    // Success animation
    const originalBtnText = btnText.textContent
    const originalBtnIcon = btnIcon.textContent

    btnText.textContent = "Enviando..."
    btnIcon.textContent = "⏳"
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      btnText.textContent = "¡Suscrito!"
      btnIcon.textContent = "✓"
      submitBtn.style.background = "linear-gradient(135deg, #25d366, #20b358)"

      setTimeout(() => {
        btnText.textContent = originalBtnText
        btnIcon.textContent = originalBtnIcon
        submitBtn.style.background = ""
        submitBtn.disabled = false
        emailInput.value = ""

        // Success message
        const successMsg = document.createElement("div")
        successMsg.textContent = "¡Gracias por suscribirte! 🎉"
        successMsg.style.cssText = `
                    position: absolute;
                    top: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #25d366;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    opacity: 0;
                    transition: all 0.3s ease;
                    z-index: 1000;
                `

        newsletterForm.style.position = "relative"
        newsletterForm.appendChild(successMsg)

        setTimeout(() => {
          successMsg.style.opacity = "1"
          successMsg.style.top = "-50px"
        }, 100)

        setTimeout(() => {
          successMsg.style.opacity = "0"
          setTimeout(() => {
            if (successMsg.parentNode) {
              successMsg.parentNode.removeChild(successMsg)
            }
          }, 300)
        }, 3000)
      }, 2000)
    }, 1500)
  })
}

// ===== FOOTER ANIMATIONS =====
// Animate footer sections on scroll
const footerSections = document.querySelectorAll(".footer__section")
const footerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

footerSections.forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "all 0.6s ease"
  footerObserver.observe(section)
})

// ===== FOOTER SOCIAL LINKS TRACKING =====
const socialLinks = document.querySelectorAll(".footer__social-link")
socialLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const platform = this.classList.contains("instagram")
      ? "Instagram"
      : this.classList.contains("whatsapp")
        ? "WhatsApp"
        : this.classList.contains("facebook")
          ? "Facebook"
          : "Unknown"

    console.log(`Footer: ${platform} link clicked`)

    // Add click animation
    this.style.transform = "translateX(5px) scale(0.95)"
    setTimeout(() => {
      this.style.transform = ""
    }, 200)
  })
})

// ===== LOADING ANIMATION =====
window.addEventListener("load", () => {
  // Hide loading screen if it exists
  const loader = document.querySelector(".loader")
  if (loader) {
    loader.style.opacity = "0"
    setTimeout(() => {
      loader.style.display = "none"
    }, 500)
  }

  // Animate elements on load
  document.body.style.opacity = "1"
})

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
  // Scroll-dependent animations go here
}, 16) // ~60fps

window.addEventListener("scroll", throttledScroll)

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for service cards
serviceButtons.forEach((button) => {
  button.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      this.click()
    }
  })
})

// Focus management for mobile menu
navToggle.addEventListener("click", () => {
  setTimeout(() => {
    const firstNavLink = navMenu.querySelector(".nav__link")
    if (firstNavLink) firstNavLink.focus()
  }, 300)
})

// ===== EASTER EGG =====
let clickCount = 0
const logo = document.querySelector(".nav__logo")

if (logo) {
  logo.addEventListener("click", () => {
    clickCount++
    if (clickCount === 5) {
      // Add special animation
      logo.style.animation = "bounce 1s ease-in-out"
      setTimeout(() => {
        logo.style.animation = ""
        clickCount = 0
      }, 1000)
    }
  })
}

// ===== CONSOLE MESSAGE =====
console.log(`
🚗 Wrap Company Arg - Website Loaded Successfully!
🎨 Desarrollado por SacksVerse
💙 Transformamos tu auto en una obra de arte
`)
const workCarousel = document.getElementById("work-carousel");
const workSlides = document.querySelectorAll(".work-slide");
const workPrev = document.getElementById("work-prev");
const workNext = document.getElementById("work-next");
const workIndicatorsContainer = document.getElementById("work-indicators");

let workIndex = 0;

// Crear indicadores dinámicamente
workSlides.forEach((_, i) => {
  const indicator = document.createElement("button");
  if (i === 0) indicator.classList.add("active");
  indicator.dataset.index = i;
  workIndicatorsContainer.appendChild(indicator);
});

const workIndicators = document.querySelectorAll("#work-indicators button");

function updateWorkCarousel() {
  workCarousel.style.transform = `translateX(-${workIndex * 100}%)`;
  workIndicators.forEach((ind, i) => {
    ind.classList.toggle("active", i === workIndex);
  });
}

workNext.addEventListener("click", () => {
  workIndex = (workIndex + 1) % workSlides.length;
  updateWorkCarousel();
});

workPrev.addEventListener("click", () => {
  workIndex = (workIndex - 1 + workSlides.length) % workSlides.length;
  updateWorkCarousel();
});

workIndicators.forEach((ind) => {
  ind.addEventListener("click", () => {
    workIndex = parseInt(ind.dataset.index);
    updateWorkCarousel();
  });
});

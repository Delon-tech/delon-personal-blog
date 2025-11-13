// js/animation.js - Semua animasi dan efek visual

// Intersection Observer untuk animasi scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("muncul");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Initialize scroll animations
function initScrollAnimations() {
  // Pilih elemen yang akan dianimasikan
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Animasi scroll untuk section yang lebih halus
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
      element.classList.add("muncul");
    }
  });
}

// Animasi scroll yang lebih halus
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
      element.classList.add("muncul");
    }
  });
}

// Animasi typing effect untuk hero section
function initTypingEffect() {
  const text = "Web Developer | AI Enthusiast | Tech Blogger";
  let index = 0;
  const speed = 100;

  function typeWriter() {
    const heroText = document.querySelector("#hero p");
    if (heroText) {
      if (index < text.length) {
        heroText.innerHTML = text.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, speed);
      }
    }
  }

  // Mulai animasi typing setelah halaman dimuat
  document.addEventListener("DOMContentLoaded", typeWriter);
}

// Parallax effect pada hero section
function initParallaxEffect() {
  window.addEventListener("scroll", () => {
    const hero = document.getElementById("hero");
    if (hero) {
      const scroll = window.pageYOffset;
      hero.style.backgroundPositionY = scroll * 0.5 + "px";
    }
  });
}

// Counter animation untuk statistik
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCount() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = target;
    }
  }

  updateCount();
}

// Hover effects untuk cards
function initCardHoverEffects() {
  // Hover effect pada kartu keahlian
  document.querySelectorAll("#keahlian .grid > div").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.03)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Hover effect untuk semua cards
  document.querySelectorAll(".group").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });
  });

  // Enhanced card hover effects
  const cards = document.querySelectorAll(".group");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });
}

// Progress bar saat scroll
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className =
    "fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-300";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

// Carousel functionality untuk hero
function initHeroCarousel() {
  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".hero-slide");
  const dots = slider.querySelectorAll(".dot");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");

  if (!slides.length || !dots.length || !prevBtn || !nextBtn) {
    return;
  }

  let currentSlide = 0;
  const slideCount = slides.length;

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
      slide.style.zIndex = "0";
    });
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    slides[index].style.zIndex = "1";
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
  }

  // Event Listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto advance slides
  let autoAdvance = setInterval(nextSlide, 5000);

  slider.addEventListener("mouseenter", () => {
    clearInterval(autoAdvance);
  });

  slider.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(nextSlide, 5000);
  });

  // Initialize
  slides[0].classList.add("active");
  slides[0].style.zIndex = "1";
  dots[0].classList.add("active");

  for (let i = 1; i < slides.length; i++) {
    slides[i].style.opacity = "0";
    slides[i].style.zIndex = "0";
  }
}

// Experience carousel
function initExperienceCarousel() {
  const carousel = document.querySelector(".experience-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".slides-track");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const dots = carousel.querySelectorAll(".dot");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  let currentSlide = 0;
  const slideCount = slides.length;

  function initCarousel() {
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
    updateSlidePosition();
  }

  function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  function updateActiveStates() {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlidePosition();
    updateActiveStates();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlidePosition();
    updateActiveStates();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlidePosition();
      updateActiveStates();
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
    }
  });

  // Auto advance
  let autoAdvance = setInterval(nextSlide, 5000);

  carousel.addEventListener("mouseenter", () => {
    clearInterval(autoAdvance);
  });

  carousel.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(nextSlide, 5000);
  });

  initCarousel();

  window.addEventListener("resize", updateSlidePosition);
}

// Lazy loading untuk gambar
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("fade-in");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize all animations
function initializeAnimations() {
  initScrollAnimations();
  initTypingEffect();
  initParallaxEffect();
  initCardHoverEffects();
  initScrollProgress();
  initHeroCarousel();
  initExperienceCarousel();
  initLazyLoading();
}

// Event listeners
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Export functions
window.AnimationJS = {
  animateCounter,
  initScrollAnimations,
  animateOnScroll,
};

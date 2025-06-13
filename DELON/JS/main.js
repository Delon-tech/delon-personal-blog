// js/main.js - File JavaScript Utama
// Menangani inisialisasi dan koordinasi semua modul

document.addEventListener("DOMContentLoaded", function () {
  console.log("Main JS loaded");

  // Inisialisasi semua modul
  initializeAnimations();
  initializeFormHandlers();
  initializeUI();

  // Loading animation
  showInitialLoader();

  // Initialize intersection observer untuk animasi scroll
  initScrollAnimations();

  // Initialize navbar behavior
  initNavbarBehavior();

  // Initialize scroll progress
  initScrollProgress();

  // Initialize back to top button
  initBackToTop();
});

// Fungsi untuk menampilkan loader awal
function showInitialLoader() {
  const loader = document.createElement("div");
  loader.className =
    "fixed inset-0 bg-gray-900 flex items-center justify-center z-50";
  loader.innerHTML = `
    <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
  `;
  document.body.appendChild(loader);

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 500);
  }, 1000);
}

// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll to top when clicking logo
const logoLink = document.getElementById("logo-link");
if (logoLink) {
  logoLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Menambahkan active state pada nav links
function updateActiveNavLinks() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    const nextBtn = document.getElementById("nextInspirasi");
    if (nextBtn) nextBtn.click();
  } else if (e.key === "ArrowLeft") {
    const prevBtn = document.getElementById("prevInspirasi");
    if (prevBtn) prevBtn.click();
  } else if (e.key === "Escape") {
    const modals = document.querySelectorAll(".modal, [class*='modal']");
    modals.forEach((modal) => modal.remove());
  }
});

// ARIA labels untuk accessibility
document.querySelectorAll("button").forEach((button) => {
  if (!button.getAttribute("aria-label")) {
    button.setAttribute("aria-label", button.textContent.trim());
  }
});

// Focus styles untuk accessibility
document.querySelectorAll("a, button").forEach((element) => {
  element.addEventListener("focus", function () {
    this.classList.add("ring-2", "ring-blue-500", "ring-offset-2");
  });

  element.addEventListener("blur", function () {
    this.classList.remove("ring-2", "ring-blue-500", "ring-offset-2");
  });
});

// Initialize active nav links
updateActiveNavLinks();

// Export functions untuk digunakan oleh file lain
window.MainJS = {
  showNotification: function (message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `
      fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300
      ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white
      opacity-0 translate-x-full
    `;

    notification.innerHTML = `
      <div class="flex items-center">
        <i class="fas ${
          type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
        } mr-2"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.remove("opacity-0", "translate-x-full");
    }, 100);

    setTimeout(() => {
      notification.classList.add("opacity-0", "translate-x-full");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  },

  showLoadingSpinner: function () {
    const spinner = document.createElement("div");
    spinner.className =
      "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm";
    spinner.innerHTML = `
      <div class="relative">
        <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div class="mt-4 text-white font-medium">Loading...</div>
      </div>
    `;
    document.body.appendChild(spinner);
    return spinner;
  },
};

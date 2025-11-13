// js/main.js - File JavaScript Utama
// Menangani inisialisasi dan koordinasi semua modul

document.addEventListener("DOMContentLoaded", function () {
  console.log("Main JS loaded");

  // Inisialisasi semua modul (Panggil fungsi dari file terpisah)
  // Catatan: Fungsi-fungsi ini harus didefinisikan secara global di file JS mereka masing-masing
  // (misal: initializeUI() harus ada di js/ui.js, seperti yang kita perbaiki)
  initializeAnimations();
  initializeFormHandlers();
  initializeUI();

  // PANGGILAN FUNGSI GLOBAL LAIN
  showInitialLoader();
  initScrollAnimations();
  // initNavbarBehavior(); // Sudah dipanggil di initializeUI()
  initScrollProgress();
  initBackToTop();
  // updateActiveNavLinks(); // Pindahkan ke ui.js atau hapus jika sudah ada di initNavbarBehavior

  // Pastikan fungsi ini didefinisikan di suatu tempat (misal: ui.js atau animation.js)
  if (typeof initBackToTop === "function") {
    initBackToTop();
  }
});

// =================================================================
// FUNGSI STANDALONE (Bisa dipertahankan di sini)
// =================================================================

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

// =================================================================
// KODE YANG DIHAPUS DARI SINI KARENA DUPLIKASI ATAU DIPINDAH
// =================================================================

/* * DIHAPUS: Smooth scroll untuk navigasi (Dipindah ke ui.js)
 * DIHAPUS: Scroll to top when clicking logo (Dipindah ke ui.js)
 * DIHAPUS: updateActiveNavLinks (Pindah ke ui.js atau dihapus)
 * DIHAPUS: Inspirasi Section Functionality (Dipindah ke ui.js)
 * DIHAPUS: Slider Navigation (Dipindah ke ui.js)
 */

// Keyboard navigation (dipertahankan karena menargetkan berbagai modal/slider)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    const nextBtn = document.getElementById("nextInspirasi");
    if (nextBtn) nextBtn.click();
  } else if (e.key === "ArrowLeft") {
    const prevBtn = document.getElementById("prevInspirasi");
    if (prevBtn) prevBtn.click();
  } else if (e.key === "Escape") {
    const modals = document.querySelectorAll(".modal, #contactOptionsModal"); // Tambahkan ID modal
    modals.forEach((modal) => modal.classList.add("hidden")); // Sembunyikan, jangan hapus
  }
});

// =================================================================
// EXPORT DAN FUNGSI UTILITY (Dapat dipertahankan)
// =================================================================

// Export functions untuk digunakan oleh file lain
window.MainJS = {
  // Fungsi notifikasi dan loading spinner
  showNotification: function (message, type = "success") {
    // ... (Kode showNotification Anda)
    const notification = document.createElement("div");
    notification.className = `
            fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300
            ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white
            opacity-0 translate-x-full
        `;

    notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${
                  type === "success"
                    ? "fa-check-circle"
                    : "fa-exclamation-circle"
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
    // ... (Kode showLoadingSpinner Anda)
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

// js/ui.js - Semua interaksi UI, navbar, modal, dan komponen interface

// FUNGSI UTAMA YANG DIEKSPOR KE MAIN.JS
function initializeUI() {
  initNavbarBehavior();
  initContactModal();
  initVideoModalHandlers();
  // Jika ada fungsi UI lain (misal: initMobileMenu), tambahkan di sini.
}

// =================================================================
// 1. Navbar Scroll Behavior dan Navigasi
// =================================================================

let lastScroll = 0;

function initNavbarBehavior() {
  const header = document.querySelector("header");
  if (!header) return;

  const scrollThreshold = 100;

  function handleScroll() {
    const currentScroll = window.pageYOffset;

    // Menentukan arah scroll dan mengatur navbar
    if (currentScroll <= 0) {
      // Di paling atas halaman
      header.classList.remove("nav-hidden");
      header.classList.remove("nav-scrolled");
    } else if (currentScroll < lastScroll) {
      // Scrolling ke atas
      header.classList.remove("nav-hidden");
      header.classList.add("nav-scrolled");
    } else if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      // Scrolling ke bawah dan melewati threshold
      header.classList.add("nav-hidden");
      header.classList.add("nav-scrolled");
    }

    lastScroll = currentScroll;
  }
  // Event listener untuk scroll
  window.addEventListener("scroll", handleScroll);

  // Inisialisasi state awal
  document.addEventListener("DOMContentLoaded", () => {
    if (window.pageYOffset > 0) {
      header.classList.add("nav-scrolled");
    }
  });

  // Smooth scroll untuk navigasi (Hanya dipertahankan di sini, hapus dari main.js)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll to top when clicking logo (Hanya dipertahankan di sini, hapus dari main.js)
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

  // Menambahkan active state pada nav links (Kode Anda sebelumnya)
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Memperbaiki penggunaan pageYOffset
      if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
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

// =================================================================
// 2. Modal Kontak/WhatsApp (Memperbaiki fungsi Hubungi Saya)
// =================================================================

function initContactModal() {
  const contactBtn = document.getElementById("contactOptionsBtn");
  const modal = document.getElementById("contactOptionsModal");
  const closeModal = document.getElementById("closeModal");
  const contactFormBtn = document.getElementById("contactFormBtn");

  if (contactBtn && modal && closeModal) {
    // Tampilkan Modal saat Hubungi Saya diklik
    contactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("hidden");
    });

    // Sembunyikan Modal saat tombol close diklik
    closeModal.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    // Sembunyikan Modal saat tombol Form Kontak diklik
    contactFormBtn.addEventListener("click", () => {
      // Karena ini adalah tautan ke #kontak, ia akan otomatis scroll.
      modal.classList.add("hidden");
    });

    // Menyembunyikan modal jika mengklik area abu-abu (backdrop)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }
}

// =================================================================
// 3. Modal Video Inspirasi (Memperbaiki fungsi Tonton Video)
// =================================================================

function initVideoModalHandlers() {
  const videoLinks = document.querySelectorAll("[data-video-id]");

  videoLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const videoId = this.getAttribute("data-video-id");

      const modal = document.createElement("div");
      modal.className =
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 modal";
      modal.innerHTML = `
                <div class="relative w-full max-w-4xl mx-4">
                    <button class="absolute -top-10 right-0 text-white hover:text-red-500 text-xl close-video-modal">
                        <i class="fas fa-times"></i> Tutup
                    </button>
                    <div class="relative" style="padding-bottom: 56.25%;">
                        <iframe 
                            class="absolute top-0 left-0 w-full h-full rounded-xl"
                            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            `;

      document.body.appendChild(modal);
      document.body.style.overflow = "hidden";

      // Handle tutup modal
      modal
        .querySelector(".close-video-modal")
        .addEventListener("click", () => {
          modal.remove();
          document.body.style.overflow = "auto";
        });

      // Tutup modal saat klik di luar video
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.remove();
          document.body.style.overflow = "auto";
        }
      });

      // Tambahkan event listener untuk tombol ESC (perlu dihapus jika modal ditutup)
      const handleEsc = function (e) {
        if (e.key === "Escape") {
          modal.remove();
          document.body.style.overflow = "auto";
          document.removeEventListener("keydown", handleEsc);
        }
      };
      document.addEventListener("keydown", handleEsc);
    });
  });
}

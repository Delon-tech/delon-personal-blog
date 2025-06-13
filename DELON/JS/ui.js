// js/ui.js - Semua interaksi UI, navbar, modal, dan komponen interface

// Navbar scroll behavior
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

  // Smooth scroll untuk navigasi
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

  // Scroll to top when clicking logo
  document.getElementById("logo-link").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Menambahkan active state pada nav links
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

// js/form-handler.js - Semua fungsi yang berkaitan dengan form dan validasi

// Form submission handler
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  try {
    // Validasi form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.email || !data.message) {
      throw new Error("Mohon isi semua field yang diperlukan");
    }

    // Validasi email
    if (!isValidEmail(data.email)) {
      throw new Error("Format email tidak valid");
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

    // Simulasi pengiriman (ganti dengan API call yang sebenarnya)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success state
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';

    if (window.MainJS) {
      window.MainJS.showNotification(
        "Pesan Anda telah berhasil dikirim!",
        "success"
      );
    }

    form.reset();

    // Reset button after delay
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  } catch (error) {
    if (window.MainJS) {
      window.MainJS.showNotification(error.message, "error");
    } else {
      alert(error.message);
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Contact form validation dan handling
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    // Placeholder submission handler (duplicate untuk fallback)
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name")?.value;
      const email = document.getElementById("email")?.value;
      const message = document.getElementById("message")?.value;

      if (!name || !email || !message) {
        if (window.MainJS) {
          window.MainJS.showNotification(
            "Mohon isi semua field yang diperlukan",
            "error"
          );
        } else {
          alert("Mohon isi semua field yang diperlukan");
        }
        return;
      }

      // Animasi loading saat submit
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
      submitBtn.disabled = true;

      // Simulasi pengiriman
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
        contactForm.reset();

        if (window.MainJS) {
          window.MainJS.showNotification(
            "Pesan Anda telah dikirim!",
            "success"
          );
        } else {
          alert("Pesan Anda telah dikirim!");
        }

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    });

    // Enhanced form handling
    contactForm.addEventListener("submit", handleFormSubmit);

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", clearFieldError);
    });
  }
}

// Real-time field validation
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const fieldName = field.name;

  clearFieldError(e);

  if (!value) {
    showFieldError(field, `${getFieldLabel(fieldName)} wajib diisi`);
    return false;
  }

  if (fieldName === "email" && !isValidEmail(value)) {
    showFieldError(field, "Format email tidak valid");
    return false;
  }

  if (fieldName === "name" && value.length < 2) {
    showFieldError(field, "Nama minimal 2 karakter");
    return false;
  }

  if (fieldName === "message" && value.length < 10) {
    showFieldError(field, "Pesan minimal 10 karakter");
    return false;
  }

  return true;
}

// Clear field error
function clearFieldError(e) {
  const field = e.target;
  const errorElement = field.parentNode.querySelector(".field-error");
  if (errorElement) {
    errorElement.remove();
  }
  field.classList.remove("border-red-500");
}

// Show field error
function showFieldError(field, message) {
  const errorElement = document.createElement("div");
  errorElement.className = "field-error text-red-500 text-sm mt-1";
  errorElement.textContent = message;

  field.classList.add("border-red-500");
  field.parentNode.appendChild(errorElement);
}

// Get readable field label
function getFieldLabel(fieldName) {
  const labels = {
    name: "Nama",
    email: "Email",
    message: "Pesan",
  };
  return labels[fieldName] || fieldName;
}

// Contact options modal handlers
function initContactModal() {
  const contactOptionsBtn = document.getElementById("contactOptionsBtn");
  const contactOptionsModal = document.getElementById("contactOptionsModal");
  const closeModal = document.getElementById("closeModal");
  const contactFormBtn = document.getElementById("contactFormBtn");

  if (!contactOptionsBtn || !contactOptionsModal) return;

  // Buka modal
  contactOptionsBtn.addEventListener("click", function (e) {
    e.preventDefault();
    contactOptionsModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  // Tutup modal
  function closeContactModal() {
    contactOptionsModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeContactModal);
  }

  // Tutup modal ketika mengklik di luar modal
  contactOptionsModal.addEventListener("click", function (e) {
    if (e.target === contactOptionsModal) {
      closeContactModal();
    }
  });

  // Scroll ke form kontak dan tutup modal
  if (contactFormBtn) {
    contactFormBtn.addEventListener("click", function (e) {
      e.preventDefault();
      closeContactModal();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }

  // ESC key to close modal
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      !contactOptionsModal.classList.contains("hidden")
    ) {
      closeContactModal();
    }
  });
}

// Newsletter subscription (jika ada)
function initNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const emailInput = this.querySelector("input[type='email']");
      const submitBtn = this.querySelector("button[type='submit']");

      if (!emailInput.value || !isValidEmail(emailInput.value)) {
        if (window.MainJS) {
          window.MainJS.showNotification("Masukkan email yang valid", "error");
        }
        return;
      }

      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      try {
        // Simulasi API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (window.MainJS) {
          window.MainJS.showNotification(
            "Berhasil berlangganan newsletter!",
            "success"
          );
        }

        emailInput.value = "";
      } catch (error) {
        if (window.MainJS) {
          window.MainJS.showNotification(
            "Gagal berlangganan. Coba lagi.",
            "error"
          );
        }
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

// Initialize all form handlers
function initializeFormHandlers() {
  initContactForm();
  initContactModal();
  initNewsletterForm();
}

// Auto-save form data to prevent data loss
function initAutoSave() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      const storageKey = `form_${form.id || "default"}_${input.name}`;

      // Load saved data
      const savedValue = sessionStorage.getItem(storageKey);
      if (savedValue) {
        input.value = savedValue;
      }

      // Save on input
      input.addEventListener("input", () => {
        sessionStorage.setItem(storageKey, input.value);
      });

      // Clear on successful submit
      form.addEventListener("submit", () => {
        setTimeout(() => {
          sessionStorage.removeItem(storageKey);
        }, 2000);
      });
    });
  });
}

// Character counter for textarea
function initCharacterCounters() {
  const textareas = document.querySelectorAll("textarea[maxlength]");

  textareas.forEach((textarea) => {
    const maxLength = textarea.getAttribute("maxlength");
    const counter = document.createElement("div");
    counter.className = "text-sm text-gray-500 mt-1 text-right";
    counter.textContent = `0/${maxLength}`;

    textarea.parentNode.appendChild(counter);

    textarea.addEventListener("input", () => {
      const currentLength = textarea.value.length;
      counter.textContent = `${currentLength}/${maxLength}`;

      if (currentLength > maxLength * 0.9) {
        counter.className = "text-sm text-orange-500 mt-1 text-right";
      } else if (currentLength === maxLength) {
        counter.className = "text-sm text-red-500 mt-1 text-right";
      } else {
        counter.className = "text-sm text-gray-500 mt-1 text-right";
      }
    });
  });
}

// Initialize enhanced form features
document.addEventListener("DOMContentLoaded", () => {
  initAutoSave();
  initCharacterCounters();
});

// Export functions
window.FormHandlerJS = {
  handleFormSubmit,
  isValidEmail,
  validateField,
  showFieldError,
  clearFieldError,
};

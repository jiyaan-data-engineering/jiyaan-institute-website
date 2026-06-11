// ================= INIT =================
const navbar = document.getElementById("navbar");
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

// ================= NAVBAR SCROLL =================
window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// ================= MOBILE MENU =================
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

// ================= SAFE SLIDER =================
let index = 0;
const slides = document.querySelectorAll(".slide");

if (slides.length > 1) {
  setInterval(() => {
    slides.forEach(s => s.classList.remove("active"));
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000);
}

// ================= CUSTOM CURSOR =================
const cursor = document.querySelector(".cursor");
const glow = document.querySelector(".cursor-glow");

if (cursor && glow) {
  window.addEventListener("mousemove", (e) => {
    requestAnimationFrame(() => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  });
}

// ================= MAGNETIC BUTTON =================
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      nav?.classList.remove("show");
    }
  });
});



// ================= SECURE DATA & INIT =================
document.addEventListener('DOMContentLoaded', () => {
  // Advanced Anti-Scraping (Base64 + String Reversal)
  const waBtn = document.getElementById('secure-wa');
  if (waBtn) {
    // 'MDEyMzQ1Njc4OTE5L2VtLmF3Ly86c3B0dGg=' decodes to '012345678919/em.aw//:sptth'
    // Reversed: 'https://wa.me/919876543210'
    const payload = atob('MDEyMzQ1Njc4OTE5L2VtLmF3Ly86c3B0dGg=');
    waBtn.href = payload.split('').reverse().join('');
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 50
    });
  }
});

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 20;
    const rotateY = ((x / rect.width) - 0.5) * 20;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});
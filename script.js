// ==========================
// HERO LOAD (fade inicial)
// ==========================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ==========================
// SCROLL REVEAL PRO
// ==========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// ==========================
// NAV ACTIVE LINK
// ==========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 120) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ==========================
// SHAPES PARALLAX (SUAVE)
// ==========================
const shapes = document.querySelectorAll(".shape");

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  shapes.forEach((shape, i) => {
    shape.style.transform = `translateY(${scroll * (0.08 + i * 0.03)}px)`;
  });
});

// ==========================
// CARRUSEL EXPERIENCIA PRO
// ==========================
const track = document.querySelector('.exp-track');
const items = document.querySelectorAll('.exp-item');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const viewport = document.querySelector('.exp-viewport');

let index = 0;
let itemWidth = 0;
let maxIndex = 0;
const gap = 20;

function setupCarousel() {
  if (!items.length) return;

  itemWidth = items[0].getBoundingClientRect().width + gap;

  const visibleWidth = viewport.offsetWidth;
  const visibleItems = Math.floor(visibleWidth / itemWidth);

  maxIndex = items.length - visibleItems;
  if (maxIndex < 0) maxIndex = 0;

  updateCarousel();
}

function updateCarousel() {
  const move = index * itemWidth;
  track.style.transform = `translateX(-${move}px)`;

  // botones
  prev.style.opacity = index === 0 ? "0" : "1";
  next.style.opacity = index >= maxIndex ? "0" : "1";

  prev.style.pointerEvents = index === 0 ? "none" : "auto";
  next.style.pointerEvents = index >= maxIndex ? "none" : "auto";
}

// BOTONES
next.addEventListener('click', () => {
  if (index < maxIndex) {
    index++;
    updateCarousel();
  }
});

prev.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

// ==========================
// AUTOPLAY + PAUSA
// ==========================
let autoPlay;

function startAutoPlay() {
  autoPlay = setInterval(() => {
    if (index < maxIndex) {
      index++;
    } else {
      index = 0;
    }
    updateCarousel();
  }, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlay);
}

viewport.addEventListener('mouseenter', stopAutoPlay);
viewport.addEventListener('mouseleave', startAutoPlay);

// ==========================
// SWIPE MÓVIL
// ==========================
let startX = 0;

viewport.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

viewport.addEventListener('touchend', (e) => {
  let diff = e.changedTouches[0].clientX - startX;

  if (diff > 50 && index > 0) {
    index--;
  } else if (diff < -50 && index < maxIndex) {
    index++;
  }

  updateCarousel();
});

// ==========================
// RESIZE
// ==========================
window.addEventListener('resize', setupCarousel);

// INIT
setupCarousel();
startAutoPlay();
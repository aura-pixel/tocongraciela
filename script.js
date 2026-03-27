window.addEventListener("load", () => {
  const heroText = document.querySelector(".hero-text");
  const heroImg = document.querySelector(".hero-img");

  heroText.classList.add("show");
  heroImg.classList.add("show");
});

const elements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < triggerBottom) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const hero = document.querySelector(".hero");

  hero.style.backgroundPositionY = `${scroll * 0.3}px`;
});

const floatItems = document.querySelectorAll(".float");

floatItems.forEach((item, index) => {
  let direction = 1;

  setInterval(() => {
    item.style.transform = `translateY(${direction * 8}px)`;
    direction *= -1;
  }, 2000 + index * 300);
});

const shapes = document.querySelectorAll(".shape");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  shapes.forEach((shape, i) => {
    shape.style.transform = `translateY(${scroll * (0.1 + i * 0.05)}px)`;
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 100) {
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

const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const viewport = document.querySelector('.carousel-viewport');

let index = 0;
let itemWidth = 0;
let maxIndex = 0;

// 🔧 CONFIG
const gap = 20;

// ========================
// SETUP
// ========================
function setupCarousel() {
  const item = items[0];
  itemWidth = item.getBoundingClientRect().width + gap;

  const visibleWidth = viewport.offsetWidth;
  const visibleItems = Math.floor(visibleWidth / itemWidth);

  maxIndex = items.length - visibleItems;
  if (maxIndex < 0) maxIndex = 0;

  updateCarousel();
}

// ========================
// UPDATE
// ========================
function updateCarousel() {
  const move = index * itemWidth;
  track.style.transform = `translateX(-${move}px)`;

  // flechas
  prev.style.opacity = index === 0 ? "0" : "1";
  prev.style.pointerEvents = index === 0 ? "none" : "auto";

  next.style.opacity = index >= maxIndex ? "0" : "1";
  next.style.pointerEvents = index >= maxIndex ? "none" : "auto";
}

// ========================
// BOTONES
// ========================
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

// ========================
// SWIPE (móvil 🔥)
// ========================
let startX = 0;
let isDragging = false;

viewport.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
});

viewport.addEventListener('mouseup', (e) => {
  if (!isDragging) return;

  let diff = e.pageX - startX;

  if (diff > 50 && index > 0) {
    index--;
  } else if (diff < -50 && index < maxIndex) {
    index++;
  }

  updateCarousel();
  isDragging = false;
});

viewport.addEventListener('mouseleave', () => {
  isDragging = false;
});

// touch (celular)
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

// ========================
// AUTO RESIZE
// ========================
window.addEventListener('resize', setupCarousel);

// iniciar
setupCarousel();
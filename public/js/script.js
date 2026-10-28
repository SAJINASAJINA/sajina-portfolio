const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile navigation
menuToggle?.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after selecting a section
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    sidebar.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Highlight the section currently in view
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
}

// Current year in footer
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (event) => {
  if (
    window.innerWidth <= 760 &&
    sidebar &&
    menuToggle &&
    !sidebar.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    sidebar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const authNavButtons = document.getElementById("authNavButtons");
const loggedInNav = document.getElementById("loggedInNav");
const navLogout = document.getElementById("navLogout");

function updateAuthNavigation() {
  const token = sessionStorage.getItem("portfolioToken");

  if (authNavButtons) authNavButtons.hidden = Boolean(token);
  if (loggedInNav) loggedInNav.hidden = !token;
}

updateAuthNavigation();

navLogout?.addEventListener("click", () => {
  sessionStorage.removeItem("portfolioToken");
  window.location.href = "/login.html";
});

function updateAuthNavigation() {
  const token = sessionStorage.getItem("portfolioToken");
  const authButtons = document.getElementById("authNavButtons");
  const loggedInNav = document.getElementById("loggedInNav");

  if (authButtons) {
    authButtons.hidden = Boolean(token);
  }

  if (loggedInNav) {
    loggedInNav.hidden = !token;
  }
}

updateAuthNavigation();

window.addEventListener("pageshow", updateAuthNavigation);

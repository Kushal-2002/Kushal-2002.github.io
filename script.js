// ===== Live Clock Functionality =====
function updateClock() {
  const now = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const timeString = now.toLocaleString("en-US", options);
  const clockElement = document.getElementById("txt");

  if (clockElement) {
    clockElement.textContent = timeString;
  }
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

// ===== Last Updated Date =====
function setLastUpdated() {
  const lastUpdatedElements = document.querySelectorAll("#lastUpdatedVal");
  const updateDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  lastUpdatedElements.forEach((element) => {
    element.textContent = updateDate;
  });
}

setLastUpdated();

// ===== Mobile Navigation Toggle =====
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      navList.classList.toggle("active");
      const isExpanded = navList.classList.contains("active");
      navToggle.setAttribute("aria-expanded", isExpanded);

      // Animate button
      navToggle.style.transform = isExpanded ? "rotate(90deg)" : "rotate(0deg)";
    });

    // Close menu when clicking a link
    const navLinks = navList.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          navList.classList.remove("active");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.style.transform = "rotate(0deg)";
        }
      });
    });
  }
});

// ===== Smooth Scroll with Offset for Fixed Header =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    if (targetId === "#" || targetId === "#home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  });
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "0";
      entry.target.style.transform = "translateY(20px)";

      setTimeout(() => {
        entry.target.style.transition =
          "opacity 0.6s ease, transform 0.6s ease";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, 100);

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all tables for animation
document.addEventListener("DOMContentLoaded", function () {
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    observer.observe(table);
  });
});

// ===== Highlight Current Section in Navigation =====
function highlightCurrentSection() {
  const sections = document.querySelectorAll("[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 150) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.background = "";
    const href = link.getAttribute("href");

    if (href === `#${currentSection}`) {
      link.style.background = "rgba(255, 255, 255, 0.25)";
    }
  });
}

window.addEventListener("scroll", highlightCurrentSection);

// ===== Table Row Hover Effects Enhancement =====
document.addEventListener("DOMContentLoaded", function () {
  const tableRows = document.querySelectorAll("table tr");

  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.01)";
      this.style.transition = "transform 0.2s ease";
    });

    row.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
});

// ===== Badge Link Ripple Effect =====
document.addEventListener("DOMContentLoaded", function () {
  const badges = document.querySelectorAll(".badge-link, a[href]");

  badges.forEach((badge) => {
    badge.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.6)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s ease-out";
      ripple.style.pointerEvents = "none";

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation to CSS dynamically
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

// ===== Back to Top Button =====
document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.createElement("button");
  backToTop.innerHTML = "↑";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  `;

  document.body.appendChild(backToTop);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  backToTop.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1) translateY(-3px)";
    this.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
  });

  backToTop.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) translateY(0)";
    this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
  });
});

// ===== Progress Bar for Page Scroll =====
document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #ec4899);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
  `;

  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + "%";
  });
});

// ===== Keyboard Navigation Enhancement =====
document.addEventListener("keydown", function (e) {
  // Press 'T' to scroll to top
  if (e.key === "t" || e.key === "T") {
    if (!e.target.matches("input, textarea")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
});

// ===== Console Welcome Message =====
console.log(
  "%c🎓 Welcome to CS6.302 - Software System Development! ",
  "background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px 20px; border-radius: 8px;"
);
console.log(
  "%cIIIT Hyderabad | Monsoon 2025",
  "color: #6366f1; font-size: 14px; font-weight: bold;"
);

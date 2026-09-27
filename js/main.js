
/**
 * Ο Κουκλόκοσμος
 * Main JavaScript
 *
 * No dependencies.
 */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // Mobile Navigation
  // ==========================================

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  function closeMenu() {
    if (!menuToggle || !navLinks) {
      return;
    }

    menuToggle.classList.remove("is-open");
    navLinks.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Άνοιγμα μενού");
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.classList.toggle("is-open", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"
      );

    });

    // Close menu when selecting a link.

    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", closeMenu);

    });

    // Close menu with Escape.

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

    // Close menu when switching to desktop.

    const desktopMediaQuery = window.matchMedia(
      "(min-width: 769px)"
    );

    desktopMediaQuery.addEventListener("change", (event) => {

      if (event.matches) {
        closeMenu();
      }

    });

  }


  // ==========================================
  // Active Navigation Section
  // ==========================================

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      (entries) => {

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length === 0) {
          return;
        }

        const activeSectionId =
          visibleSections[0].target.id;

        navigationLinks.forEach((link) => {

          const isActive =
            link.getAttribute("href") ===
            `#${activeSectionId}`;

          link.classList.toggle("active", isActive);

          if (isActive) {

            link.setAttribute("aria-current", "location");

          } else {

            link.removeAttribute("aria-current");

          }

        });

      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  // ==========================================
  // Copyright Year
  // ==========================================

  const yearElement = document.getElementById(
    "current-year"
  );

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }

});

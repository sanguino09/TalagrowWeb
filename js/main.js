(function () {
  "use strict";

  /* Sticky nav shadow on scroll ------------------------------------ */
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (window.scrollY > 12) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu toggle ----------------------------------------------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  var scrim = document.querySelector(".nav__scrim");
  var closeMenu = function () {
    toggle.classList.remove("is-active");
    links.classList.remove("is-open");
    if (scrim) scrim.classList.remove("is-open");
  };
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.classList.toggle("is-active");
      links.classList.toggle("is-open", isOpen);
      if (scrim) scrim.classList.toggle("is-open", isOpen);
    });
    if (scrim) {
      scrim.addEventListener("click", closeMenu);
    }
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        closeMenu();
      });
    });
  }

  /* Scrollspy: highlight current section in nav ----------------------- */
  var navLinks = document.querySelectorAll(".nav__links a[href^='#']");
  var sections = Array.prototype.map
    .call(navLinks, function (a) {
      return document.querySelector(a.getAttribute("href"));
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          var link = document.querySelector(".nav__links a[href='#" + id + "']");
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.classList.remove("is-active");
            });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* Scroll reveal ------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Hero rotating tagline ------------------------------------------------ */
  var rotatorItems = document.querySelectorAll(".hero__rotator span");
  if (rotatorItems.length > 1) {
    var current = 0;
    rotatorItems[0].classList.add("is-active");
    setInterval(function () {
      rotatorItems[current].classList.remove("is-active");
      current = (current + 1) % rotatorItems.length;
      rotatorItems[current].classList.add("is-active");
    }, 3600);
  }

  /* Footer year ------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

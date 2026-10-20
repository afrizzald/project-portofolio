document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement,
    page = document.querySelector(".page-shell"),
    navbar = document.querySelector("[data-navbar]"),
    menuButton = document.querySelector("[data-menu-button]"),
    mobileMenu = document.querySelector("[data-mobile-menu]");
  requestAnimationFrame(() => page?.classList.add("page-ready"));
  const current = (
    location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = (link.getAttribute("href") || "")
      .split("/")
      .pop()
      .toLowerCase();
    if (target === current || (current === "" && target === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
  const closeMenu = () => {
    mobileMenu?.classList.add("hidden");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  };
  menuButton?.addEventListener("click", () => {
    const hidden = mobileMenu.classList.toggle("hidden");
    menuButton.setAttribute("aria-expanded", String(!hidden));
    menuButton.innerHTML = hidden
      ? '<i class="fa-solid fa-bars"></i>'
      : '<i class="fa-solid fa-xmark"></i>';
  });
  mobileMenu
    ?.querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  const handleNav = () =>
    navbar?.classList.toggle("nav-scrolled", window.scrollY > 18);
  window.addEventListener("scroll", handleNav, { passive: true });
  handleNav();
  const buttons = document.querySelectorAll("[data-theme-toggle]");
  if (localStorage.getItem("portfolio-theme") === "light")
    html.classList.add("light");
  const updateTheme = () => {
    const light = html.classList.contains("light");
    buttons.forEach((b) => {
      b.innerHTML = light
        ? '<i class="fa-solid fa-moon"></i>'
        : '<i class="fa-solid fa-sun"></i>';
      b.setAttribute(
        "aria-label",
        light ? "Use dark theme" : "Use light theme",
      );
      b.title = light ? "Use dark theme" : "Use light theme";
    });
  };
  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      html.classList.toggle("light");
      localStorage.setItem(
        "portfolio-theme",
        html.classList.contains("light") ? "light" : "dark",
      );
      updateTheme();
    }),
  );
  updateTheme();
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("http")
    )
      return;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      page?.classList.add("page-leaving");
      setTimeout(() => (location.href = href), 260);
    });
  });
  const top = document.querySelector("[data-scroll-top]");
  const scrollHandler = () =>
    top?.classList.toggle("show", window.scrollY > 420);
  window.addEventListener("scroll", scrollHandler, { passive: true });
  scrollHandler();
  top?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
  document
    .querySelectorAll("[data-year]")
    .forEach((e) => (e.textContent = new Date().getFullYear()));
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px" },
    );
    items.forEach((i) => io.observe(i));
  } else items.forEach((i) => i.classList.add("show"));
});

document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll("[data-gallery-filter]"),
    items = document.querySelectorAll("[data-gallery-category]"),
    modal = document.querySelector("[data-gallery-modal]"),
    image = document.querySelector("[data-gallery-modal-image]"),
    title = document.querySelector("[data-gallery-modal-title]"),
    desc = document.querySelector("[data-gallery-modal-description]"),
    category = document.querySelector("[data-gallery-modal-category]");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((x) => x.classList.toggle("active", x === btn));
      const f = btn.dataset.galleryFilter;
      items.forEach((item) => {
        const hide = f !== "all" && item.dataset.galleryCategory !== f;
        item.classList.toggle("is-hidden", hide);
      });
    }),
  );
  const close = () => {
    modal?.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  };
  items.forEach((item) =>
    item.addEventListener("click", () => {
      image.src = item.dataset.image;
      image.alt = item.dataset.title || "Gallery item";
      title.textContent = item.dataset.title;
      desc.textContent = item.dataset.description;
      category.textContent = item.dataset.galleryCategory;
      modal.classList.add("active");
      document.body.classList.add("overflow-hidden");
    }),
  );
  document
    .querySelector("[data-gallery-close]")
    ?.addEventListener("click", close);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});

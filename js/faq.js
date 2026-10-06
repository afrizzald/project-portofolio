document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-faq-button]").forEach((button) =>
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item"),
        open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((x) => {
        x.classList.remove("open");
        x.querySelector("[data-faq-button]")?.setAttribute(
          "aria-expanded",
          "false",
        );
      });
      if (!open) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    }),
  );
});

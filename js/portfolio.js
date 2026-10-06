document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("[data-project-modal]"),
    close = () => {
      modal?.classList.remove("active");
      document.body.classList.remove("overflow-hidden");
    };
  const map = {
    title: "project-title",
    category: "project-category",
    year: "project-year",
    duration: "project-duration",
    description: "project-description",
    role: "project-role",
    tools: "project-tools",
    problem: "project-problem",
    process: "project-process",
    solution: "project-solution",
    result: "project-result",
    lessons: "project-lessons",
  };
  document.querySelectorAll("[data-project]").forEach((btn) =>
    btn.addEventListener("click", () => {
      Object.entries(map).forEach(([key, selector]) => {
        const el = document.querySelector(`[data-${selector}]`);
        if (el) el.textContent = btn.dataset[key] || "—";
      });
      modal?.classList.add("active");
      document.body.classList.add("overflow-hidden");
    }),
  );
  document
    .querySelector("[data-project-close]")
    ?.addEventListener("click", close);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});

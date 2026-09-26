// Bouton "retour en haut".
(function () {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  window.addEventListener(
    "scroll",
    () => button.classList.toggle("visible", window.scrollY > 600),
    { passive: true }
  );

  button.addEventListener("click", () => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
})();

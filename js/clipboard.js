// Copier l'adresse email en un clic.
(function () {
  const button = document.getElementById("copy-email");
  const link = document.getElementById("email-link");
  if (!button || !link) return;

  button.addEventListener("click", async () => {
    const email = link.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
    } catch (error) {
      return;
    }
    button.textContent = "copié !";
    button.dataset.copied = "true";
    setTimeout(() => {
      button.textContent = "copier";
      button.dataset.copied = "false";
    }, 1800);
  });
})();

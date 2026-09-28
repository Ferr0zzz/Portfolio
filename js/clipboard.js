// Copier l'adresse email en un clic.
(function () {
  const revealButton = document.getElementById("reveal-email");
  const copyButton = document.getElementById("copy-email");
  const emailValue = document.querySelector(".contact-email-value");

  if (!revealButton || !copyButton || !emailValue) return;

  const fullEmail = emailValue.dataset.email || "";
  const maskedEmail = emailValue.dataset.masked || fullEmail;

  revealButton.addEventListener("click", () => {
    const isRevealed = revealButton.dataset.state === "revealed";
    revealButton.dataset.state = isRevealed ? "hidden" : "revealed";
    revealButton.textContent = isRevealed ? "révéler" : "cacher";
    emailValue.textContent = isRevealed ? maskedEmail : fullEmail;
  });

  copyButton.addEventListener("click", async () => {
    const email = fullEmail;
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
    } catch (error) {
      return;
    }

    copyButton.textContent = "copié !";
    setTimeout(() => {
      copyButton.textContent = "copier";
    }, 1800);
  });
})();

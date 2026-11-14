(function () {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  const status = document.getElementById("contact-status");
  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (!status || !submitButton) return;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(contactForm).entries());
    submitButton.disabled = true;
    status.textContent = "Envoi en cours…";
    status.dataset.state = "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "L’envoi a échoué. Réessaie dans quelques instants.");
      }

      contactForm.reset();
      status.textContent = "Message envoyé. Merci, je te répondrai dès que possible.";
      status.dataset.state = "success";
    } catch (error) {
      console.error("Contact message could not be sent.", error);
      status.textContent = error instanceof Error
        ? error.message
        : "L’envoi a échoué. Vérifie ta connexion et réessaie.";
      status.dataset.state = "error";
    } finally {
      submitButton.disabled = false;
    }
  });
})();

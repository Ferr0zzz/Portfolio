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
      let response;
      try {
        response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch {
        throw new Error("Impossible de joindre le formulaire. Vérifie ta connexion et réessaie.");
      }

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("Le service a renvoyé une réponse inattendue. Réessaie plus tard.");
      }

      if (!response.ok || !result || result.ok !== true) {
        const message = result && typeof result.error === "string"
          ? result.error
          : "L’envoi a échoué. Réessaie dans quelques instants.";
        throw new Error(message);
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

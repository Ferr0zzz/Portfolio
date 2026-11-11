(function () {
  const sendEmailButton = document.getElementById("send-email");
  if (!sendEmailButton) return;

  // Obfuscation légère contre les collecteurs automatiques, pas un mécanisme de sécurité.
  const address = [78, 76, 73, 73, 92, 68, 75, 11, 86, 76, 70, 101, 66, 72, 68, 76, 73, 11, 70, 74, 72]
    .map((code) => String.fromCharCode(code ^ 37))
    .join("");

  sendEmailButton.addEventListener("click", () => {
    window.location.href = "mailto:" + address;
  });
})();

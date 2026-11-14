"use strict";

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/";

function respond(response, status, payload) {
  return response.status(status).json(payload);
}

function isSameOrigin(request) {
  const origin = request.headers.origin;
  const host = request.headers.host;
  const forwardedProtocol = request.headers["x-forwarded-proto"];
  const protocol = typeof forwardedProtocol === "string"
    ? forwardedProtocol.split(",")[0].trim()
    : request.socket && request.socket.encrypted
      ? "https"
      : "http";

  if (!origin || !host || !["http", "https"].includes(protocol)) return false;

  try {
    return new URL(origin).origin === `${protocol}://${host}`;
  } catch {
    return false;
  }
}

function isText(value, maxLength) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return respond(response, 405, { error: "Cette adresse accepte uniquement l’envoi de messages." });
  }

  if ((request.headers["content-type"] || "").split(";")[0].trim() !== "application/json") {
    return respond(response, 415, { error: "Le format de la requête n’est pas pris en charge." });
  }

  if (!isSameOrigin(request)) {
    return respond(response, 403, { error: "La requête n’a pas pu être vérifiée. Recharge la page et réessaie." });
  }

  const body = request.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return respond(response, 400, { error: "Les informations du formulaire sont invalides." });
  }

  if (typeof body.company === "string" && body.company.trim()) {
    return respond(response, 400, { error: "Le formulaire n’a pas pu être envoyé." });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim().replace(/[\r\n]+/g, " ") : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !isText(name, 100) ||
    !isText(email, 254) ||
    !/^[^\s@<>]+@[^\s@<>]+(?:\.[^\s@<>]+)+$/.test(email) ||
    !isText(subject, 120) ||
    !isText(message, 5000)
  ) {
    return respond(response, 400, { error: "Vérifie les champs et réessaie." });
  }

  const recipient = process.env.CONTACT_TO;

  if (!isText(recipient, 254) || !/^[^\s@<>]+@[^\s@<>]+(?:\.[^\s@<>]+)+$/.test(recipient)) {
    console.error("Contact email is not configured. Set CONTACT_TO to a valid email address.");
    return respond(response, 503, { error: "Le formulaire n’est pas encore configuré. Tu peux me contacter via GitHub ou LinkedIn." });
  }

  let providerResponse;
  try {
    providerResponse = await fetch(`${FORMSUBMIT_ENDPOINT}${encodeURIComponent(recipient)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        _replyto: email,
        _subject: `Portfolio — ${subject}`,
        message,
        _honey: "",
      }),
    });
  } catch (error) {
    console.error("Contact email provider request failed.", error);
    return respond(response, 502, { error: "Le service d’envoi est momentanément indisponible. Réessaie plus tard." });
  }

  let providerResult;
  try {
    providerResult = await providerResponse.json();
  } catch (error) {
    console.error("Contact email provider returned an invalid response.", error);
    return respond(response, 502, { error: "Le service d’envoi a renvoyé une réponse invalide. Réessaie plus tard." });
  }

  const providerAccepted = providerResult &&
    typeof providerResult === "object" &&
    [true, "true"].includes(providerResult.success);

  if (!providerResponse.ok || !providerAccepted) {
    console.error(`Contact email provider rejected the request (status ${providerResponse.status}).`);
    return respond(response, 502, { error: "Le message n’a pas pu être envoyé. Réessaie plus tard." });
  }

  return respond(response, 200, { ok: true });
};

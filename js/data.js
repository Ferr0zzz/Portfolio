// Contenu affiché par le terminal interactif (section #playground).
// Séparé de terminal.js pour rester facile à modifier sans toucher à la logique.
//
// ⚠️ Les infos "projects" et "log" ci-dessous dupliquent celles des cartes
// projet dans index.html. Si tu mets à jour un projet, pense à modifier
// les deux endroits pour éviter les incohérences.

const TERMINAL_DATA = {
  help: [
    "Commandes disponibles :",
    "  whoami       — profil en bref",
    "  about        — approche et objectifs",
    "  stack        — technologies utilisées",
    "  projects     — aperçu des projets",
    "  whisprr      — détails sur le projet déployé",
    "  aegis        — état du projet en cours",
    "  log          — dernières étapes",
    "  availability — recherche actuelle",
    "  contact      — moyens de contact",
    "  sudo hire-me — mode recrutement",
    "  clear        — vider l'écran",
    "Astuce : ↑ / ↓ rappelle les commandes précédentes.",
  ],
  whoami: [
    "Feroz — développeur full-stack orienté sécurité, diplômé d'un BTS CIEL.",
    "Je construis des applications pour comprendre leurs mécanismes, pas seulement les utiliser.",
    "Centres d'intérêt : chiffrement, sécurité applicative et expériences web soignées.",
  ],
  about: [
    "Mon approche : partir d'un besoin, comprendre les mécanismes, puis construire une solution testable.",
    "Je préfère expliquer les choix et les limites d'un système plutôt que de présenter la sécurité comme magique.",
    "Objectif : rejoindre une équipe où contribuer en développement ou en cybersécurité.",
  ],
  stack: [
    "Frontend : Next.js (App Router), React, TypeScript.",
    "Crypto : Web Crypto API (AES-GCM), ECDH.",
    "Backend : Supabase (Auth, Postgres, Realtime), Upstash Redis.",
    "Déploiement : Vercel.",
  ],
  projects: [
    "Whisprr — partage de secrets chiffrés côté navigateur, déployé et testé de bout en bout.",
    "Aegis — messagerie E2E en développement ; les messages privés 1-à-1 chiffrés fonctionnent déjà.",
    "Utilise `whisprr` ou `aegis` pour les détails, ou ouvre la section projets.",
  ],
  whisprr: [
    "Whisprr — partage de secrets à usage temporaire.",
    "Le navigateur chiffre le secret avec AES-GCM avant l'envoi ; le serveur ne reçoit que le texte chiffré.",
    "La clé reste dans le fragment de l'URL, qui n'est pas envoyé dans la requête HTTP.",
    "Le lien complet donne accès au secret : partage-le uniquement avec le destinataire prévu.",
    "Projet déployé sur Vercel. Code : github.com/Ferr0zzz/Whisprr",
  ],
  aegis: [
    "Aegis — projet en cours de messagerie chiffrée de bout en bout.",
    "Déjà opérationnel : messages privés 1-à-1 avec échange de clés ECDH et temps réel via Supabase.",
    "À venir : vérification d'identité, salons multi-utilisateurs et support multi-appareils.",
    "Limite actuelle : sans vérification des clés, ECDH seul ne protège pas contre une substitution de clé.",
  ],
  log: [
    "2026  en cours   Aegis : messagerie privée chiffrée ECDH et temps réel.",
    "2026  livraison  Whisprr : v1 déployée et testée de bout en bout.",
    "       formation BTS CIEL : cybersécurité, informatique et réseaux.",
  ],
  contact: [
    "Pour une opportunité, une collaboration ou parler sécurité applicative :",
    "ouvre la section contact pour accéder à l'e-mail et aux profils publics.",
    "L'adresse e-mail reste masquée tant que tu ne choisis pas de l'afficher.",
  ],
  availability: [
    "Je recherche actuellement un poste en CDD ou CDI.",
    "Domaines visés : développement ou cybersécurité.",
    "Pour échanger sur une opportunité, passe par la section contact.",
  ],
  "sudo hire-me": [
    "[sudo] vérification des prérequis...",
    "✓ curiosité technique",
    "✓ projets concrets autour du chiffrement",
    "✓ envie d'apprendre et de progresser en équipe",
    "Accès accordé. Pour discuter d'une opportunité : `contact`.",
  ],
};

const TERMINAL_UNKNOWN = (cmd) =>
  `commande inconnue : ${cmd}. Essaie \`help\` pour voir les commandes disponibles.`;
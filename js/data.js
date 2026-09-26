// Contenu affiché par le terminal interactif (section #playground).
// Séparé de terminal.js pour rester facile à modifier sans toucher à la logique.
//
// ⚠️ Les infos "projects" et "log" ci-dessous dupliquent celles des cartes
// projet dans portfolio.html. Si tu mets à jour un projet, pense à modifier
// les deux endroits pour éviter les incohérences.

const TERMINAL_DATA = {
  help: [
    "Commandes disponibles :",
    "  whoami      — qui je suis",
    "  projects    — mes projets",
    "  log         — activité récente",
    "  contact     — comment me joindre",
    "  sudo hire-me — tentative d'embauche",
    "  clear       — vide l'écran",
  ],
  whoami: [
    "feroz — développeur full-stack orienté sécurité, diplômé d'un BTS CIEL.",
    "Fil rouge : sécurité et chiffrement.",
  ],
  projects: [
    "whisprr   [déployé]   partage de secrets zero-knowledge",
    "aegis     [en cours]  messagerie chiffrée E2E façon Discord",
    "→ détails dans la section projets ci-dessus.",
  ],
  log: [
    "sept. 2026  update   aegis: messages privés chiffrés (ECDH) opérationnels",
    "sept. 2026  release  whisprr v1: déployé et testé de bout en bout",
    "avant       init     BTS CIEL — bases réseau/sécurité",
  ],
  contact: [
    "email et LinkedIn dans la section contact, juste au-dessus du footer.",
  ],
  "sudo hire-me": [
    "[sudo] password for recruiter: ****",
    "Accès accordé. Voir la section contact pour la suite. 🔓",
  ],
};

const TERMINAL_UNKNOWN = (cmd) => `commande introuvable : ${cmd} — tape "help" pour la liste.`;
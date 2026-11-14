# Portfolio

Site en HTML, CSS et JavaScript, avec une fonction serverless Vercel et FormSubmit pour envoyer les messages du formulaire de contact. Aucun domaine ni clé d’API n’est nécessaire.

## Développement local

Installe le CLI Vercel, puis ajoute un fichier `.env.local` à la racine :

```env
CONTACT_TO=ton-adresse@exemple.fr
```

Le fichier `.env.local` est ignoré par Git.

```bash
npm install --global vercel
vercel dev
```

Le site sera disponible sur l’adresse locale indiquée par Vercel. Le formulaire envoie une requête à `api/contact.js`, qui valide les champs puis transmet le message à FormSubmit. Lors du premier envoi, FormSubmit envoie un e-mail de confirmation à l’adresse de réception : clique sur son lien pour activer le formulaire. Le service conserve les soumissions pendant 30 jours.

## Déploiement

Déploie le dépôt sur Vercel. Dans les paramètres du projet, configure la variable d’environnement `CONTACT_TO` avec l’adresse qui doit recevoir les messages. Aucun domaine d’envoi ni secret tiers n’est requis. Après le premier envoi, confirme l’adresse avec le lien reçu de FormSubmit.

Le formulaire nécessite Vercel Functions et ne fonctionnera pas sur un hébergement de fichiers statiques seul.

## Structure

- `index.html` : contenu du portfolio
- `css/` : styles, mise en page et adaptations mobiles
- `js/` : navigation, formulaire de contact et interactions
- `api/contact.js` : validation et envoi sécurisé du formulaire
- `images/` : visuels des projets
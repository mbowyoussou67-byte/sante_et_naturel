SANTE & NATUREL - SITE WEB ET APPLICATION INSTALLABLE

METTRE A JOUR LE SITE SUR NETLIFY
1. Extrayez cette archive dans un nouveau dossier.
2. Connectez-vous a Netlify et ouvrez le site deja publie.
3. Ouvrez « Deploys » et utilisez la zone de deploiement manuel pour importer
   le dossier extrait (il doit contenir index.html a sa racine).
4. Attendez la fin du deploiement, puis rechargez votre adresse netlify.app.

MODIFIER LES DISPONIBILITES
1. Ouvrez produits.json dans un editeur de texte.
2. Pour chaque produit, passez "disponible" a true ou false sans modifier son identifiant.
3. Republiez le dossier complet sur Netlify en suivant les etapes ci-dessus.
Les clients voient uniquement le statut et ne peuvent pas modifier les stocks.

VERSION DU SITE
Avant chaque publication, modifiez la constante SITE_VERSION au debut de
site.js. Le panneau Parametres affiche cette version aux visiteurs. Quand une
nouvelle version du service worker est detectee pendant que le site est ouvert,
une notification propose de l'installer et de recharger le site. A chaque
publication, augmentez aussi le numero vNN des fichiers
site-update-notice-vNN.js/.css et du cache dans service-worker.js. Cela permet
aux visiteurs dont l'ancien service worker met les fichiers en cache par nom
de recevoir le nouveau controleur de notification.

CONFIGURER L'ASSISTANT IA
Dans Netlify, ouvrez Site configuration > Environment variables et ajoutez
ANTHROPIC_API_KEY avec la cle fournie par Anthropic. Ne placez jamais cette cle
dans les fichiers du site ni dans un depot public.

Pour tester avant publication, configurez ANTHROPIC_API_KEY dans l'environnement
de votre terminal, puis lancez « netlify dev » a la racine du site. Ouvrez
l'adresse locale indiquee par Netlify et envoyez un message dans l'assistant.
La fonction limite chaque adresse reseau a 20 messages par heure; cette limite
en memoire est indicative et peut etre reinitialisee lors d'un redemarrage.
Pour publier la fonction, utilisez un deploiement Netlify CLI avec la
configuration netlify.toml (et non un simple glisser-deposer de fichiers).
L'assistant peut expliquer les informations generales et bienfaits presentes
dans le catalogue, sans diagnostiquer ni recommander de produit pour traiter
une maladie. Les demandes de prix sont redirigees vers WhatsApp.

INSTALLER L'APPLICATION
Ouvrez l'adresse publique HTTPS, puis choisissez « Installer l'application »
dans le menu lateral du site. Sur iPhone/iPad, utilisez Safari > Partager >
« Sur l'ecran d'accueil ».

HORS LIGNE ET LIMITES
Une fois les pages chargees, les pages et images essentielles sont disponibles
hors ligne. Certains styles et polices sont charges depuis Internet lors de la
premiere visite. Les commandes WhatsApp necessitent une connexion.

Le panier est conserve dans le navigateur utilise et n'est pas synchronise
entre appareils. Les disponibilites proviennent de produits.json publie sur le site.

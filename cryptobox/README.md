# CryptoBox · brique 1

Outil de chiffrement classique, écrit sans bibliothèque de cryptographie.

- **César** : chiffrer, déchiffrer, force brute sur les 25 clés (`C = (M + k) mod 26`)
- **Substitution** : clé de 26 lettres (A devient la 1re lettre de la clé, B la 2e, etc.)
- **Transposition par colonnes** : mot-clé, dernière ligne complétée par des X

## Utilisation

Ouvrir `index.html` dans un navigateur. Aucune installation.

## Fichiers

- `crypto.js` : les fonctions de chiffrement et déchiffrement
- `app.js` : l'interface et les tests intégrés de l'énoncé
- `style.css`, `assets/leopard.jpg` : l'apparence

## Tests

Les exemples de l'énoncé s'affichent en bas de la page (BONJOUR, ATTAQUE, RENDEZVOUSAMIDI).

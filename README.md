# SIA API Docs

Documentation technique de l'API SIA (authentification, billetterie et SAV), construite avec [Docusaurus](https://docusaurus.io/).

## Aperçu

- Site de documentation: `https://docs.sia-exposition.fr`
- Framework: Docusaurus `3.9.2`
- Langue principale: français (`fr`)
- Runtime Node.js: `>=20.0`

## Démarrage rapide

### Prérequis

- Node.js `>=20`
- npm (fourni avec Node.js)

### Installation

```bash
npm install
```

### Lancer en local

```bash
npm run start
```

Le serveur de développement démarre avec rechargement automatique des pages.

## Scripts utiles

```bash
npm run start
npm run build
npm run serve
npm run clear
npm run deploy
npm run write-translations
npm run write-heading-ids
```

## Structure de la documentation

Les contenus sont organisés dans le dossier `docs/`:

- `docs/authentification/`
  - `index`, `register`, `login`, `me`, `update`, `update_password`, `delete`
- `docs/billetterie/`
  - `index`, `create`, `get_mine`, `transfer`, `delete`
- `docs/sav/`
  - `index`, `create`

La navigation est définie dans `sidebars.js`.

## Build de production

```bash
npm run build
```

Le build génère les fichiers statiques dans `build/`.

## Déploiement

```bash
npm run deploy
```

Selon votre cible, vous pouvez aussi utiliser les variables d'environnement Docusaurus classiques (`USE_SSH`, `GIT_USER`, etc.).

## Contribution

1. Créez une branche à partir de `main`.
2. Modifiez les pages Markdown dans `docs/`.
3. Vérifiez en local avec `npm run start`.
4. Lancez `npm run build` avant d'ouvrir une PR.

## Notes connues

- Le projet est strict sur les liens cassés (`onBrokenLinks: 'throw'`).
- Si le build échoue avec un lien `/blog`, retirez ce lien de la configuration du thème (navbar/footer) ou activez le blog.

## Équipe

Le footer du site contient les liens vers les membres de l'équipe (portfolio/LinkedIn) et les sites liés au projet SIA.

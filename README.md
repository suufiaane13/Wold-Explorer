<<<<<<< HEAD
# World Explorer

Application web interactive pour explorer les pays du monde.
Fiches detaillees, recherche avancee, favoris, horloges locales, extraits Wikipedia et lecteur musical.

---

## Fonctionnalites

### Exploration
- **Catalogue complet** -- 250+ pays et territoires via REST Countries API
- **3 modes d'affichage** -- Grille (cartes), Liste (compact), Compact (miniatures), persistant en localStorage
- **Recherche & filtres** -- Par nom / capitale, continent (Africa, Americas, Antarctic, Asia, Europe, Oceania), fourchette de population, tri par nom / population / superficie
- **Pagination** -- 12, 24, 48 ou 96 par page ; le mode compact passe automatiquement a 24

### Fiche pays
- Drapeau, capitale, population, langues, monnaie, superficie
- Horloge locale en temps reel (API Intl.DateTimeFormat)
- Extrait Wikipedia (FR avec fallback EN) via l'API REST Wikipedia
- Pays frontaliers avec noms complets et liens
- Bouton regenerer pour obtenir un nouvel extrait

### Favoris
- Ajout / retrait en un clic (coeur)
- Stockage localStorage, bouton adapte clair / sombre
- Memes 3 modes d'affichage que la page d'accueil

### UI / UX
- **Mode clair / sombre** -- Bascule persistante, tous les composants s'adaptent
- **Hero section** -- Fond sombre, vague SVG, stats (Continents, Habitants, Decouvertes), bouton CTA adaptatif
- **Scroll intelligent** -- Remontee a la premiere carte au changement de page, restauration de la position au retour d'une fiche pays
- **Responsive** -- Mobile, tablette, desktop ; music player 1 ligne desktop / 2 lignes mobile
- **Animations** -- Framer Motion (entrees, hover, transitions de page)

### Lecteur musical
- Piste locale unique (`public/music/`)
- Design ultra-compact Spotify-style : 1 ligne dense sur desktop, 2 lignes sur mobile
- Barre de progression avec scrubbing, volume, play / pause
- Fond glass-blur, lecture en boucle

---

## Stack technique

| Categorie | Technologie |
|-----------|-------------|
| Framework | React 19, Vite 7 |
| Routing | React Router 7 |
| CSS | Bootstrap 5, CSS custom |
| Animations | Framer Motion |
| Icones | Lucide React |
| API pays | [REST Countries v3.1](https://restcountries.com) |
| API descriptions | [Wikipedia REST API](https://fr.wikipedia.org/api/rest_v1/) |
| Audio | HTML5 Audio API |

---

## Installation

```bash
git clone https://github.com/suufiaane13/Wold-Explorer.git
cd Wold-Explorer-main
npm install
```

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement (http://localhost:5173) |
| `npm run build` | Build de production |
| `npm run preview` | Previsualisation du build |
| `npm run lint` | Verification ESLint |

---

## Structure du projet

```
src/
  components/
    Navbar.jsx           # Navigation avec toggle theme
    Footer.jsx           # Pied de page
    CountryCard.jsx      # Carte pays (3 modes : grid, list, compact)
    SearchAndFilter.jsx  # Barre de recherche, filtres continent / population, tri
    Pagination.jsx       # Navigation par page + choix items/page
    WorldClock.jsx       # Horloge locale d'un pays
    MusicPlayer.jsx      # Lecteur audio fixe en bas
  pages/
    Home.jsx             # Accueil : hero + catalogue pays
    CountryDetails.jsx   # Fiche detaillee d'un pays
    Favorites.jsx        # Liste des favoris
  contexts/
    ThemeContext.jsx      # Gestion clair / sombre
    FavoritesContext.jsx  # Gestion des favoris (localStorage)
  hooks/
    useCountryFilters.js # Logique de filtrage et tri
    usePagination.js     # Logique de pagination
    useAIFunFact.js      # Hook pour extraits Wikipedia
  services/
    aiService.js         # Appels API Wikipedia (FR/EN, cache, fallback)
  utils/
    api.js               # Appels REST Countries
    timezone.js          # Calcul de fuseaux horaires
    formatters.js        # Formatage population
    musicData.js         # Configuration piste audio
  constants/
    storageKeys.js       # Cles sessionStorage
  index.css              # Styles globaux + hero + music player + cards
  App.jsx                # Routes et layout principal
public/
  music/                 # Fichiers audio locaux
```

---

## Musique

Placez vos fichiers audio dans `public/music/`.
Modifiez `src/utils/musicData.js` pour pointer vers votre fichier.

---

## Auteur

Soufiane HJ -- [GitHub](https://github.com/suufiaane13)
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 3217b597875b4ee41101a1a30bcfa023d58528c6

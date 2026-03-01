📑 Cahier des charges – Application World Explorer
1. 🎯 Objectif

Créer une application web interactive qui permet d’explorer les pays du monde entier.
Les utilisateurs peuvent consulter les informations de base et avancées sur chaque pays, effectuer des recherches, appliquer des filtres, et découvrir des résumés via Wikipedia.

2. 👥 Utilisateurs cibles

Étudiants & curieux (culture générale, géographie).

Voyageurs (infos rapides sur un pays).

Grand public qui aime explorer le monde.

3. ⚙️ Fonctionnalités principales

Page d’accueil (liste des pays)

Affichage de tous les pays sous forme de cards modernes (drapeau + nom + capitale).

Barre de recherche (nom du pays).

Filtre par continent (sélecteur).

Page détails d’un pays

Drapeau HD en bannière.

Infos : nom, capitale, population, langues, monnaie, fuseau horaire.

Carte des pays frontaliers avec navigation possible.

Section Fun Fact IA (résumé Wikipedia).

Mode clair / sombre

Switch simple, animations fluides.

Favoris

Possibilité de sauvegarder ses pays préférés dans une section "Mes pays favoris".

Responsive design

Optimisation mobile / tablette / desktop.

4. 🎨 Design & Expérience Utilisateur (focus design haut niveau)

Pour que ton app ait un design élevé et pro, je te recommande :

🔹 Style général

Minimaliste + moderne (style Apple / Dribbble).

Couleurs neutres avec une couleur d’accent (ex: bleu ciel 🌊 ou vert émeraude 🌱).

Grandes images de drapeaux pour l’impact visuel.

Icônes vectorielles élégantes (Lucide Icons ou FontAwesome).

🔹 Composants UI

Navbar fixe : logo, menu, dark mode switch.

Grid fluide pour les pays (cards avec hover effect, ombre douce, coins arrondis 2xl).

Card pays :

Drapeau en haut (pleine largeur).

Nom du pays en bold.

Petite info (capitale ou continent).

Page détails :

Layout en deux colonnes sur desktop : drapeau à gauche, infos à droite.

Section trivia IA sous forme de bloc stylé avec icône "💡".

🔹 Animations

Framer Motion pour :

Fade-in des cartes.

Transition fluide entre pages.

Hover scale léger sur les cartes.

🔹 Typographie

Titre : Poppins / Inter Bold.

Texte : Inter / Roboto.

Grande taille pour la lisibilité (design moderne = beaucoup d’espace blanc).

5. 🛠️ Stack technique

Vite ReactJS (frontend)

React Router (navigation)

TailwindCSS (design moderne + responsive rapide)

Framer Motion (animations fluides)

REST Countries API (données pays)

Windsurf AI (génération d’résumés / fun facts IA)

6. 📅 Étapes de développement

Setup projet Vite ReactJS + Tailwind.

npm install tailwindcss @tailwindcss/vite
vite.config.ts

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
@import "tailwindcss";

Création des pages & routing (Home, Détails, Favoris).

Intégration API REST Countries.

Implémentation recherche + filtres.

UI/UX design (dark mode, animations, cards).

Ajout résumés Wikipedia.

Optimisation responsive + performance.

Déploiement (Netlify / Vercel).
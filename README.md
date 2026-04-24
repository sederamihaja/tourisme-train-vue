# 🌐 Frontend - Projet Tourisme en train - SNCF

Bienvenue 👋

Ce projet est l’interface utilisateur d’une application permettant de :

- Rechercher des gares
- Afficher leur position sur une carte
- Découvrir les institutions situées à proximité
- Itinéraire entre deux gares
- Choix d'autre itinéraire et les horaries d'ouverture de la gare de départ

Le frontend communique avec un backend (API) pour récupérer les données.

---

# 🧰 Prérequis

Avant de commencer, vous devez installer (si ce n'est pas déjà fait) :

### 1. Node.js

👉 https://nodejs.org
👉 Installer la version **LTS**

---

### 2. Git

👉 https://git-scm.com/downloads

---

### ⚠️ Important

Le backend doit être installé et lancé avant d’utiliser ce frontend.

---

# 📥 Étape 1 : Cloner le projet

Dans un terminal :

```bash
git clone https://github.com/sederamihaja/tourisme-train-vue.git
cd tourisme-train-vue
```

---

# 📦 Étape 2 : Installer les dépendances

```bash
npm install
```

---

# ⚙️ Étape 3 : Configuration

Créer un fichier `.env` à la racine du projet avec le contenu suivant :

```env
VITE_API_URL='http://localhost:5000/api'
```

👉 Cette URL correspond au backend.

---

# ▶️ Étape 4 : Lancer l’application

```bash
npm run dev
```

---

# 🌍 Étape 5 : Ouvrir l’application

Ouvrez votre navigateur à l’adresse :

```text
http://localhost:5173/
```

---

# 🗺️ Fonctionnalités principales

L’application permet d’explorer les gares et leurs alentours de manière interactive, à partir d’une carte.

---

## ⏱️ Carte isochrone (temps de trajet)

Au lancement de l’application :

- Une carte s’affiche avec une **zone isochrone** (zone accessible)
- Le temps maximal est défini par défaut à **1 heure**

Vous pouvez modifier ce temps :

- 1 heure
- 2 heures
- 3 heures
- 4 heures
- 5 heures

👉 La zone sur la carte s’adapte automatiquement en fonction du temps choisi.

---

## 🔍 Recherche de gare

- Saisir le nom d’une gare dans la barre de recherche
- Obtenir des résultats en temps réel
- Sélectionner une gare

---

## 📍 Affichage d’une gare

Lorsque vous sélectionnez une gare :

- Elle s’affiche sur la carte
- Une zone isochrone est générée autour de celle-ci
- Les **institutions, établissements et festivals à proximité** sont affichées
- Vous pouvez voir les détails d'une palce tout en cliquant dessus

---

## 🧭 Calcul d’itinéraire

Un bouton **"Itinéraire"** permet de :

- Choisir une gare de départ
- Définir un trajet entre deux gares

---

## 🚆 Affichage de l’itinéraire

Après sélection d’une gare de départ :

- Le trajet est tracé sur la carte
- La gare de départ et d’arrivée sont visibles

---

## 📊 Statistiques du trajet

L’application affiche plusieurs informations utiles :

- 🌱 **CO₂e évité (en kg)**
  (comparaison avec voiture et avion)

- 📍 **Nombre de points d’intérêt**
  Autour de la gare d’arrivée

- 📏 **Distance du trajet**

- ⏱️ **Durée du trajet**

- 🕒 **Date et heure de départ**

---

## 🔄 Choix d’autres itinéraires

En cliquant sur la **date et heure de départ** :

- Vous pouvez voir d’autres trajets possibles
- Sélectionner un autre itinéraire
- Afficher le nouveau trajet sur la carte

---

## 🕒 Horaires de la gare

Pour la gare de départ, vous pouvez consulter :

- Les horaires d’ouverture normaux
- Les horaires spécifiques (jours fériés)

---

# 🎯 Objectif

L’objectif de cette application est de :

- Visualiser l’accessibilité des gares
- Comparer différents trajets
- Analyser l’impact écologique
- Découvrir les services disponibles à proximité

# 🙌 Merci

Merci d’utiliser ce projet !

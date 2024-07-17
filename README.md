# Todo App

Une application de gestion de notes utilisant le stack MEVN (MongoDB, Express.js, Vue.js, Node.js).

## Structure du projet

- /.vscode # Configuration de l'IDE
- /.gitignore # Fichier pour ignorer les fichiers non nécessaires
- /api # Backend API
- /node_modules # Dépendances Node.js
- /.env # Variables d'environnement
- /index.js # Code du serveur Express
- /package.json # Dépendances et scripts du projet
- /package-lock.json # Version verrouillée des dépendances
- /ui # Frontend
- /todoapp # Interface utilisateur
- /index.html # Fichier HTML principal

## Fonctionnalités

- **CRUD des Notes** : Créez, lisez, mettez à jour et supprimez des notes.
- **Interface utilisateur réactive** : Développée avec Vue.js pour une expérience utilisateur fluide.
- **API REST** : Utilisation d'Express.js pour gérer les requêtes HTTP.
- **Base de données MongoDB Atlas** : Stockage des notes dans une base de données NoSQL.

## Technologies utilisées

- **MongoDB** : Base de données NoSQL pour stocker les notes.
- **Express.js** : Framework web pour créer l'API.
- **Vue.js** : Framework JavaScript pour construire l'interface utilisateur.
- **Node.js** : Environnement d'exécution pour exécuter le serveur.
- **Vuetify.js** : Framework de composants pour améliorer l'interface utilisateur avec un design moderne.

## Installation

### Prérequis

- Node.js (v12 ou supérieur)
- MongoDB Atlas (ou local)

### Cloner le projet

```bash
git clone <url-du-repo>
cd <nom-du-projet>
```

### Installation des dépendances

Naviguez dans le dossier API et installez les dépendances :

```bash
cd api
npm install
```

### Configuration de l'environnement

1. Créez un fichier .env dans le dossier /api avec les variables suivantes :

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.zpvkgww.mongodb.net/todoappdb?retryWrites=true&w=majority
```

2. Remplacez <username> et <password> par vos identifiants MongoDB.

## Lancement de l'application

### Démarrage de l'API

Lancez le serveur API :

```bash
node index.js
```

### Démarrage de l'interface utilisateur

Ouvrez le fichier index.html dans le dossier /ui/todoapp dans un navigateur.

## Utilisation

- Ajouter une note : Saisissez la description dans le champ prévu et cliquez sur "Ajouter Note".
- Supprimer une note : Cliquez sur le bouton "Supprimer" à côté de la note correspondante.
- Visualiser les notes : Toutes les notes sont affichées dans une liste.

### Contribuer

Si vous souhaitez contribuer, n'hésitez pas à faire un fork du projet et à soumettre une pull request.

### Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

### Auteurs

- Mathieu Mattei (Klash2b)

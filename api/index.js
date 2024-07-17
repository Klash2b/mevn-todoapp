require("dotenv").config(); // Charger les variables d'environnement à partir du fichier .env

const express = require("express"); // Importer le framework Express
const { MongoClient, ObjectId } = require("mongodb"); // Importer MongoClient et ObjectId de mongodb
const cors = require("cors"); // Importer le middleware CORS

const app = express(); // Créer une instance de l'application Express
app.use(cors()); // Activer CORS pour permettre les requêtes cross-origin
app.use(express.json()); // Middleware pour parser le JSON dans les requêtes entrantes

const CONNECTION_STRING = process.env.MONGODB_URI; // Utiliser la variable d'environnement pour la connexion à MongoDB
const DATABASENAME = "todoappdb"; // Nom de la base de données
let database; // Variable pour stocker la connexion à la base de données

console.log(process.env.MONGODB_URI); // Afficher l'URI de connexion pour le débogage

// Démarrer le serveur sur le port 5038
app.listen(5038, async () => {
  try {
    const client = await MongoClient.connect(CONNECTION_STRING); // Se connecter à MongoDB
    database = client.db(DATABASENAME); // Accéder à la base de données
    console.log("MongoDB Connection Successful"); // Message de succès
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error); // Gérer les erreurs de connexion
  }
});

// Route GET pour récupérer toutes les notes
app.get("/api/todoapp/getnotes", async (req, res) => {
  if (!database) {
    return res.status(500).send("Database not connected"); // Vérifier si la base de données est connectée
  }

  try {
    const notes = await database
      .collection("todoappcollection") // Accéder à la collection des notes
      .find({})
      .toArray(); // Convertir le résultat en tableau
    res.send(notes); // Envoyer les notes au client
  } catch (error) {
    console.error("Error fetching data: ", error); // Gérer les erreurs de récupération
    res.status(500).send(error); // Retourner une erreur
  }
});

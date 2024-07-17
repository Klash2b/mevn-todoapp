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


// Route POST pour ajouter une nouvelle note
app.post("/api/todoapp/addnote", async (req, res) => {
  const newNote = { description: req.body.description }; // Créer un nouvel objet note avec la description

  if (!newNote.description) {
    return res.status(400).send("No note description provided"); // Vérifier si la description est fournie
  }

  try {
    const result = await database
      .collection("todoappcollection") // Accéder à la collection des notes
      .insertOne(newNote); // Insérer la nouvelle note
    res.status(201).send({ _id: result.insertedId, ...newNote }); // Retourner la note ajoutée avec son ID
  } catch (error) {
    console.error("Error adding note: ", error); // Gérer les erreurs d'ajout
    res.status(500).send(error); // Retourner une erreur
  }
});

// Route DELETE pour supprimer une note par ID
app.delete("/api/todoapp/deletenote/:id", async (req, res) => {
  const noteId = req.params.id; // Récupérer l'ID de la note depuis les paramètres de l'URL

  try {
    const result = await database
      .collection("todoappcollection") // Accéder à la collection des notes
      .deleteOne({ _id: new ObjectId(noteId) }); // Supprimer la note avec l'ID correspondant

    if (result.deletedCount === 0) {
      return res.status(404).send("Note not found"); // Vérifier si une note a été supprimée
    }

    res.status(204).send(); // Pas de contenu à retourner après la suppression
  } catch (error) {
    console.error("Error deleting note: ", error); // Gérer les erreurs de suppression
    res.status(500).send(error); // Retourner une erreur
  }
});

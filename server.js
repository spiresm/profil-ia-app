import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Pour pouvoir utiliser __dirname dans ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware pour parser le JSON
app.use(express.json());

// Dossier public (où sont tes fichiers HTML/CSS/JS/images)
app.use(express.static(path.join(__dirname, 'public')));

// Chemin du fichier JSON
const profilPath = path.join(__dirname, 'public', 'profil.json');

// Route pour récupérer le profil
app.get('/profil', (req, res) => {
  if (fs.existsSync(profilPath)) {
    fs.readFile(profilPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Erreur de lecture');
      try {
        res.json(JSON.parse(data));
      } catch {
        res.status(500).send('Fichier JSON invalide');
      }
    });
  } else {
    res.json({});
  }
});

// Route pour enregistrer le profil
app.post('/profil', (req, res) => {
  const data = req.body;
  fs.writeFile(profilPath, JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(500).send('Erreur d\'écriture');
    res.sendStatus(200);
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

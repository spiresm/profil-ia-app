import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROFIL_PATH = path.join(__dirname, 'profil.json');

app.use(express.json());
app.use(express.static('public'));

app.get('/profil', (req, res) => {
  fs.readFile(PROFIL_PATH, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Erreur de lecture');
    res.json(JSON.parse(data || '{}'));
  });
});

app.post('/profil', (req, res) => {
  fs.writeFile(PROFIL_PATH, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send("Erreur d'enregistrement");
    res.send('OK');
  });
});

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});

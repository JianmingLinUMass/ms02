const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Database = require('./database.js'); 

const app = express();
const PORT = 3000;

const dbFilePath = path.resolve(__dirname, 'questions.db');
const database = new Database(dbFilePath);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the front-end directory
const frontEndPath = path.join(__dirname, '../front-end');
app.use(express.static(frontEndPath));

// Make sure Express serves JavaScript files with the correct MIME type
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Handle fetching questions from the database
app.get('/questions', async (req, res) => {
  console.log("Attempting to fetch questions");
  try {
    const questions = await database.getAllQuestions();
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).send('Failed to fetch questions');
  }
});

// Catch-all for any requests to serve HTML files
app.get('*', (req, res) => {
  let filePath = path.join(frontEndPath, req.path === '/' ? 'Homepage/home-page.html' : req.path);
  res.sendFile(filePath, err => {
    if (err) {
      console.error("Error serving file:", err);
      res.status(404).send('404 Not Found (probably a bad file path)');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

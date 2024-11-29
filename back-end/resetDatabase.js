const Database = require('./database.js');  // Assuming your database.js file is in the same directory
const db = new Database('./questions.db');  // Path to your SQLite database

db.removeQuestionsTable()
db.createQuestionsTable()
const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.error('Error connecting to database:', err);
            } else {
                console.log('Connected to SQLite database.');
            }
        });
    }

    // General method to run a SQL command
    runCommand(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Create a questions table
    createQuestionsTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                category TEXT NOT NULL
            )`;
        return this.runCommand(sql);
    }

    //TODO: add table for users.

    // Add a new question
    addQuestion(question, answer, category) {
        const sql = `INSERT INTO questions (question, answer, category) VALUES (?, ?, ?)`;
        return this.runCommand(sql, [question, answer, category]);
    }

    // Query all questions.
    getAllQuestions() {
        const sql = `SELECT * FROM questions`;
        return this.runCommand(sql);
    }

    // query questions by category
    getQuestionsByCategory(category) {
        const sql = `SELECT * FROM questions WHERE category = ?`;
        return this.runCommand(sql, [category]);
    }

    // Query a question by ID
    getQuestionById(id) {
        const sql = `SELECT * FROM questions WHERE id = ?`;
        return this.runCommand(sql, [id]);
    }
}

module.exports = Database;

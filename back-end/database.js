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

    /* Create questions tables

    id:                 number used to uniquely identify questions
    question:           the text displayed as the question
    answer:             the correct answer
    language:           the language the question is in
    category:           what category the question is in
    exception:          boolean value describing whether or not the answer follows the standard rule
    possible answers:   for exercise questions only, a sstring that denotes all possible answers with a delimiter i.e a1,a2,a3
    */
    createQuestionsTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                language TEXT NOT NULL,
                category TEXT NOT NULL,
                exception BOOLEAN NOT NULL,
                possible_answers TEXT NULL 
            )`;
        return this.runCommand(sql);
    }

    removeQuestionsTable(){
        const sql = `DROP TABLE IF EXISTS questions;`
        return this.runCommand(sql);
    }


    //TODO: add table for users.

    //Idea: Users have unique userID. Have 2 tables, one for account details and one for activity.
    //login tbale has ID, username, email, encrypted password, filepath to image location in backend(this is debatable, maybe just dynamically generate from user id, maybe have a subfolder for each last digit of userid)
    

    // Add a new question
    addQuestion(question, answer, language, category, exception, possible_answers = null) {
        if(possible_answers){
            const sql = `
            INSERT INTO questions (question, answer, language, category, exception, possible_answers) 
            VALUES (?, ?, ?, ?, ?, ?)`;
            return this.runCommand(sql, [question, answer, language, category, exception, possible_answers]);
        }
        else{
            const sql = `
            INSERT INTO questions (question, answer, language, category, exception) 
            VALUES (?, ?, ?, ?, ?)`;
            return this.runCommand(sql, [question, answer, language, category, exception]);
        }
    }



    // General method to query questions by attributes.For example, to query all english questions that deal with future simple, have
    // attributes = ["language", "category"] and
    // values = ["english", "future simple"]
    // leave blank to get all questions.
    queryQuestions(attributes, values) {
        if(attributes.length === 0){
            const sql = `SELECT * FROM questions`;
            return this.runCommand(sql);
        }
        else{
            // Dynamically construct the WHERE clause based on the attributes
            const whereClause = attributes.map(attr => `${attr} = ?`).join(' AND ');
            const sql = `SELECT * FROM questions WHERE ${whereClause}`;
            
            // Execute the query with the provided values
            return this.runCommand(sql, values);
        }
    }

}

module.exports = Database;

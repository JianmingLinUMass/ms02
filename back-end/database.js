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


    /* Create user accounts table, called 'userAccounts'.
    user id:             the unique id                     (unmodifiable; generated upon user account set up)
    username:            the user's profile name            (modifiable; should be initialized upon user account set up)
    user email:          the user's email address          (modifiable; should be initialized upon user account set up)
    user password:       the user's password               (modifiable; should be stored encrypted upon user account set up)
    user profile path:    the user's profile picture filepath (modifiable; should have a default picture available upon user account set up)
    user level:          the user's current level          (unmodifiable by user; should be updated based on user points earned from exercise and quiz)
    user point exercise: the user's points from exercise   (unmodifiable by user; should be updated based on number of exercises the user has completed so far)
    user point quiz:     the user's points from quiz       (unmodifiable by user; should be updated based on number of quizzes the user has completed so far)
    */
    createUserAccountsTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS userAccounts (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                user_email TEXT NOT NULL,
                user_password TEXT NOT NULL,
                user_profile_path TEXT NOT NULL,
                user_level INTEGER NOT NULL,
                user_point_exercise DECIMAL(5, 2) NOT NULL,
                user_point_quiz DECIMAL(5, 2) NOT NULL
            );`;
        return this.runCommand(sql);
    }

    removeUserAccountsTable(){
        const sql = `DROP TABLE IF EXISTS userAccounts;`
        return this.runCommand(sql);
    }

    //insert a new question into database
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

    // Add a new user account
    addUserAccount(username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz) {
        const sql = `
        INSERT INTO userAccounts (username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return this.runCommand(sql, [username, user_email, user_password, user_profile_path, user_level, user_point_exercise, user_point_quiz]);
    }

    // Method to query user account.
    // For example, to query a specific account, need to have 
    // attributes = ["user_id"] and values = [1], OR 
    // attributes = ["user_email"] and values = ["emailaddress456@gmail.com"]
    queryUserAccounts(attributes, values) {
        // Construct the WHERE clause based on the attributes (i.e. user_id or user_email)
        const whereClause = attributes.map(attr => `${attr} = ?`);
        const sql = `SELECT * FROM userAccounts WHERE ${whereClause}`;
        
        // Execute the query with the provided values
        return this.runCommand(sql, values);
    }

    // Delete an existing user account from userAccounts.db with the specific value for a attribute
    // whereAttribute: should be either "user_email" or "user_id"
    // whereValue: should be something like "useremail2@gmail.com" (if attribute is email), or "1" (if attribute is id)
    deleteUserAccount(whereAttribute, whereValue) {
        const whereClause = `${whereAttribute} = ${whereValue}`;
        const sql = `DELETE FROM userAccounts
                     WHERE ${whereClause}`;

        return this.runCommand(sql);
    }

    // Modify the modifiable values of an user account
    // username (string), user_email (string), user_password (string), user_profile_path (string), user_level (integer), user_point_exercise (float), user_point_quiz (float)
    modifyUserAccount(attributes, values, attribute, value) {
        const setClause = attributes.map(attr => `${attr} = ?`).join(', ');
        console.log('value has type of String:', typeof value === 'string')
        //const whereClause = `${attribute} = '${value}'`;
        const whereClause = typeof value === 'string' ? `${attribute} = '${value}'` : `${attribute} = ${value}`;
        console.log('whereClause:', whereClause)
        const sql = `UPDATE userAccounts
                     SET ${setClause}
                     WHERE ${whereClause}`;
        this.runCommand(sql, values);
        
        const sql2 = `SELECT * FROM userAccounts WHERE ${whereClause}`;
        return this.runCommand(sql2);
    }
}

module.exports = Database;

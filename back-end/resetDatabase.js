const Database = require('./database.js');  // Assuming your database.js file is in the same directory
const db = new Database('./questions.db');  // Path to your SQLite database

function resetQuestionsTable(){
    db.removeQuestionsTable()
    db.createQuestionsTable()
}


// const db2 = new Database('./userAccounts.db');
// db2.removeUserAccountsTable();
// db2.createUserAccountsTable();

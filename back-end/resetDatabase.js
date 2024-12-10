const Database = require('./database.js');  // Assuming your database.js file is in the same directory
const questiondb = new Database('./questions.db');  // Path to your SQLite database
const frienddb = new Database('./friendDatabase.db')

function resetQuestionsTable(){
    questiondb.removeQuestionsTable();
    questiondb.createQuestionsTable();
}


// const db2 = new Database('./userAccounts.db');
// db2.removeUserAccountsTable();
// db2.createUserAccountsTable();

async function resetFriendsTable(){
    await frienddb.removeFriendRequestTable();
    await frienddb.removeFriendsTable();
    await frienddb.createFriendRequestTable();
    await frienddb.createFriendsTable();
}

resetFriendsTable()
// resetFriendsTable();
// resetQuestionsTable()

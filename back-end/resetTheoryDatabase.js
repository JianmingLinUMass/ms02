const Database = require('./database.js');  
const db = new Database('./theory.db');  

async function resetTheoryTable(){
    await db.removeTheoryTable();
    await db.createTheoryTable();
}

// Run the function
resetTheoryTable();
const Database = require('./database.js');  
const db = new Database('./theory.db');  

//file used locally to reset the database or create one if it does not exist yet 

async function resetTheoryTable(){
    await db.removeTheoryTable(); //uses method from database.js to remove table if it exists
    await db.createTheoryTable(); //uses method from database.js to create  anew table 
}

// run the function
resetTheoryTable();
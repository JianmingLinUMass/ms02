// addQuestions.js
const Database = require('./database.js');  // Assuming your database.js file is in the same directory

// Create a new instance of the Database class
const db = new Database('./questions.db');  // Path to your SQLite database

// Questions you want to insert
const questionsToAdd = [
    { question: 'What is the past tense of run?', answer: 'ran', category: 'grammar' },
    { question: 'What is the past tense of need?', answer: 'needed', category: 'grammar' },
    { question: 'What is the past tense of meet?', answer: 'met', category: 'grammar' }
];

// Function to add questions to the database
async function addQuestions() {
    try {
        // Loop through each question and add it to the database
        for (const question of questionsToAdd) {
            const { question: q, answer, category } = question;
            await db.addQuestion(q, answer, category);  // Using your addQuestion method from the database class
            console.log(`Question added: "${q}"`);
        }
        console.log('All questions have been added successfully!');
    } catch (err) {
        console.error('Error adding questions:', err);
    } finally {
        // Close the database connection when done
        db.db.close();
    }
}

// Run the function
addQuestions();

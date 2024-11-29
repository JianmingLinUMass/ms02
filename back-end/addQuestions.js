const Database = require('./database.js');  // Assuming your database.js file is in the same directory
const db = new Database('./questions.db');  // Path to your SQLite database

// Questions you want to insert
// (question, answer, language, category, exception, possible_answers)
const questionsToAdd = [
    { question: 'What is the past tense of run?', answer: 'ran', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of meet?', answer: 'met', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of eat?', answer: 'ate', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of go?', answer: 'went', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of speak?', answer: 'spoke', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of take?', answer: 'took', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of give?', answer: 'gave', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of write?', answer: 'wrote', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of buy?', answer: 'bought', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of see?', answer: 'saw', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of have?', answer: 'had', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of know?', answer: 'knew', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of think?', answer: 'thought', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of run?', answer: 'ran', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of teach?', answer: 'taught', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of bring?', answer: 'brought', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of begin?', answer: 'began', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of drive?', answer: 'drove', language: "english", category: 'past-simple', exception: true },
    { question: 'What is the past tense of need?', answer: 'needed', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of walk?', answer: 'walked', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of play?', answer: 'played', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of work?', answer: 'worked', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of talk?', answer: 'talked', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of clean?', answer: 'cleaned', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of laugh?', answer: 'laughed', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of jump?', answer: 'jumped', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of cook?', answer: 'cooked', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of visit?', answer: 'visited', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of study?', answer: 'studied', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of arrive?', answer: 'arrived', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of help?', answer: 'helped', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of close?', answer: 'closed', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of watch?', answer: 'watched', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of arrive?', answer: 'arrived', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of call?', answer: 'called', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of stop?', answer: 'stopped', language: "english", category: 'past-simple', exception: false },
    { question: 'What is the past tense of finish?', answer: 'finished', language: "english", category: 'past-simple', exception: false }

    
]


// Function to add questions to the database

// QuestionID (integer) , Question Text (string), Answer (string), Language (string), Category (string), Exception (boolean)
async function addQuestions() {
    try {
        // Loop through each question and add it to the database
        for (const q of questionsToAdd) {
            const { question, answer, language, category, exception, possible_answers } = q;
            
            // Handle the optional possible_answers field
            const possibleAnswersString = possible_answers ? possible_answers : null;

            // Use the updated addQuestion method to include all new fields
            await db.addQuestion(question, answer, language, category, exception, possibleAnswersString);  
            console.log(`Question added: "${question}"`);
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

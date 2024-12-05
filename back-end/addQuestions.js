const Database = require('./database.js');  // Assuming your database.js file is in the same directory
const db = new Database('./questions.db');  // Path to your SQLite database

// Questions you want to insert
// (question, answer, language, category, exception, possible_answers)
const pastSimpleQuestions = [
    { question: "What is the past tense of 'arrive'?", answer: "arrived", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'ask'?", answer: "asked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'build'?", answer: "built", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'close'?", answer: "closed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'dream'?", answer: "dreamed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'give'?", answer: "gave", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'happen'?", answer: "happened", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'hope'?", answer: "hoped", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'learn'?", answer: "learned", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'like'?", answer: "liked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'listen'?", answer: "listened", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'look'?", answer: "looked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'move'?", answer: "moved", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'need'?", answer: "needed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'open'?", answer: "opened", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'play'?", answer: "played", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'pull'?", answer: "pulled", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'put'?", answer: "put", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'remember'?", answer: "remembered", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'say'?", answer: "said", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'show'?", answer: "showed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'stand'?", answer: "stood", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'start'?", answer: "started", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'stay'?", answer: "stayed", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'stop'?", answer: "stopped", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'take'?", answer: "took", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'talk'?", answer: "talked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'think'?", answer: "thought", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'turn'?", answer: "turned", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'visit'?", answer: "visited", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'watch'?", answer: "watched", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'work'?", answer: "worked", language: "english", category: "past-simple", exception: false },
    { question: "What is the past tense of 'understand'?", answer: "understood", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'forget'?", answer: "forgot", language: "english", category: "past-simple", exception: true },
    { question: "What is the past tense of 'walk'?", answer: "walked", language: "english", category: "past-simple", exception: false, possible_answers: "walked,walken,walkeded" },
    { question: "What is the past tense of 'eat'?", answer: "ate", language: "english", category: "past-simple", exception: true, possible_answers: "eaten,ate,ated" },
    { question: "What is the past tense of 'sleep'?", answer: "slept", language: "english", category: "past-simple", exception: false, possible_answers: "slept,sleped,sleeped" },
    { question: "What is the past tense of 'help'?", answer: "helped", language: "english", category: "past-simple", exception: false, possible_answers: "helped,helpen,helpted" },
    { question: "What is the past tense of 'write'?", answer: "wrote", language: "english", category: "past-simple", exception: true, possible_answers: "wrote,writed,writeed" },
    { question: "What is the past tense of 'go'?", answer: "went", language: "english", category: "past-simple", exception: true, possible_answers: "go,goed,going" },
    { question: "What is the past tense of 'dance'?", answer: "danced", language: "english", category: "past-simple", exception: false, possible_answers: "danced,danceded,dancen" },
    { question: "What is the past tense of 'catch'?", answer: "caught", language: "english", category: "past-simple", exception: true, possible_answers: "catch,catched,caught" },
    { question: "What is the past tense of 'drink'?", answer: "drank", language: "english", category: "past-simple", exception: true, possible_answers: "drink,drank,drankned" },
    { question: "What is the past tense of 'read'?", answer: "read", language: "english", category: "past-simple", exception: false, possible_answers: "read,readed,red" },
    { question: "What is the past tense of 'sing'?", answer: "sang", language: "english", category: "past-simple", exception: true, possible_answers: "sung,sang,sangned" },
    { question: "What is the past tense of 'run'?", answer: "ran", language: "english", category: "past-simple", exception: true, possible_answers: "ran,runed,runned" },
    { question: "What is the past tense of 'throw'?", answer: "threw", language: "english", category: "past-simple", exception: true, possible_answers: "threw,throwed,throwen" },
    { question: "What is the past tense of 'swim'?", answer: "swam", language: "english", category: "past-simple", exception: true, possible_answers: "swam,swamned,swimmed" },
    { question: "What is the past tense of 'make'?", answer: "made", language: "english", category: "past-simple", exception: true, possible_answers: "made,maded,maked" },
    { question: "What is the past tense of 'tell'?", answer: "told", language: "english", category: "past-simple", exception: true, possible_answers: "told,telled,tolded" },
    { question: "What is the past tense of 'find'?", answer: "found", language: "english", category: "past-simple", exception: true, possible_answers: "found,finded,founded" },
    { question: "What is the past tense of 'climb'?", answer: "climbed", language: "english", category: "past-simple", exception: false, possible_answers: "climbed,climben,climbeded" },
    { question: "What is the past tense of 'drive'?", answer: "drove", language: "english", category: "past-simple", exception: true, possible_answers: "drove,drived,driven" },
    { question: "What is the past tense of 'fly'?", answer: "flew", language: "english", category: "past-simple", exception: true, possible_answers: "flew,flyed,fliwn" },
    { question: "What is the past tense of 'begin'?", answer: "began", language: "english", category: "past-simple", exception: true, possible_answers: "began,beginned,begined" },
    { question: "What is the past tense of 'cut'?", answer: "cut", language: "english", category: "past-simple", exception: false, possible_answers: "cut,cutted,cuten" },
    { question: "What is the past tense of 'jump'?", answer: "jumped", language: "english", category: "past-simple", exception: false, possible_answers: "jumped,jumpen,jumpeded" },
    { question: "What is the past tense of 'laugh'?", answer: "laughed", language: "english", category: "past-simple", exception: false, possible_answers: "laughed,laugheded,laughen" },
    { question: "What is the past tense of 'teach'?", answer: "taught", language: "english", category: "past-simple", exception: true, possible_answers: "taught,teached,teacheded" },
    { question: "What is the past tense of 'sell'?", answer: "sold", language: "english", category: "past-simple", exception: true, possible_answers: "sold,selled,saled" },
    { question: "What is the past tense of 'win'?", answer: "won", language: "english", category: "past-simple", exception: true, possible_answers: "won,winned,win" },
    { question: "What is the past tense of 'meet'?", answer: "met", language: "english", category: "past-simple", exception: true, possible_answers: "met,meeted,meted" },
    { question: "What is the past tense of 'buy'?", answer: "bought", language: "english", category: "past-simple", exception: true, possible_answers: "bought,boughted,buyed" },
    { question: "What is the past tense of 'see'?", answer: "saw", language: "english", category: "past-simple", exception: true, possible_answers: "saw,seened,seen" },
    { question: "What is the past tense of 'speak'?", answer: "spoke", language: "english", category: "past-simple", exception: true, possible_answers: "spoke,speaked,spoken" },
    { question: "What is the past tense of 'sit'?", answer: "sat", language: "english", category: "past-simple", exception: true, possible_answers: "sat,sitted,sitted" },
    { question: "What is the past tense of 'do'?", answer: "did", language: "english", category: "past-simple", exception: true, possible_answers: "did,doed,done" },
    { question: "What is the past tense of 'hear'?", answer: "heard", language: "english", category: "past-simple", exception: false, possible_answers: "heard,heared,heareded" },
    { question: "What is the past tense of 'come'?", answer: "came", language: "english", category: "past-simple", exception: true, possible_answers: "came,comen,comded" }
]


// Function to add questions to the database

// QuestionID (integer) , Question Text (string), Answer (string), Language (string), Category (string), Exception (boolean)
async function addQuestions(questionsToAdd) {
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
addQuestions(pastSimpleQuestions);

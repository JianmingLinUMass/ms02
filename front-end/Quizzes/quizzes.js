// quizzes.js

// Fetch a random question when the page loads
async function loadQuestion(queryParams = {}) {
    try {
        // Fetch questions from the server
        const response = await fetch('/questions', {
            method: 'POST',  // Use POST instead of GET
            headers: {
                'Content-Type': 'application/json'  // Inform the server we're sending JSON
            },
            body: JSON.stringify(queryParams)  // Convert the queryParams object to a JSON string
        });

        console.log(response)
        const questions = await response.json();
        console.log(questions)
        // If there are questions, randomly select one and display it
        if (questions.length > 0) {
            const question = questions[Math.floor(Math.random() * questions.length)];
            document.getElementById('question-text').innerText = question.question;
            // Store the correct answer for validation later
            document.getElementById('submit-button').onclick = () => handleSubmit(question);
        } else {
            document.getElementById('question-text').innerText = 'No questions available.';
        }
    } catch (err) {
        console.error('Failed to load questions:', err);
    }
}

let currentQuestions = [];
let currentIndex = 0;

async function loadQuiz(category) {
    try {
        const response = await fetch('/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category }), // Pass the category
        });

        const questions = await response.json();
        if (questions.length > 0) {
            currentQuestions = questions; // Store the fetched questions
            currentIndex = 0; // Reset the index for the new quiz
            displayQuestion(currentQuestions[currentIndex]); // Display the first question
        } else {
            document.getElementById('question-text').innerText = 'No questions available for this category.';
            currentQuestions = [];
        }
    } catch (err) {
        console.error('Failed to load quiz:', err);
        document.getElementById('question-text').innerText = 'Failed to load questions. Please try again later.';
    }
}

// Question Display on flashcard
function displayQuestion(question) {
    document.getElementById('question-text').innerText = question.question;
    document.getElementById('submit-button').onclick = () => handleSubmit(question);
    const resultMessageElement = document.getElementById('result-message');
    resultMessageElement.textContent = ''; // Clears results for new questions
}

// Handle answer submission
function handleSubmit(question) {
    const userAnswer = document.getElementById('answer-input').value.trim();
    const correctAnswer = question.answer.trim();

    const resultMessageElement = document.getElementById('result-message');
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        resultMessageElement.textContent = 'Correct!';
        resultMessageElement.className = 'result-message correct'; // 'correct' style
    } else {
        resultMessageElement.textContent = `Incorrect. The correct answer is: ${correctAnswer}`;
        resultMessageElement.className = 'result-message incorrect'; //  'incorrect' style
    }

    document.getElementById('answer-input').value = '';
}

// Next button functionality, so it goes to the NEXT ->
document.getElementById('next-button').addEventListener('click', () => {
    if (currentQuestions.length > 0) {
        currentIndex = (currentIndex + 1) % currentQuestions.length; 
        displayQuestion(currentQuestions[currentIndex]);
    } else {
        document.getElementById('question-text').innerText = 'No questions available. Please select a quiz.';
    }
});

// Provide a hint (optional logic, can be improved later)
document.getElementById('hint-button').addEventListener('click', () => {
    alert('Hint: Try thinking about the the word in different contexts...'); // You can modify this for more specific hints
});

// Initialize the page by loading a question
window.onload = () => {
    document.getElementById('question-text').innerText = 'Please select a quiz to start.';
};

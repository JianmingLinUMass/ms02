// quizzes.js

let currentQuestions = [];
let currentIndex = 0;
let answeredCount = 0;    // Number of questions completed (moved on after correct answer)
let correctCount = 0;     // Number of questions answered correctly
let currentCategory = ''; // Store the module/category name
let currentQuestionAnsweredCorrectly = false; // Attempts for the currently displayed question

// Fetch a random question when the page loads (if needed)
async function loadQuestion(queryParams = {}) {
    try {
        const response = await fetch('/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queryParams)
        });

        const questions = await response.json();

        if (questions.length >= 25) {
            currentCategory = category;
            currentQuestions = questions;
            currentIndex = 0;
            answeredCount = 0;
            correctCount = 0;
            displayQuestion(currentQuestions[currentIndex]);
        }
    } catch (err) {
        console.error('Failed to load questions:', err);
    }
}

async function loadQuiz(category) {
    try {
        const response = await fetch('/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category }),
        });

        const questions = await response.json();
        if (questions.length > 0) {
            currentQuestions = questions;
            currentIndex = 0;
            answeredCount = 0;
            correctCount = 0;
            displayQuestion(currentQuestions[currentIndex]);
        } else {
            document.getElementById('question-text').innerText = 'No questions available for this category.';
            currentQuestions = [];
        }
    } catch (err) {
        console.error('Failed to load quiz:', err);
        document.getElementById('question-text').innerText = 'Failed to load questions. Please try again later.';
    }
}

function displayQuestion(question) {
    // If we've already completed 25 questions, show the completion message
    if (answeredCount >= 25) {
        showCompletionMessage();
        return;
    }

    // Reset attempts for the new question
    currentQuestionAnsweredCorrectly = false;
    document.getElementById('question-text').innerText = question.question;
    document.getElementById('answer-input').value = '';
    document.getElementById('result-message').textContent = '';
    document.getElementById('submit-button').onclick = () => handleSubmit(question);Submit(question);
}

// Handle answer submission
function handleSubmit(question) {
    // If we've reached 25 answered questions, no more submissions
    if (answeredCount >= 25) return;

    const userAnswer = document.getElementById('answer-input').value.trim();
    const correctAnswer = question.answer.trim();
    const resultMessageElement = document.getElementById('result-message');

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        // Correct answer
        resultMessageElement.textContent = 'Correct!';
        resultMessageElement.className = 'result-message correct';
        currentQuestionAnsweredCorrectly = true;
        correctCount++; // Increase correct count since they got this question right
    } else {
        // Incorrect answer
        resultMessageElement.textContent = `Incorrect. Try again.`;
        resultMessageElement.className = 'result-message incorrect';
        // Don't increment anything, let the user try again
    }

    document.getElementById('answer-input').value = '';
}

// Next button functionality
document.getElementById('next-button').addEventListener('click', () => {
    if (answeredCount >= 25) {
        showCompletionMessage();
        return;
    } if (currentQuestionAnsweredCorrectly) {
        answeredCount++;

        if (answeredCount === 25) {
            // After completing the 25th question, show the completion message
            showCompletionMessage();
        } else {
            // Move to the next question
            currentIndex = (currentIndex + 1) % currentQuestions.length;
            displayQuestion(currentQuestions[currentIndex]);
        }
    } else {
        // If the user tries to click next without correctly answering, do nothing
        const resultMessageElement = document.getElementById('result-message');
        resultMessageElement.textContent = 'You must get the correct answer before moving on.';
        resultMessageElement.className = 'result-message incorrect';
    }
});

// Hint button (optional logic)
document.getElementById('hint-button').addEventListener('click', () => {
    alert('Hint: Try thinking about the word in different contexts...');
});

// Initialize the page
window.onload = () => {
    document.getElementById('question-text').innerText = 'Please select a quiz to start.';
};

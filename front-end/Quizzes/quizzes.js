// quizzes.js

let currentQuestions = [];
let currentIndex = 0;
let answeredCount = 0;    // Number of questions completed (correctly and moved on)
let correctCount = 0;     // Number of correctly answered questions
let currentCategory = ''; // Module/category name
let currentQuestionAnsweredCorrectly = false;

// Load quiz from server by category
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
        if (questions.length >= 25) {
            currentCategory = category;
            currentQuestions = questions;
            currentIndex = 0;
            answeredCount = 0;
            correctCount = 0;
            displayQuestion(currentQuestions[currentIndex]);
        } else {
            document.getElementById('question-text').innerText = 'Not enough questions available for this category.';
            currentQuestions = [];
        }
    } catch (err) {
        console.error('Failed to load quiz:', err);
        document.getElementById('question-text').innerText = 'Failed to load questions. Please try again later.';
    }
}

function displayQuestion(question) {
    // If we've completed 25 questions, show completion message
    if (answeredCount >= 25) {
        showCompletionMessage();
        return;
    }

    currentQuestionAnsweredCorrectly = false;
    document.getElementById('question-text').innerText = question.question;
    document.getElementById('answer-input').value = '';
    document.getElementById('result-message').textContent = '';
    document.getElementById('submit-button').onclick = () => handleSubmit(question);
}

// Handle answer submission
function handleSubmit(question) {
    if (answeredCount >= 25) return; // No action if quiz is completed

    const userAnswer = document.getElementById('answer-input').value.trim();
    const correctAnswer = question.answer.trim();
    const resultMessageElement = document.getElementById('result-message');

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        // Correct answer
        resultMessageElement.textContent = 'Correct!';
        resultMessageElement.className = 'result-message correct';
        currentQuestionAnsweredCorrectly = true;
        correctCount++;
    } else {
        // Incorrect answer
        resultMessageElement.textContent = 'Incorrect. Try again.';
        resultMessageElement.className = 'result-message incorrect';
    }

    document.getElementById('answer-input').value = '';
}

// Next button event
document.getElementById('next-button').addEventListener('click', () => {
    // If completed all questions, show completion
    if (answeredCount >= 25) {
        showCompletionMessage();
        return;
    }

    // Regardless of correctness, increment answeredCount and move on
    answeredCount++;
    if (answeredCount === 25) {
        // Completed the quiz
        showCompletionMessage();
    } else {
        currentIndex = (currentIndex + 1) % currentQuestions.length;
        displayQuestion(currentQuestions[currentIndex]);
    }
});

// Display completion message and save attempt
function showCompletionMessage() {
    const scorePercentage = ((correctCount / 25) * 100).toFixed(0);
    document.getElementById('question-text').innerText =
        `Great job! You completed the ${currentCategory} quiz and scored ${scorePercentage}%. Practice more quizzes or check out your results!`;

    document.getElementById('result-message').textContent = '';

    // Save this attempt
    saveAttempt(currentCategory, scorePercentage);
}

// Save attempt to localStorage and update the results table
function saveAttempt(moduleName, scorePercentage) {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts')) || [];

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const attempt = {
        date: dateStr,
        time: timeStr,
        module: moduleName,
        score: scorePercentage + '%'
    };

    attempts.push(attempt);
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));

    appendAttemptRow(attempt.date, attempt.time, attempt.module, attempt.score);
}

// Load attempts from localStorage and display them
function loadAttempts() {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts')) || [];
    attempts.forEach(attempt => {
        appendAttemptRow(attempt.date, attempt.time, attempt.module, attempt.score);
    });
}

// Append a new row to the results table
function appendAttemptRow(date, time, moduleName, score) {
    const tbody = document.querySelector('.results-table tbody');
    const tr = document.createElement('tr');

    const dateTd = document.createElement('td');
    dateTd.textContent = date;
    tr.appendChild(dateTd);

    const timeTd = document.createElement('td');
    timeTd.textContent = time;
    tr.appendChild(timeTd);

    const moduleTd = document.createElement('td');
    moduleTd.textContent = moduleName;
    tr.appendChild(moduleTd);

    const scoreTd = document.createElement('td');
    scoreTd.textContent = score;
    tr.appendChild(scoreTd);

    tbody.appendChild(tr);
}

// Hint button functionality
document.getElementById('hint-button').addEventListener('click', () => {
    alert('Hint: Try thinking about the word in different contexts...');
});

// Initialize the page
window.onload = () => {
    document.getElementById('question-text').innerText = 'Please select a quiz to start.';
    loadAttempts(); // Load previous attempts from localStorage
};

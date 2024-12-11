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
    }

    document.getElementById('answer-input').value = '';
}

// Next button functionality
document.getElementById('next-button').addEventListener('click', () => {
    if (answeredCount >= 25) {
        showCompletionMessage();
        return;
    } 
    if (currentQuestionAnsweredCorrectly) {
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

// Save an attempt to localStorage
function saveAttempt(moduleName, scorePercentage) {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts')) || [];

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    attempts.push({
        date: dateStr,
        time: timeStr,
        module: moduleName,
        score: scorePercentage + '%'
    });

    localStorage.setItem('quizAttempts', JSON.stringify(attempts));

    // Update the results table
    appendAttemptRow(dateStr, timeStr, moduleName, scorePercentage + '%');
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
    // Include score as well, e.g. "ModuleName (Score%)"
    moduleTd.textContent = `${moduleName} (${score})`;
    tr.appendChild(moduleTd);

    tbody.appendChild(tr);
}

// Hint button functionality
document.getElementById('hint-button').addEventListener('click', () => {
    alert('Hint: Try thinking about the word in different contexts...');
});

// Initialize the page
window.onload = () => {
    document.getElementById('question-text').innerText = 'Please select a quiz to start.';
    loadAttempts(); // Load previous attempts on page load
};



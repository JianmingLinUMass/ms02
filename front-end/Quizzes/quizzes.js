// quizzes.js

// Fetch a random question when the page loads
async function loadQuestion() {
    try {
        // Fetch all questions from the server
        const response = await fetch('/questions');
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

// Handle answer submission
function handleSubmit(question) {
    const userAnswer = document.getElementById('answer-input').value.trim();
    const correctAnswer = question.answer.trim();
    const resultMessage = userAnswer.toLowerCase() === correctAnswer.toLowerCase() 
        ? 'Correct!' 
        : `Incorrect. The correct answer is: ${correctAnswer}`;

    alert(resultMessage); // You can replace this with a styled message in the UI
    document.getElementById('answer-input').value = ''; // Clear the input field
}

// Provide a hint (optional logic, can be improved later)
document.getElementById('hint-button').addEventListener('click', () => {
    alert('Hint: Try thinking about the the word in different contexts'); // You can modify this for more specific hints
});

// Initialize the page by loading a question
window.onload = loadQuestion;

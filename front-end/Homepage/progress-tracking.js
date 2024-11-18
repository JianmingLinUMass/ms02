// Load progress data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
  });
  
  // Function to simulate fetching progress data
  function loadProgress() {
    const lessonsCompleted = 7; // Example data
    const quizzesPassed = 3;    // Example data
  
    updateDashboard(lessonsCompleted, quizzesPassed);
  }
  
  // Function to update the progress dashboard
  function updateDashboard(lessons, quizzes) {
    document.getElementById("lessons-completed").textContent = lessons;
    document.getElementById("quizzes-passed").textContent = quizzes;
  
    const lessonsPercentage = (lessons / 10) * 100;
    document.getElementById("lessons-progress-bar").style.width = `${lessonsPercentage}%`;
  
    const quizzesPercentage = (quizzes / 5) * 100;
    document.getElementById("quizzes-progress-bar").style.width = `${quizzesPercentage}%`;
  }
  
// Initialize IndexedDB and load progress data
document.addEventListener("DOMContentLoaded", () => {
    initIndexedDB();
  });
  
  function initIndexedDB() {
    const dbName = "Grammargic";
    const request = indexedDB.open(dbName, 1);
  
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("progress")) {
        db.createObjectStore("progress", { keyPath: "id" });
      }
    };
  
    request.onsuccess = (event) => {
      const db = event.target.result;
      loadProgress(db);
    };
  
    request.onerror = () => console.error("Failed to open IndexedDB");
  }
  
  // Load progress from IndexedDB
  function loadProgress(db) {
    const transaction = db.transaction("progress", "readonly");
    const store = transaction.objectStore("progress");
    const getRequest = store.get("userProgress");
  
    getRequest.onsuccess = () => {
      const data = getRequest.result || { lessonsCompleted: 0, quizzesPassed: 0 };
      updateDashboard(data.lessonsCompleted, data.quizzesPassed);
    };
  }
  
  // Update progress dashboard
  function updateDashboard(lessons, quizzes) {
    document.getElementById("lessons-completed").textContent = lessons;
    document.getElementById("quizzes-passed").textContent = quizzes;
  
    const lessonsPercentage = (lessons / 10) * 100;
    document.getElementById("lessons-progress-bar").style.width = `${lessonsPercentage}%`;
  
    const quizzesPercentage = (quizzes / 5) * 100;
    document.getElementById("quizzes-progress-bar").style.width = `${quizzesPercentage}%`;
  }
  
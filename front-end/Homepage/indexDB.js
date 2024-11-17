// Centralized IndexedDB helper functions
export function saveProgress(lessonsCompleted, quizzesPassed) {
    const dbName = "Grammargic";
    const request = indexedDB.open(dbName, 1);
  
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("progress", "readwrite");
      const store = transaction.objectStore("progress");
  
      const progress = { id: "userProgress", lessonsCompleted, quizzesPassed };
      store.put(progress);
    };
  }
  
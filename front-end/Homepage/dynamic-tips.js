document.addEventListener("DOMContentLoaded", function () {
    const tipContent = document.getElementById("tip-content");
    const nextTipButton = document.getElementById("next-tip");
    let currentTipIndex = 0;
    let tips = [];
  
    // Fetch tips from the JSON file
    fetch("tips.json")
      .then(response => response.json())
      .then(data => {
        tips = data;
        displayTip();
      })
      .catch(error => {
        console.error("Error loading tips:", error);
        tipContent.textContent = "Unable to load tips. Please try again later.";
      });
  
    // Function to display the current tip
    function displayTip() {
      if (tips.length > 0) {
        tipContent.textContent = tips[currentTipIndex];
      }
    }
  
    // Event listener for "Next Tip" button
    nextTipButton.addEventListener("click", function () {
      if (tips.length > 0) {
        currentTipIndex = (currentTipIndex + 1) % tips.length;
        displayTip();
      }
    });
  });
  
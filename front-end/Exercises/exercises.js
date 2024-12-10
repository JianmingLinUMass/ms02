import { fetchUserAccount, modifyUserAccount } from '/ProgressTracking/crudOpsOnUserAccountsFrontEnd.js';

let notUpdated = true;
let currentQuestions = [];

function getUnitfromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("unit");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function updateExercisePoints() {
    const attribute = "username";
    const value = localStorage.getItem("storedUsername");
    let currExercisePoints = 0;

    const userAccount = fetchUserAccount({attribute, value});

    await userAccount.then(function(result) {
        console.log('post:', result);
        currExercisePoints = result.user_point_exercise;
    });

    const values = [currExercisePoints + 1];
    const attributes = ["user_point_exercise"];

    const userAccount2 = modifyUserAccount({attributes, values, attribute, value});

    await userAccount2.then(function(result) {
        console.log('put:', result);
        const points = document.getElementById("exercise-points");
        points.innerHTML = `Total Exercise Points: ${values[0]}`;
    });
}

async function checkExercisePoints() {
    const attribute = "username";
    const value = localStorage.getItem("storedUsername");
    let currExercisePoints = 0;
    const userAccount = fetchUserAccount({attribute, value});

    await userAccount.then(function(result) {
        console.log('put:', result);
        currExercisePoints = result.user_point_exercise;
        const points = document.getElementById("exercise-points");
        points.innerHTML = `Total Exercise Points: ${currExercisePoints}`;
    })
    
}

async function loadExercise(category) {
    try {
        const response = await fetch('/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({category}),
        });

        const questions = await response.json();

        const filteredQuestions = questions.filter(q => q.possible_answers !== null && q.possible_answers !== undefined);

        if(filteredQuestions.length > 0) {
            currentQuestions = questions;
        } else {
            console.error("No valid questions for the given category.");
        }
    } catch (err) {
        console.error("Failed to load exercise:", err);
    }
}

async function build() {

    const unit = parseInt(getUnitfromURL(), 10);
    const categoryArr = ["past-conditional", "past-continuous", "future-simple", "present-perfect", "present-passive", "past-passive"];
    const selectedCategory = categoryArr[unit-1];
    await loadExercise(selectedCategory);

    const exerciseContainer = document.getElementById("exercise");

    const shuffledIndices = shuffleArray([...Array(30).keys()]).slice(0, 10);

    for(let i = 0; i < shuffledIndices.length; i++) {
        const currIndex = shuffledIndices[i];
        
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = currentQuestions[currIndex].question;
        fieldset.appendChild(legend);
        
        const answers = document.createElement('div');
        answers.setAttribute("class", "exercise-answers");

        const possibleAnswersArray = shuffleArray(currentQuestions[currIndex].possible_answers.split(","));

        possibleAnswersArray.forEach(answer => {
            let currAns = document.createElement('div');
            let label = document.createElement('label');
            let button = document.createElement('input');
            button.setAttribute("class", "radio-button");
            button.setAttribute("type", "radio");
            button.setAttribute("name", currentQuestions[currIndex].question);
            button.setAttribute("value", answer.trim());
            label.innerHTML = answer.trim();
            label.setAttribute("class", "answer-label");

            currAns.appendChild(button);
            currAns.appendChild(label);
            answers.appendChild(currAns);
        })

        fieldset.appendChild(answers);
        exerciseContainer.appendChild(fieldset);
    }

    const title = document.getElementById("title");
    title.innerHTML = `Unit ${unit} Exercise!`;

    const description = document.getElementById("description");
    description.innerHTML = `Welcome to the Unit ${unit} Exercise. Go ahead and get practicing!`;

    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit my answers!";
    submitButton.setAttribute("id", "submit-button");
    submitButton.addEventListener('click', function() {
        checkAnswers(shuffledIndices, currentQuestions);
      });
    exerciseContainer.appendChild(submitButton);

    const resetButton = document.createElement("button");
    resetButton.innerHTML = "Click to reset the exercise with new questions.";
    resetButton.setAttribute("id", "reset-button");
    resetButton.addEventListener("click", function() {
        resetExercise();
    });
    exerciseContainer.appendChild(resetButton);
    checkExercisePoints();
};

function resetExercise() {
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.innerHTML = "";

    const exerciseContainer = document.getElementById("exercise");
    exerciseContainer.innerHTML = "";
    notUpdated = true;

    build();
}

function clearResultMarkers() {
    const markers = document.querySelectorAll(".result-marker");
    markers.forEach(marker => marker.remove());
}

function checkAnswers(shuffledIndices) {
    clearResultMarkers();
    let score = 0;

    shuffledIndices.forEach((index) => {
        const questionData = currentQuestions[index];
        const correctAns = questionData.answer;
        const selectedAns = document.querySelector(`input[name="${questionData.question}"]:checked`);

        const fieldsets = document.querySelectorAll("fieldset");
        let currFieldset = null;

        fieldsets.forEach((fieldset) => {
            const legend = fieldset.querySelector("legend");
            if (legend && legend.textContent.trim() === questionData.question.trim()) {
                currFieldset = fieldset;
            }
        });

        if(currFieldset) {
            const legend = currFieldset.querySelector("legend");

            const resultExists = legend.querySelector(".result-marker");
            if(resultExists) {
                resultExists.remove();
            }
        

        const resultMarker = document.createElement("span");
        resultMarker.setAttribute("class", "result-marker");

        if (selectedAns && selectedAns.value === correctAns) {
            score++;
            resultMarker.innerHTML = " ✓";
            resultMarker.classList.add("green");
        } else {
            resultMarker.innerHTML = " ✗";
            resultMarker.classList.add("red");
        }

        legend.appendChild(resultMarker);
        }
    });

    console.log(score);
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.innerHTML = `Unit ${getUnitfromURL()} Exercise - You got ${score} / ${shuffledIndices.length} correct!`;


    if(score >= 7 && notUpdated == true) {
        updateExercisePoints();
        notUpdated = false;
    }
}

build();
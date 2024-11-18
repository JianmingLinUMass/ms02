const build = () => {
    const unit1baseQ = "What is the past tense of this word: ",
    unit1QA = {
        words: [
            "run", "eat", "write", "swim", "sing", 
            "go", "read", "see", "come", "buy",
            "speak", "think", "drive", "drink", "fly",
            "take", "forget", "break", "choose", "begin"
        ],
        possibleAnswers: [
            ["ran", "runned", "running"], 
            ["eated", "ate", "eating"], 
            ["wrote", "writed", "writing"], 
            ["swam", "swum", "swimming"], 
            ["singed", "sang", "sung"], 
            ["went", "goed", "going"], 
            ["read", "readed", "reading"], 
            ["saw", "seed", "seeing"], 
            ["comed", "came", "coming"], 
            ["buying", "buyed", "bought"], 
            ["spoke", "speaked", "speaking"], 
            ["thought", "thinked", "thinking"], 
            ["drove", "drived", "driving"], 
            ["drank", "drinked", "drunken"], 
            ["flew", "flied", "flying"], 
            ["took", "taked", "taking"], 
            ["forgot", "forgetted", "forgetting"], 
            ["broke", "breaked", "breaking"], 
            ["chose", "choosed", "choosing"], 
            ["began", "begun", "beginning"]
        ],
        correctAnswers: [
            "ran", "ate", "wrote", "swam", "sang", 
            "went", "read", "saw", "came", "bought", 
            "spoke", "thought", "drove", "drank", "flew", 
            "took", "forgot", "broke", "chose", "began"
        ]
    },
    exerciseContainer = document.getElementById("exercise");
    let count = 1;
    for(let i = 0; i < unit1QA.words.length / 2; i++) {
        const curr = document.createElement('div'),
        answers = document.createElement('div'),
        currQID = "q" + count,
        currAID = "a" + count;

        curr.setAttribute("class", "exercise-question");
        curr.setAttribute("id", currQID);
        curr.innerHTML = unit1baseQ + unit1QA.words[i] + "?";

        answers.setAttribute("class", "exercise-answers");
        answers.setAttribute("id", currAID);

        for(let j = 0; j < unit1QA.possibleAnswers[0].length; j++) {
            let currAns = document.createElement('div');
            let label = document.createElement('label');
            let button = document.createElement('input');
            button.setAttribute("type", "radio");
            button.setAttribute("name", unit1QA.words[i]);
            button.setAttribute("value", unit1QA.possibleAnswers[i][j]);
            label.innerHTML = unit1QA.possibleAnswers[i][j]

            currAns.appendChild(button);
            currAns.appendChild(label);

            answers.appendChild(currAns);
        }

        exerciseContainer.appendChild(curr);
        exerciseContainer.appendChild(answers);
        count++;
    }

    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit my answers!";
    submitButton.setAttribute("id", "submit-button");
    submitButton.addEventListener('click', function() {
        checkAnswers();
      });
    exerciseContainer.appendChild(submitButton);
};

function checkAnswers() {
    
}


build();
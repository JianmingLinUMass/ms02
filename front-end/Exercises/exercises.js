function getUnitfromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("unit");
}

const build = () => {
    const baseQs = ["What is the past tense of this word: ",
    "What is the future tense of this word: ",
    "What is the present continuous tense of this word: "],
    unitQA = {
        1: {
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
     2: {
        words: [
            "run", "eat", "write", "swim", "sing",
            "go", "read", "see", "come", "buy",
            "speak", "think", "drive", "drink", "fly",
            "take", "forget", "break", "choose", "begin"
        ],
        possibleAnswers: [
            ["will run", "will ran", "will running"],
            ["will eat", "will ate", "will eating"],
            ["will write", "will wrote", "will writing"],
            ["will swim", "will swam", "will swimming"],
            ["will sing", "will sang", "will singing"],
            ["will go", "will went", "will going"],
            ["will read", "will readed", "will reading"],
            ["will see", "will saw", "will seeing"],
            ["will come", "will came", "will coming"],
            ["will buy", "will bought", "will buying"],
            ["will speak", "will spoke", "will speaking"],
            ["will think", "will thought", "will thinking"],
            ["will drive", "will drove", "will driving"],
            ["will drink", "will drank", "will drinking"],
            ["will fly", "will flew", "will flying"],
            ["will take", "will took", "will taking"],
            ["will forget", "will forgot", "will forgetting"],
            ["will break", "will broke", "will breaking"],
            ["will choose", "will chose", "will choosing"],
            ["will begin", "will began", "will beginning"]
        ],
        correctAnswers: [
            "will run", "will eat", "will write", "will swim", "will sing",
            "will go", "will read", "will see", "will come", "will buy",
            "will speak", "will think", "will drive", "will drink", "will fly",
            "will take", "will forget", "will break", "will choose", "will begin"
        ]
    },
    3: {
        words: [
            "run", "eat", "write", "swim", "sing",
            "go", "read", "see", "come", "buy",
            "speak", "think", "drive", "drink", "fly",
            "take", "forget", "break", "choose", "begin"
        ],
        possibleAnswers: [
            ["running", "runned", "runs"],
            ["eating", "eated", "eats"],
            ["writing", "writed", "writes"],
            ["swimming", "swammed", "swims"],
            ["singing", "singed", "sings"],
            ["going", "goed", "goes"],
            ["reading", "readed", "reads"],
            ["seeing", "seed", "sees"],
            ["coming", "comed", "comes"],
            ["buying", "buyed", "buys"],
            ["speaking", "speaked", "speaks"],
            ["thinking", "thinked", "thinks"],
            ["driving", "drived", "drives"],
            ["drinking", "drinked", "drinks"],
            ["flying", "flied", "flies"],
            ["taking", "taked", "takes"],
            ["forgetting", "forgetted", "forgets"],
            ["breaking", "breaked", "breaks"],
            ["choosing", "choosed", "chooses"],
            ["beginning", "begun", "begins"]
        ],
        correctAnswers: [
            "running", "eating", "writing", "swimming", "singing",
            "going", "reading", "seeing", "coming", "buying",
            "speaking", "thinking", "driving", "drinking", "flying",
            "taking", "forgetting", "breaking", "choosing", "beginning"
        ]
    }};

    const unit = parseInt(getUnitfromURL(), 10);
    const exerciseContainer = document.getElementById("exercise");
    const selectedQA = unitQA[unit],
    selectedBaseQ = baseQs[unit-1];
    let count = 1;
    for(let i = 0; i < selectedQA.words.length / 2; i++) {
        const curr = document.createElement('div'),
        answers = document.createElement('div'),
        currQID = "q" + count,
        currAID = "a" + count;

        curr.setAttribute("class", "exercise-question");
        curr.setAttribute("id", currQID);
        curr.innerHTML = selectedBaseQ + selectedQA.words[i] + "?";

        answers.setAttribute("class", "exercise-answers");
        answers.setAttribute("id", currAID);

        for(let j = 0; j < selectedQA.possibleAnswers[0].length; j++) {
            let currAns = document.createElement('div');
            let label = document.createElement('label');
            let button = document.createElement('input');
            button.setAttribute("class", "radio-button");
            button.setAttribute("type", "radio");
            button.setAttribute("name", selectedQA.words[i]);
            button.setAttribute("value", selectedQA.possibleAnswers[i][j]);
            label.innerHTML = selectedQA.possibleAnswers[i][j];
            label.setAttribute("class", "answer-label");

            currAns.appendChild(button);
            currAns.appendChild(label);

            answers.appendChild(currAns);
        }

        exerciseContainer.appendChild(curr);
        exerciseContainer.appendChild(answers);
        count++;
    }

    const title = document.getElementById("title");
    title.innerHTML = `Unit ${unit} Exercise!`;

    const description = document.getElementById("description");
    description.innerHTML = `Welcome to the Unit ${unit} Exercise. Go ahead and get practicing!`;

    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit my answers!";
    submitButton.setAttribute("id", "submit-button");
    submitButton.addEventListener('click', function() {
        checkAnswers();
      });
    exerciseContainer.appendChild(submitButton);
};

function checkAnswers() {
    alert("answers checked!");
}

build();
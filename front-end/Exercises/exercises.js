import { fetchUserAccount, modifyUserAccount } from '/ProgressTracking/crudOpsOnUserAccountsFrontEnd.js';

const unitQA = {
    1: { // Past Tense
        words: [
            "run", "eat", "write", "swim", "sing", 
            "go", "read", "see", "come", "buy",
            "speak", "think", "drive", "drink", "fly",
            "take", "forget", "break", "choose", "begin",
            "catch", "fall", "stand", "grow", "cut",
            "teach", "learn", "sell", "give", "hear",
            "keep", "leave", "lose", "make", "pay",
            "send", "sleep", "spend", "tell", "understand",
            "win", "write", "bring", "build", "draw",
            "fight", "find", "hold", "know", "meet"
        ],
        possibleAnswers: [
            ["ran", "runned", "running"], ["eated", "ate", "eating"], ["wrote", "writed", "writing"],
            ["swam", "swum", "swimming"], ["singed", "sang", "sung"], ["went", "goed", "going"],
            ["read", "readed", "reading"], ["saw", "seed", "seeing"], ["came", "comed", "coming"],
            ["bought", "buyed", "buying"], ["spoke", "speaked", "speaking"], ["thought", "thinked", "thinking"],
            ["drove", "drived", "driving"], ["drank", "drinked", "drunken"], ["flew", "flied", "flying"],
            ["took", "taked", "taking"], ["forgot", "forgetted", "forgetting"], ["broke", "breaked", "breaking"],
            ["chose", "choosed", "choosing"], ["began", "begun", "beginning"], ["caught", "catched", "catching"],
            ["fell", "falled", "falling"], ["stood", "standed", "standing"], ["grew", "growed", "growing"],
            ["cut", "cutted", "cutting"], ["taught", "teached", "teaching"], ["learned", "learnt", "learning"],
            ["sold", "selled", "selling"], ["gave", "gived", "giving"], ["heard", "heared", "hearing"],
            ["kept", "keeped", "keeping"], ["left", "leaved", "leaving"], ["lost", "lossed", "losing"],
            ["made", "maked", "making"], ["paid", "payed", "paying"], ["sent", "sended", "sending"],
            ["slept", "sleeped", "sleeping"], ["spent", "spended", "spending"], ["told", "telled", "telling"],
            ["understood", "understanded", "understanding"], ["won", "winned", "winning"], ["wrote", "writed", "writing"],
            ["brought", "bringed", "bringing"], ["built", "builded", "building"], ["drew", "drawed", "drawing"],
            ["fought", "fighted", "fighting"], ["found", "finded", "finding"], ["held", "holded", "holding"],
            ["knew", "knowed", "knowing"], ["met", "meeted", "meeting"]
        ],
        correctAnswers: [
            "ran", "ate", "wrote", "swam", "sang", 
            "went", "read", "saw", "came", "bought", 
            "spoke", "thought", "drove", "drank", "flew", 
            "took", "forgot", "broke", "chose", "began",
            "caught", "fell", "stood", "grew", "cut", 
            "taught", "learned", "sold", "gave", "heard",
            "kept", "left", "lost", "made", "paid", 
            "sent", "slept", "spent", "told", "understood",
            "won", "wrote", "brought", "built", "drew", 
            "fought", "found", "held", "knew", "met"
        ]
    },
    2: { // Future Tense
        words: [
            "run", "eat", "write", "swim", "sing", 
            "go", "read", "see", "come", "buy",
            "speak", "think", "drive", "drink", "fly",
            "take", "forget", "break", "choose", "begin",
            "catch", "fall", "stand", "grow", "cut",
            "teach", "learn", "sell", "give", "hear",
            "keep", "leave", "lose", "make", "pay",
            "send", "sleep", "spend", "tell", "understand",
            "win", "write", "bring", "build", "draw",
            "fight", "find", "hold", "know", "meet"
        ],
        possibleAnswers: [
            ["will run", "will ran", "will running"], ["will eat", "will ate", "will eating"],
            ["will write", "will wrote", "will writing"], ["will swim", "will swam", "will swimming"],
            ["will sing", "will sang", "will singing"], ["will go", "will went", "will going"],
            ["will read", "will readed", "will reading"], ["will see", "will saw", "will seeing"],
            ["will come", "will came", "will coming"], ["will buy", "will bought", "will buying"],
            ["will speak", "will spoke", "will speaking"], ["will think", "will thought", "will thinking"],
            ["will drive", "will drove", "will driving"], ["will drink", "will drank", "will drinking"],
            ["will fly", "will flew", "will flying"], ["will take", "will took", "will taking"],
            ["will forget", "will forgot", "will forgetting"], ["will break", "will broke", "will breaking"],
            ["will choose", "will chose", "will choosing"], ["will begin", "will began", "will beginning"],
            ["will catch", "will catched", "will catching"], ["will fall", "will falled", "will falling"],
            ["will stand", "will standed", "will standing"], ["will grow", "will growed", "will growing"],
            ["will cut", "will cutted", "will cutting"], ["will teach", "will teached", "will teaching"],
            ["will learn", "will learnt", "will learning"], ["will sell", "will selled", "will selling"],
            ["will give", "will gived", "will giving"], ["will hear", "will heared", "will hearing"],
            ["will keep", "will keeped", "will keeping"], ["will leave", "will leaved", "will leaving"],
            ["will lose", "will lossed", "will losing"], ["will make", "will maked", "will making"],
            ["will pay", "will payed", "will paying"], ["will send", "will sended", "will sending"],
            ["will sleep", "will sleeped", "will sleeping"], ["will spend", "will spended", "will spending"],
            ["will tell", "will telled", "will telling"], ["will understand", "will understood", "will understanding"],
            ["will win", "will winned", "will winning"], ["will write", "will writed", "will writing"],
            ["will bring", "will bringed", "will bringing"], ["will build", "will builded", "will building"],
            ["will draw", "will drawed", "will drawing"], ["will fight", "will fighted", "will fighting"],
            ["will find", "will finded", "will finding"], ["will hold", "will holded", "will holding"],
            ["will know", "will knowed", "will knowing"], ["will meet", "will meeted", "will meeting"]
        ],
        correctAnswers: [
            "will run", "will eat", "will write", "will swim", "will sing", 
            "will go", "will read", "will see", "will come", "will buy",
            "will speak", "will think", "will drive", "will drink", "will fly",
            "will take", "will forget", "will break", "will choose", "will begin",
            "will catch", "will fall", "will stand", "will grow", "will cut",
            "will teach", "will learn", "will sell", "will give", "will hear",
            "will keep", "will leave", "will lose", "will make", "will pay",
            "will send", "will sleep", "will spend", "will tell", "will understand",
            "will win", "will write", "will bring", "will build", "will draw",
            "will fight", "will find", "will hold", "will know", "will meet"
        ]
    },
    3: { //Present continuous tense
        words: [
            "run", "eat", "write", "swim", "sing",
            "go", "read", "see", "come", "buy",
            "speak", "think", "drive", "drink", "fly",
            "take", "forget", "break", "choose", "begin",
            "catch", "fall", "stand", "grow", "cut",
            "teach", "learn", "sell", "give", "hear",
            "keep", "leave", "lose", "make", "pay",
            "send", "sleep", "spend", "tell", "understand",
            "win", "write", "bring", "build", "draw",
            "fight", "find", "hold", "know", "meet"
        ],
        possibleAnswers: [
            ["running", "runned", "runs"], ["eating", "eated", "eats"], ["writing", "writed", "writes"],
            ["swimming", "swammed", "swims"], ["singing", "singed", "sings"], ["going", "goed", "goes"],
            ["reading", "readed", "reads"], ["seeing", "seed", "sees"], ["coming", "comed", "comes"],
            ["buying", "buyed", "buys"], ["speaking", "speaked", "speaks"], ["thinking", "thinked", "thinks"],
            ["driving", "drived", "drives"], ["drinking", "drinked", "drinks"], ["flying", "flied", "flies"],
            ["taking", "taked", "takes"], ["forgetting", "forgetted", "forgets"], ["breaking", "breaked", "breaks"],
            ["choosing", "choosed", "chooses"], ["beginning", "begun", "begins"], ["catching", "catched", "catches"],
            ["falling", "falled", "falls"], ["standing", "standed", "stands"], ["growing", "growed", "grows"],
            ["cutting", "cutted", "cuts"], ["teaching", "teached", "teaches"], ["learning", "learnt", "learns"],
            ["selling", "selled", "sells"], ["giving", "gived", "gives"], ["hearing", "heared", "hears"],
            ["keeping", "keeped", "keeps"], ["leaving", "leaved", "leaves"], ["losing", "lossed", "loses"],
            ["making", "maked", "makes"], ["paying", "payed", "pays"], ["sending", "sended", "sends"],
            ["sleeping", "sleeped", "sleeps"], ["spending", "spended", "spends"], ["telling", "telled", "tells"],
            ["understanding", "understanded", "understands"], ["winning", "winned", "wins"], ["writing", "writed", "writes"],
            ["bringing", "bringed", "brings"], ["building", "builded", "builds"], ["drawing", "drawed", "draws"],
            ["fighting", "fighted", "fights"], ["finding", "finded", "finds"], ["holding", "holded", "holds"],
            ["knowing", "knowed", "knows"], ["meeting", "meeted", "meets"]
        ],
        correctAnswers: [
            "running", "eating", "writing", "swimming", "singing",
            "going", "reading", "seeing", "coming", "buying",
            "speaking", "thinking", "driving", "drinking", "flying",
            "taking", "forgetting", "breaking", "choosing", "beginning",
            "catching", "falling", "standing", "growing", "cutting",
            "teaching", "learning", "selling", "giving", "hearing",
            "keeping", "leaving", "losing", "making", "paying",
            "sending", "sleeping", "spending", "telling", "understanding",
            "winning", "writing", "bringing", "building", "drawing",
            "fighting", "finding", "holding", "knowing", "meeting"
        ]
    }
};

let notUpdated = true;

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
    console.log(value);
    const attributeToModify = ["user_point_exercise"];
    let currExercisePoints = 0;
    const userAccount = fetchUserAccount({attribute, value});
    //console.log("account fetched");
    await userAccount.then(function(result) {
        console.log('post:', result);
        currExercisePoints = result.user_point_exercise;
    });
        
    const valueToModify = currExercisePoints + 1;
    const userAccount2 = modifyUserAccount(attributeToModify, valueToModify, attribute, value);

    //console.log("account modified");
    await userAccount2.then(function(result) {
        console.log('put:', result);
        const points = document.getElementById("exercise-points");
        points.innerHTML = `Total Exercise Points: ${valueToModify}`;
    });
    console.log(`Number of points ${valueToModify}`);
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

const build = () => {
    const baseQs = ["What is the past tense of this word: ",
    "What is the future tense of this word: ",
    "What is the present continuous tense of this word: "];

    const unit = parseInt(getUnitfromURL(), 10);
    const exerciseContainer = document.getElementById("exercise");
    const selectedQA = unitQA[unit],
    selectedBaseQ = baseQs[unit-1];

    const shuffledIndices = shuffleArray([...Array(selectedQA.words.length).keys()]).slice(0, 10);

    for(let i = 0; i < shuffledIndices.length; i++) {
        const currIndex = shuffledIndices[i], 
        curr = document.createElement('div'),
        answers = document.createElement('div');

        curr.setAttribute("class", "exercise-question");
        curr.innerHTML = selectedBaseQ + selectedQA.words[currIndex] + "?";
        answers.setAttribute("class", "exercise-answers");

        for(let j = 0; j < selectedQA.possibleAnswers[0].length; j++) {
            let currAns = document.createElement('div');
            let label = document.createElement('label');
            let button = document.createElement('input');
            button.setAttribute("class", "radio-button");
            button.setAttribute("type", "radio");
            button.setAttribute("name", selectedQA.words[currIndex]);
            button.setAttribute("value", selectedQA.possibleAnswers[currIndex][j]);
            label.innerHTML = selectedQA.possibleAnswers[currIndex][j];
            label.setAttribute("class", "answer-label");

            currAns.appendChild(button);
            currAns.appendChild(label);
            answers.appendChild(currAns);
        }

        exerciseContainer.appendChild(curr);
        exerciseContainer.appendChild(answers);
    }

    const title = document.getElementById("title");
    title.innerHTML = `Unit ${unit} Exercise!`;

    const description = document.getElementById("description");
    description.innerHTML = `Welcome to the Unit ${unit} Exercise. Go ahead and get practicing!`;

    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit my answers!";
    submitButton.setAttribute("id", "submit-button");
    submitButton.addEventListener('click', function() {
        checkAnswers(shuffledIndices, selectedQA);
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

function checkAnswers(shuffledIndices, selectedQA) {
    let score = 0;

    shuffledIndices.forEach((index) => {
        const currWord = selectedQA.words[index];
        const correctAns = selectedQA.correctAnswers[index];
        const selectedAns = document.querySelector(`input[name="${currWord}"]:checked`);

        const exerciseQuestions = document.querySelectorAll(".exercise-question");
        let currQuestion = null;

        exerciseQuestions.forEach((q) => {
            if (q.innerHTML.includes(currWord)) {
                currQuestion = q;
            }
        });

        if(currQuestion) {
            const resultExists = currQuestion.querySelector(".result-marker");
            if(resultExists) {
                resultExists.remove();
            }
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

        currQuestion.appendChild(resultMarker);
    });

    const scoreDisplay = document.getElementById("score");
    scoreDisplay.innerHTML = `Unit ${getUnitfromURL()} Exercise - You got ${score} / ${shuffledIndices.length} correct!`;
    //console.log(score);
    //updateExercisePoints();
    if(score >= 7 && notUpdated == true) {
        updateExercisePoints();
        notUpdated = false;
    }
}

build();
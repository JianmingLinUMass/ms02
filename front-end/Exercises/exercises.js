const build = () => {
    const unit1baseQ = "What is the past tense of this word: ",
    unit1Questions = [
        "Cook", "Walk", "Run", "Play", "Help",
    ],
    unit1Answers = [
        "Cooked", "Walked", "Ran", "Played", "Helped",
    ],
    exerciseContainer = document.getElementById("exercise");
    let count = 1;
    for(let i = 0; i < unit1Questions.length; i++) {
        const curr = document.createElement('div');
        const currID = "q" + count;
        curr.setAttribute("class", "exercise-question");
        curr.setAttribute("id", currID);
        let currText = document.createTextNode(unit1Questions[i]);
        //curr.appendChild(currText);
        curr.innerHTML = unit1baseQ + unit1Questions[i];
        //curr.innerText = "Hello";
        exerciseContainer.appendChild(curr);
        count++;
    }
};

build();
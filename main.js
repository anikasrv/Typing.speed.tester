


// Array of words
let words = [
    "Html",
    "Script",
    "JavaScript",
    "Java",
    "CSS",
    "JSON",
    "Object",
    "Python",
    "CSharp",
    "Web",
    "PHP",
    "Laravel",
    "JQuery",
    "Mocha",
    "VueJS",
    "Webkit",
    "Android",
    "PhantomJS",
    "PhantomJS+",
    "Programming",
    "languages",
    "Sass",
];
 let theFullLength =words.length;

// Setting levels
const lvls = {
    "esay": 6,
    "normal": 4,
    "hard": 2,
};

//Defulat level
let defulatLevel = "normal";
let defulatSeconds = lvls[defulatLevel];


// catch selectors

let startBtn = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");


// Setting level name + Seconds + Score
lvlNameSpan.innerHTML = defulatLevel;
secondsSpan.innerHTML = defulatSeconds;
timeLeftSpan.innerHTML = defulatSeconds;
scoreTotal.innerHTML = words.length;

// Display passing in input field
input.onpaste = function () {
    return false;
};

// Start Game
startBtn.onclick = function () {
    this.remove();
    input.focus();

    // Generate word function
    genWords();

};

function genWords() {
    // Get random word
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // Get Word index
    let wordIndex = words.indexOf(randomWord);
    // Remove word From Array
    words.splice(wordIndex, 1);
    // show the random word  in dom
    theWord.innerHTML = randomWord;
    // Empty upcoming words
    upcomingWords.innerHTML = "";
    // Generate Words to dom
    for (let i = 0; i < words.length; i++) {
        // Create div element and add it to upcoming words
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(words[i]));
        upcomingWords.appendChild(div);
    }

    // Call start play function
    startPlay();

}

// function[to generate the time and game]
function startPlay() {
    // reset the time
    timeLeftSpan.innerHTML = defulatSeconds;
    // check if this word the first Word to increese time
    if(words.length===theFullLength-1){
        timeLeftSpan.innerHTML =parseInt(timeLeftSpan.innerHTML) +3;
    }
    let start = setInterval(() => {

        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // Stop timer
            clearInterval(start);
            // Compare words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                // Empty input field
                input.value = '';
                // Increese score
                scoreGot.innerHTML++;
                // check if all words have been added
                if (words.length > 0) {
                    genWords();
                }
                // else the user win
                else {
                    // Create span to tell user("YOU WIN!")
                    let span = document.createElement('span');
                    span.className = "good";
                    span.appendChild(document.createTextNode("YOU WIN!"));
                    finishMessage.appendChild(span);
                    // Storing Date And Score in Local Storage
                    window.localStorage.result="Your Recent Score:"+scoreGot.innerHTML+"\n in:"+Date();
                }


            }
            else {
                // Create span to tell user("Game Over")
                let span = document.createElement('span');
                span.className = "bad";
                span.appendChild(document.createTextNode("Game Over!"));
                finishMessage.appendChild(span);
                 // Storing Date And Score in Local Storage
                 window.localStorage.result="Your Recent Score:"+scoreGot.innerHTML+"\n in:"+Date();
            }
        }
    }, 1000);
}
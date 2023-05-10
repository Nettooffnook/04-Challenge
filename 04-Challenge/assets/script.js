//question data//
//stack overflow helped with how to structure the question variables, got questions and answers from gif in assignment page/ googled answers//
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"], 
        correctAnswerIndex: 2
    },
    {
        question: "The condition in an if / else statement is enclosed within ___.",
        answers: ["1. quotes","2. curly brackets","3. parentheses","4. square brackets"], 
        correctAnswerIndex: 1
    },
    {
        question: "Arrays in JavaScript can be used to store ___.",
        answers: ["1. numbers and strings","2. other arrays","3. booleans","4. all of the above",], 
        correctAnswerIndex: 3
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"], 
        correctAnswerIndex: 2
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is.",
        answers: ["1. JavaScript","2. terminal/bash","3. for loops","4. console.log",], 
        correctAnswerIndex: 1
    }
  ]; 

var startButtonEl = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var time = 60;
var questionsEl = document.getElementById("question");
var startGameTextEl = document.getElementById("start-game-text");
var answerChoicesEl = document.querySelector(".answer-choices");
var questionTextEl = document.getElementById("question-text");
var questionIndex = 0
var endGameTextEl = document.querySelector(".end-game");
var finalScoreEl = document.getElementById("final-score");
var stopTimer = false;
var submitScoreEl = document.getElementById("submit-score");
var highScorePage = document.getElementById("high-score-page");
var scoresEl = document.getElementById("scores");




//timer starts when start button clicked// 
function startGame() {
    timerEl.textContent=time;
    setInterval(countdown, 1000);
    startGameTextEl.setAttribute("class", "hide");
    startButtonEl.setAttribute("class", "hide");
    startQuestions();
}

function countdown() {
    timerEl.textContent=time;
    if (stopTimer) {
        return;
    }
    if (time>0) {
        time--
    };
    if (time === 0) {
        endGame();
    };
    
}

startButtonEl.addEventListener("click", startGame);

//start game//
function startQuestions() {
    questionTextEl.textContent=questions[questionIndex].question;
    var choices = questions[questionIndex].answers;
    while (answerChoicesEl.lastChild) {
        answerChoicesEl.removeChild(answerChoicesEl.lastChild)
    }
    choices.forEach((choice)=>{
        var answerButtonEl = document.createElement("button");
        answerButtonEl.textContent=choice;
        answerChoicesEl.appendChild(answerButtonEl);
        answerButtonEl.addEventListener("click", answerQuestion)
    });
}

//handle answer input//
function answerQuestion(event) {
    var correctAnswer = (event.target.textContent === questions[questionIndex].answers[questions[questionIndex].correctAnswerIndex])
    if (!correctAnswer) {
        time = time - 10;
    }
    questionIndex++;
    if (questionIndex < questions.length) startQuestions();
    else endGame();
}

//end game// 
function endGame() {
    stopTimer = true;
    console.log(stopTimer);
    questionTextEl.setAttribute("class", "hide");
    answerChoicesEl.setAttribute("class", "hide");
    endGameTextEl.classList.remove("hide"); 
    finalScoreEl.textContent=time; 
}

// store high score to local storage w initials// 
submitScoreEl.addEventListener("click", highScores);
function highScores() {
    console.log("clicked!");
    endGameTextEl.classList.add("hide");
    highScorePage.classList.remove("hide");
    var scoreEl = document.createElement("div")
    
    if (time > (localStorage.getItem("high-score"))) {
        localStorage.setItem("high-score", time);
        localStorage.setItem("name", initials.value)
        scoreEl.textContent=initials.value + " : " + time;
        scoresEl.appendChild(scoreEl);
    }
    else {
        scoreEl.textContent=initials.value + " : " + localStorage.getItem("high-score");
        scoresEl.appendChild(scoreEl);
    }
}


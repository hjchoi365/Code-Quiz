var questArray = [
    {
        "questionText": "Commonly used data types that do not include:_____________",
        "opt1" : "1. Booleans",
        "opt2" : "2. Alerts",
        "opt3" : "3. Strings",
        "opt4" : "4. Numbers",
        "correct" : "2. Alerts"
    },
    {
        "questionText": "The condition in an if / else statement is enclosed with __________",
        "opt1" : "1. Paranthesis",
        "opt2" : "2. Sqaure brackets",
        "opt3" : "3. Quotes",
        "opt4" : "4. Curly brackets",
        "correct" : "1. Paranthesis"
    },
    {
        "questionText": "Arrays in Javascript can be used to store _____________",
        "opt1" : "1. other arrays",
        "opt2" : "2. Booleans",
        "opt3" : "3. Numbers and Strings",
        "opt4" : "4. All of the above",
        "correct" : "4. All of the above"
    },
    {
        "questionText": "String values must be enclosed within _____ when being assigned to variable",
        "opt1" : "1. Quotes",
        "opt2" : "2. Commas",
        "opt3" : "3. Parenthesis",
        "opt4" : "4. Curly brackets",
        "correct" : "1. Quotes"
    },
    {
        "questionText": "A useful tool used during development & debugging for printing content to the debugger is",
        "opt1" : "1. For loops",
        "opt2" : "2. Console.log",
        "opt3" : "3. Terminal/bash",
        "opt4" : "4. Javascript",
        "correct" : "4. Console.log"
    }
    ]

var scores = [];

var body = document.body;
var mainpageEl = document.getElementById("main-page");
var startquizEl = document.getElementById("start-quiz");
var questformEl = document.getElementById("quest-form");
var questionsEl = document.getElementById("questions");
var questionEl = document.getElementById("question");
var choice1El = document.getElementById("choice1");
var choice2El = document.getElementById("choice2");
var choice3El = document.getElementById("choice3");
var choice4El = document.getElementById("choice4");
var resultEl = document.getElementById("result");
var verifyEl = document.getElementById("verify");
var subFormEl = document.getElementById("submit-form");
var inputEl = document.getElementById("initial")
var viewscoreEl = document.getElementById("viewscore");
var headerEl = document.getElementById("head");
var loadHighscoresEl = document.createElement("div");
var gobackButtonEl = document.createElement("button");
var clearButtonEl = document.createElement("button");
var olistItemEl;
var clearButtonel;
var correctAns="";

var cnt = 0;

var d = 75;
var myVar = "";
var Hgihscore = 0;

var myTimer = function() {
    d=d-1;
    document.getElementById("timer").innerHTML = d;
    if (d<0 || d === 0) {
        clearInterval(myVar);
    }
};

var showResult = function() {
    clearInterval(myVar);

    if (d<0) {
        document.getElementById("timer").innerHTML = 9;
        Highscore = 0;
    }
    else {
        document.getElementById("timer").innerHTML = d;
        Highscore = d;
    }
    localStorage.setItem("hScore", Highscore);
    questionsEl.parentNode.removeChild(questionsEl);
    body.appendChild(subFormEl);
    body.appendChild(resultEl);
    document.getElementById("fscore").textContent = Highscore;
































}


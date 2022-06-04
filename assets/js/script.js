var questArray = [
    {
        "questionText": "Commonly used data types that do not include:_____________",
        "opt1": "1. Booleans",
        "opt2": "2. Alerts",
        "opt3": "3. Strings",
        "opt4": "4. Numbers",
        "correct": "2. Alerts"
    },
    {
        "questionText": "The condition in an if / else statement is enclosed with __________",
        "opt1": "1. Paranthesis",
        "opt2": "2. Sqaure brackets",
        "opt3": "3. Quotes",
        "opt4": "4. Curly brackets",
        "correct": "1. Paranthesis"
    },
    {
        "questionText": "Arrays in Javascript can be used to store _____________",
        "opt1": "1. other arrays",
        "opt2": "2. Booleans",
        "opt3": "3. Numbers and Strings",
        "opt4": "4. All of the above",
        "correct": "4. All of the above"
    },
    {
        "questionText": "String values must be enclosed within _____ when being assigned to variable",
        "opt1": "1. Quotes",
        "opt2": "2. Commas",
        "opt3": "3. Parenthesis",
        "opt4": "4. Curly brackets",
        "correct": "1. Quotes"
    },
    {
        "questionText": "A useful tool used during development & debugging for printing content to the debugger is",
        "opt1": "1. For loops",
        "opt2": "2. Console.log",
        "opt3": "3. Terminal/bash",
        "opt4": "4. Javascript",
        "correct": "4. Console.log"
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
var clearButtonEl;
var correctAns = "";

var cnt = 0;

var d = 75;
var myVar = "";
var Highscore = 0;

var myTimer = function () {
    d = d - 1;
    document.getElementById("timer").innerHTML = d;
    if (d < 0 || d === 0) {
        clearInterval(myVar);
    }
};

var showResult = function () {
    clearInterval(myVar);

    if (d < 0) {
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
    document.getElementById("final-score").textContent = Highscore;
};

var buttonclick = function (event) {
    var Seletedans = document.getElementById(this.id).innerText;
    if ((cnt < questArray.length && d > 0) || (cnt < questArray.length && d === 0)) {
        if (Seletedans === correctAns) {
            verifyEl.innerText = "Correct!";
        }
        else {
            d = d - 10;
            verifyEl.innerText = "Wrong!";
        }

        cnt = cnt + 1;
        if ((cnt === questArray.length && d > 0) || (d < 0) || (cnt === questArray.length && d === 0)) {
            showResult();
        }
        else {
            loadQuestions();
        }
    }
    else if ((cnt < questArray.length && d < 0)) {
        showResult();
    }
    else if (cnt === questArray.length - 1 && d < 0) {
        showResult();
    }
};

var loadQuestions = function () {
    questionEl.textContent = questArray[cnt].questionText;
    choice1El.textContent = questArray[cnt].opt1;
    choice2El.textContent = questArray[cnt].opt2;
    choice3El.textContent = questArray[cnt].opt3;
    choice4El.textContent = questArray[cnt].opt4;
    correctAns = questArray[cnt].correct;
};

var startQuiz = function (event) {
    document.getElementById("timer").innerHTML = 75;
    myVar = setInterval(myTimer, 1000);
    mainpageEl.parentNode.removeChild(mainpageEl);
    loadQuestions();
    body.appendChild(questionsEl);
    body.appendChild(resultEl);
};

var inputText = function(event) {
    verifyEl.innerText = "";
    if (document.body.contains(resultEl)) {
        resultEl.parentNode.removeChild(resultEl);
    }
};


var loadScores = function () {
    var getScores = localStorage.getItem("scores");

    if (getScores !== null) {
        getScores = JSON.parse(getScores);
        for (var i = 0; i < getScores.length; i++) {
            scores[i] = getScores[i];
        }
    }

};


var submitForm = function (event) {
    event.preventDefault();
    loadScores();
    var nameInitial = inputEl.value;
    var scoreFinal = Highscore;
    var storeLocal = nameInitial + " - " + scoreFinal;
    scores.push(storeLocal);
    localStorage.setItem("scores", JSON.stringify(scores));
    if (document.body.contains(subFormEl)) {

        subFormEl.parentNode.removeChild(subFormEl);
    }
    if (document.body.contains(headerEl)) {
        document.getElementById("timer").innerHTML = 0;
        headerEl.parentNode.removeChild(headerEl);
    }
    if (document.body.contains(resultEl)) {
        verifyEl.innerText = "";
        resultEl.parentNode.removeChild(resultEl);
    }
    cnt = 0;
    clearInterval(myVar);
    myVar = "";
    Highscore = 0;
    d = 75;
    loadHighscores(true);
};


var loadHighscores = function (flag) {
    var getScores = localStorage.getItem("scores");
    if (flag === true) {
        loadHighscoresEl.className = "load-scores";

        loadHighscoresEl.innerHTML = "<h1 class='high'>High Scores</h1>";

        olistItemEl = document.createElement("ol");
        olistItemEl.setAttribute("id", "ollist");
        loadHighscoresEl.appendChild(olistItemEl);

        if (getScores !== null) {

            getScores = JSON.parse(getScores);
            for (var i = 0; i < getScores.length; i++) {
                var listItemEl = document.createElement("li");
                listItemEl.className = "list-item";
                listItemEl.id = "listitems";
                listItemEl.innerText = getScores[i];
                olistItemEl.appendChild(listItemEl);
            }
        }

        gobackButtonEl.textContent = "Go Back";
        gobackButtonEl.className = "btn hscores-gobtn";

  
        clearButtonEl.textContent = "Clear high scores";
        clearButtonEl.className = "btn hscores-clbtn";

        if (getScores === null) {
            clearButtonEl.disabled = true;
        }
        else {
            clearButtonEl.disabled = false;
        }

        loadHighscoresEl.appendChild(gobackButtonEl);
        loadHighscoresEl.appendChild(clearButtonEl);
        body.appendChild(loadHighscoresEl);
    }
    else if ((getScores === null) && flag === false) {
        while (olistItemEl.hasChildNodes()) {
            olistItemEl.removeChild(olistItemEl.firstChild);
        }
    }

};

var viewhscores = function (event) {
    if (document.body.contains(questionsEl)) {
        correctAns = "";
        cnt = 0;
        clearInterval(myVar);
        myVar = "";
        Highscore = 0;
        d = 75;
        document.getElementById("timer").innerHTML = 0;
        questionsEl.parentNode.removeChild(questionsEl);
    }
    else if (document.body.contains(subFormEl)) {
        correctAns = "";
        cnt = 0;
        clearInterval(myVar);
        myVar = "";
        Highscore = 0;
        d = 75;
        document.getElementById("timer").innerHTML = 0;
        subFormEl.parentNode.removeChild(subFormEl);
    }
    else if (document.body.contains(mainpageEl)) {
        mainpageEl.parentNode.removeChild(mainpageEl);
    }
    if (document.body.contains(resultEl)) {
        verifyEl.innerText = "";
        resultEl.parentNode.removeChild(resultEl);
    }
    headerEl.parentNode.removeChild(headerEl);
    loadHighscores(true);
};

var goback = function (event) {
    body.removeChild(loadHighscoresEl);
    body.appendChild(headerEl);
    body.appendChild(mainpageEl);
};


var clearHighsores = function (event) {

    localStorage.clear();
    scores.splice(0, scores.length);
    alert("cleared high scores");
    clearButtonEl.disabled = true;
    loadHighscores(false);
};


questionsEl.parentNode.removeChild(questionsEl);
resultEl.parentNode.removeChild(resultEl);
subFormEl.parentNode.removeChild(subFormEl);
startquizEl.addEventListener("click", startQuiz);
choice1El.addEventListener("click", buttonclick);
choice2El.addEventListener("click", buttonclick);
choice3El.addEventListener("click", buttonclick);
choice4El.addEventListener("click", buttonclick);
subFormEl.addEventListener("keyup", inputText);
subFormEl.addEventListener("submit", submitForm);
viewscoreEl.addEventListener("click", viewhscores);
gobackButtonEl.addEventListener("click", goback);
clearButtonEl.addEventListener("click", clearHighsores);





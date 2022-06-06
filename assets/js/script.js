//defines questions array
var questArray = [
    {
        "questionText": "Commonly used data types that do not include:_____________",
        "cht1": "1. Strings",
        "cht2": "2. Booleans",
        "cht3": "3. Alerts",
        "cht4": "4. Numbers",
        "correct": "3. Alerts"
    },
    {
        "questionText": "The condition in an if / else statement is enclosed with __________",
        "cht1": "1. Quotes",
        "cht2": "2. Curly brackets",
        "cht3": "3. Paranthesis",
        "cht4": "4. Square brackets",
        "correct": "3. Paranthesis"
    },
    {
        "questionText": "Arrays in Javascript can be used to store _____________",
        "cht1": "1. Numbers and Strings",
        "cht2": "2. Other arrays",
        "cht3": "3. Booleans",
        "cht4": "4. All of the above",
        "correct": "4. All of the above"
    },
    {
        "questionText": "String values must be enclosed within _____ when being assigned to variable",
        "cht1": "1. Commas",
        "cht2": "2. Curly brackets",
        "cht3": "3. Quotes",
        "cht4": "4. Parenthesis",
        "correct": "3. Quotes"
    },
    {
        "questionText": "A useful tool used during development & debugging for printing content to the debugger is",
        "cht1": "1. Javascript",
        "cht2": "2. Terminal/bash",
        "cht3": "3. For loops",
        "cht4": "4. Console.log",
        "correct": "4. Console.log"
    }
]
//define scores empty array 
var scores = [];
//identify all the elements in application
var body = document.body;
var mainpageEl = document.getElementById("main-page")
var startquizEl = document.getElementById("start-quiz");
var questformEl = document.getElementById("quest-form");
var questionsEl = document.getElementById("questions")
var questionEl = document.getElementById("question");
var choice1El = document.getElementById("choice1");
var choice2El = document.getElementById("choice2");
var choice3El = document.getElementById("choice3");
var choice4El = document.getElementById("choice4");
var resultEl = document.getElementById("result");
var verifyEl = document.getElementById("verify");
var subFormEl = document.getElementById("submit-form");
var inputEl = document.getElementById("initial");
var viewscoreEl = document.getElementById("viewscore");
var headerEl = document.getElementById("head");
var loadHighscoresEl = document.createElement("div");
var gobackButtonEl = document.createElement("button");
var clearButtonEl = document.createElement("button");
var olistItemEl;
var clearButtonEl;
var correctAns = "";
//counter to keep track of questions
var cnt = 0;
//counter to keep track of time 
var d = 75;
var myVar = "";
var Highscore = 0;

//function to keep track of time
var myTimer = function () {
    d = d - 1;
    document.getElementById("timer").innerHTML = d;
    if (d < 0 || d === 0) {
        clearInterval(myVar);
    }
};

//function to show results once questions over
var showResult = function () {
    clearInterval(myVar);

    if (d < 0) {
        document.getElementById("timer").innerHTML = 0;
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
};

//capture event when answers selected
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

//load questions 
var loadQuestions = function () {
    questionEl.textContent = questArray[cnt].questionText;
    choice1El.textContent = questArray[cnt].cht1;
    choice2El.textContent = questArray[cnt].cht2;
    choice3El.textContent = questArray[cnt].cht3;
    choice4El.textContent = questArray[cnt].cht4;
    correctAns = questArray[cnt].correct;
};

//Start quiz button clicked
var startQuiz = function (event) {
    document.getElementById("timer").innerHTML = 75;
    myVar = setInterval(myTimer, 1000);
    mainpageEl.parentNode.removeChild(mainpageEl);
    loadQuestions();
    body.appendChild(questionsEl);
    body.appendChild(resultEl);
};

//remove the results section on keyup event
var inputText = function (event) {
    verifyEl.innerText = "";
    if (document.body.contains(resultEl)) {
        resultEl.parentNode.removeChild(resultEl);
    }
};

//load scores from local storage
var loadScores = function () {
    var getScores = localStorage.getItem("scores");

    if (getScores !== null) {
        getScores = JSON.parse(getScores);
        for (var i = 0; i < getScores.length; i++) {
            scores[i] = getScores[i];
        }
    }

};

//submit form event with scores and initial
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

//view high scores
var loadHighscores = function (flag) {
    var getScores = localStorage.getItem("scores");
    if (flag === true) {
        loadHighscoresEl.className = "load-scores";

        loadHighscoresEl.innerHTML = "<h1 class='high'>High Scores</h1>";

        olistItemEl = document.createElement("ol");
        olistItemEl.setAttribute("id", "ollist");
        loadHighscoresEl.appendChild(olistItemEl);

        //create a li element and show scores from local storage
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
        // create Go Back button
        gobackButtonEl.textContent = "Go Back";
        gobackButtonEl.className = "btn1 hscores-gobtn";

        //create clear high scores button
        clearButtonEl.textContent = "Clear high scores";
        clearButtonEl.className = "btn1 hscores-clbtn";

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
//On click of View High score link
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

//go back button cliked
var goback = function (event) {
    body.removeChild(loadHighscoresEl);
    body.appendChild(headerEl);
    body.appendChild(mainpageEl);
};

//clear high scores button clicked
var clearHighsores = function (event) {

    localStorage.clear();
    scores.splice(0, scores.length);
    alert("cleared high scores");
    clearButtonEl.disabled = true;
    loadHighscores(false);
};

//event handlers
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
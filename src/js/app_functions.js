/**--------------------------------------------------------------------------------
 * @function updateInterface
 * @param message
 ---------------------------------------------------------------------------------*/

function updateInterface(message = ""){
    player1ScoreDiv.innerHTML = match.players[0].score;
    player2ScoreDiv.innerHTML = match.players[1].score;
    match.atTheOche === match.players[0] ? player1NameDiv.classList.add('bg-active') : player1NameDiv.classList.remove('bg-active');
    match.atTheOche === match.players[1] ? player2NameDiv.classList.add('bg-active') : player2NameDiv.classList.remove('bg-active');
    match.calculateAverages();
    updateFinishButtons();
    turnLogManager();

}


/**--------------------------------------------------------------------------------------
 * @function isMatchOver
 * @returns {boolean}
 ---------------------------------------------------------------------------------------*/

function isMatchOver(){

    updateInterface();
    if(match.players[0].legs === match.legsToWin || match.players[1].legs === match.legsToWin){
        console.log("The Match is Over...");
        console.log(match.players[0].name + ":" + match.players[0].legs + " " + match.players[1].name + ":" + match.players[1].legs);

        var elem = document.getElementById('app-container');
        elem.replaceWith(elem.cloneNode(true));

        return true;
    }
}



function endMatch(){
    let winner = match.players[0].legs > match.players[1].legs ? match.players[0].name : match.players[1].name;
    messageAlert(`${winner} wins!`, `${winner} wins ${match.players[0].legs} legs to ${match.players[1].legs} legs`);
    setTimeout(function(){
        displayDirector(startScreen);
    }   , 3000);
}




/**-------------------------------------------------------------------------------------
 * @function numPadPress - handles the press of the number pad buttons and manages typos
 * @param num
 * @returns {null}
 --------------------------------------------------------------------------------------*/


function numPadPress(num){

    if(num === "ENTER"){                            // if num is "enter"
        let score = parseInt(turnScore.innerHTML);    // get score from turnScore div
        if(validateScore(score)) {                  // if score is valid conduct throw and enter loop
            turnScore.innerHTML = "";               // clear turnScore div
            return null;                            // return null to end function
        }
    }

    let currentValue = turnScore.innerHTML;         // get current value from turnScore div
    let newValue = currentValue + num;              // add num to current value
    if(newValue.length > 3){                        // if new value is greater than 3
        newValue = newValue.substring(0,1);           // set new value to 3 characters
    }

    turnScore.innerHTML = newValue;                 // set turnScore div to new value
}


/**-------------------------------------------------------------------------------------
 * @function validateScore - confirms a score is valid and completes the throw if it is
 * @param score
 * @returns {boolean}
 -------------------------------------------------------------------------------------*/

function validateScore(score){
    console.log("validate score");
    let validate180 = (score <= 180);                                // if score is less than or equal to 180
    let validate0 = (score >= 0);                                   // if score is greater than or equal to 0
    let validateBust = (score <= match.atTheOche.score);            // if score is less than or equal to current player's score
    let validate1 = (match.atTheOche.score - score) != 1;        // if score is not equal to current player's score minus 1

    if(!validate180){messageAlert("Score must be less than 180");}  // if score is not valid, alert user
    if(!validate0){messageAlert("Score must be greater than 0");}
    if(!validateBust){messageAlert("Busted!", "You cannot score more than you have left");}
    if(!validate1){messageAlert("Busted!", "You cannot leave yourself with 1 point. Please enter 0, or re-enter correct score");}

    turnScore.innerText = "";                                       // clear turnScore div
    if( validate180 && validate0 && validateBust && validate1){
        match.throwDarts(score);
        match.calculateAverages();
        setTimeout(function(){
            isMatchOver();
        }, 1000);
        return true;
    }

}



function turnLogManager(){

    p2TurnLog.innerHTML = "";
    p1TurnLog.innerHTML = "";

    let p1Log = document.createElement("div");
    let p2Log = document.createElement("div");


    if(match.players[0].visits.length > 0){
        match.players[0].visits.forEach(function(visit){
            // create new div for turn log
            p1TurnLog.innerHTML = "";
            let p1TurnLogEntry = document.createElement('div');
            p1TurnLogEntry.classList.add('turn');
            p1TurnLogEntry.innerHTML = visit.score;
            p1Log.appendChild(p1TurnLogEntry);
        });
    }

    if(match.players[1].visits.length > 0){
        match.players[1].visits.forEach(function(visit){
            let p2TurnLogEntry = document.createElement('div');
            p2TurnLogEntry.classList.add('turn');
            p2TurnLogEntry.innerHTML = visit.score;
            p2Log.appendChild(p2TurnLogEntry);
        });
    }

    p1TurnLog.appendChild(p1Log);
    p2TurnLog.appendChild(p2Log);

    // const logBtn = document.querySelectorAll('.turn');
    //
    // logBtn.forEach(function(btn) {
    //     btn.addEventListener('click', function(e) {
    //
    //         displayDirector(undoModal);
    //
    //     });
    // });
}


function updateFinishButtons(){

    if(match.atTheOche.score <= 170){
        finishButton1.classList.remove('btn-disabled');
        finishButton2.classList.remove('btn-disabled');
        finishButton3.classList.remove('btn-disabled');
    }else{
        finishButton1.classList.add('btn-disabled');
        finishButton2.classList.add('btn-disabled');
        finishButton3.classList.add('btn-disabled');
    }
}


function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


/**-------------------------------------------------------------------------------------
 * click director function that directs clicks to proper function, and click listener
 -------------------------------------------------------------------------------------*/




function clickDirector(e){

    if(e.target.classList.contains('quick-btn')) {
        let value = parseInt(e.target.innerText);
        validateScore(value);
    }

    else if(e.target.classList.contains('calc-btn')) {
        numPadPress(e.target.innerText);
    }

    else if(e.target.classList.contains('finish-btn')) {
        match.quickFinish(e);
    }

    else if(e.target.classList.contains('enter-btn')) {
        let value = turnScore.innerText;
        (value === "") ? messageAlert("No Score", "Please enter a valid score and press Enter...") : validateScore(value);
    }

    else if(e.target.classList.contains('log')) {
        console.log("log-btn");
    }

    else if(e.target.classList.contains('setup-plus')) {
        setupLegs('plus');
    }

    else if(e.target.classList.contains('setup-minus')) {
        setupLegs('minus');
    }

    else if(e.target.classList.contains('start-match')) {
        startMatch();
    }

    else if(e.target.innerHTML === "EZScore") {
        displayDirector(easyScoreScreen);
    }

    else if(e.target.innerHTML === "UNDO") {
        undoFunction();
    }
}

function undoFunction(){
    console.log("undo");
    match.alternateTurns();
    let undoValue = match.atTheOche.visits.pop();
    match.atTheOche.score += undoValue.score;
    updateInterface();
}


/**-------------------------------------------------------------------------------------
 * displayDirector function hides and displays screens based on input
 * @param {string} active - variable name of section to display on screen
 -------------------------------------------------------------------------------------*/


function displayDirector(active){
    matchSetupScreen.classList.add('hidden');
    appScreen.classList.add('hidden');
    easyScoreScreen.classList.add('hidden');
    messageModal.classList.add('hidden');
    undoModal.classList.add('hidden');
    active.classList.remove('hidden');
}



function setupLegs(click){
    let numLegs = parseInt(setupNumLegs.innerText);
    if(click === 'plus'){numLegs++;}
    else if(click === 'minus' && numLegs > 1){numLegs--;}
    setupNumLegs.innerText = numLegs;
}


function startMatch(){
    let name1 = document.querySelector('#p1_name').value;
    let name2 = document.querySelector('#p2_name').value;

    let raceTo = document.querySelector('#setup-num-legs').innerText;
    match.scoreToWin = 501;

    //set default match parameters
    match.playerA.name = (name1 === "") ? "Player A" : name1;
    match.playerB.name = (name2 === "") ? "Player B" : name2;
    match.legsToWin = (raceTo === "") ? 1 : parseInt(raceTo);

    player1NameDiv.innerHTML = match.players[0].name;
    player2NameDiv.innerHTML = match.players[1].name;

    match.startNewLeg();
    displayDirector(appScreen);
    openFullscreen();
}

function messageAlert(title, message){
    messageTitle.innerText = title;
    messageDescription.innerText = message;
    displayDirector(messageModal);
    setTimeout(function(){
        displayDirector(appScreen);
    }, 3000);
}

function ezSubmit(){
    match.throwDarts(parseInt(ezScoreSubmit.innerText));
    displayDirector(appScreen);
    scoreArray = [];
    document.querySelector('#nm-score1').innerText = "";
    document.querySelector('#nm-score2').innerText = "";
    document.querySelector('#nm-score3').innerText = "";
}

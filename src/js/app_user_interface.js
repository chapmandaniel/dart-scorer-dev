/**
 * create required HTML div variables
 */

const player1NameDiv = document.querySelector('#player1-name');
const player2NameDiv = document.querySelector('#player2-name');
const player1ScoreDiv = document.querySelector('#player1-score');
const player2ScoreDiv = document.querySelector('#player2-score');
const p1legs = document.querySelector('#p1legs');
const p2legs = document.querySelector('#p2legs');
const turnScore = document.querySelector('#turn-score');
const p1TurnLog = document.querySelector('#player1-turn-log');
const p2TurnLog = document.querySelector('#player2-turn-log');
const finishButton1 = document.querySelector('#finish-darts-1');
const finishButton2 = document.querySelector('#finish-darts-2');
const finishButton3 = document.querySelector('#finish-darts-3');

const matchSetupScreen = document.querySelector('#match-setup');
const appScreen = document.querySelector('#app-container');
const easyScoreScreen = document.querySelector('#easy-score-container');

const setupDecreaseLeg = document.querySelector('#btn-decrease-leg');
const setupAddLeg = document.querySelector('#btn-increase-leg');
let setupNumLegs = document.querySelector('#setup-num-legs');

const p1LegAvg = document.querySelector('#p1LegAvg');
const p2LegAvg = document.querySelector('#p2LegAvg');

const messageModal = document.querySelector('#messages-modal');
const messageTitle = document.querySelector('#message-title');
const messageDescription = document.querySelector('#message-description');
const messageButton = document.querySelector('#message-button');


const nmDivContainer = document.querySelector('#nm-full-container');
const nmButton = document.querySelector('#nm-submit');
const nmToggleBtn = document.querySelector('#nm-toggle-btn');
const appBtn = document.querySelectorAll('.app-btn');




/**
 *  Create listener and click function for all app interface buttons
 *  send event target data to clickDirector function
 */


appBtn.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        console.log(e);
        clickDirector(e);
    });
});





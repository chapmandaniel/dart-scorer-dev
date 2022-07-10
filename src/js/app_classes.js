class Player{
    constructor(name){
        this.name = name;
        this.score = null;
        this.legs = 0;
        this.visits = [];
        this.matchLog = [];
        this.legAverage = 0;
        this.matchAverage = 0;
    }

    toString(){
        return this.name;
    }
}

class Visit{
    constructor(score, darts=3){
        this.visitID = match.legVisitID;
        this.score = parseInt(score);
        this.darts = darts;
    }
}

class Match{
    constructor(scoreToWin, legsToWin, name1='PlayerA', name2='PlayerB'){
        this.scoreToWin = scoreToWin; // the amount of points per leg
        this.legsToWin = legsToWin; // the number of legs to win a match
        this.legsPlayed = 0; // the number of legs played
        this.legVisitID = 1; // counter for the ID of the current visit
        this.legVisits = []; // array of visits for the current leg
        this.matchVisits = []; // array containing each array of visits


        this.playerA = new Player(name1);   //two registered players
        this.playerB = new Player(name2);

        this.players = [];      //player 1 and player 2 array for order of turns after coin toss, winner gets [0] and loser gets [1]
        this.coinTossWinner = null;     //the winner of the coin toss to go first
        this.atTheOche = null;        //the player who is at the toe line (oche)

    }

    coinToss(playsFirst){         // set the coin toss winner

        this.players[0] = (playsFirst === this.playerA) ? this.playerA : this.playerB; // set the first player
        this.players[1] = (playsFirst === this.playerA) ? this.playerB : this.playerA; // set the second player
        this.upFirst();
    }


    throwDarts(score, darts=3){  // method that performs a players turn

        if(!isMatchOver()){
            // set timeout to make a delay between each throw
            let visit = new Visit(score, darts); // create a new visit
            // this.atTheOche.score -= score; // subtract the score from the current player
            this.atTheOche.visits.push(visit); // add the visit to the legVisits array
            this.calculatePlayerScore();
            this.alternateTurns(); // alternate turns
            updateInterface(); // update the interface with current data
            this.isLegOver(); // check if the leg is over
        }
    }


    upFirst(){ // method for setting the player who goes first
        let currentGame = this.legsPlayed + 1;
        this.atTheOche = (currentGame % 2) ? this.players[0] : this.players[1]; // if the current game is odd, player 1 goes first, if even, player 2 goes first
    }


    alternateTurns(){ // method for alternating turns
        this.atTheOche = (this.atTheOche === this.players[0]) ? this.players[1] : this.players[0]; // if the current player is player 1, switch to player 2, if not, switch to player 1
    }


    isLegOver(){  // method for checking if a leg is over, and if so, check if the game is over
        let over = false;

        if(this.players[0].score === 0){ // if player 1 has 0 points leg is over
            this.players[0].legs++;
            console.log(this.players[0].name + " wins leg " + this.players[0].legs);
            over = true;
        }

        if(this.players[1].score === 0) { // if player 2 has 0 points leg is over
            this.players[1].legs++;
            console.log(this.players[1].name + " wins leg " + this.players[1].legs);
            over = true;
        }

        if(over){
            this.legsPlayed++; // increment the number of legs played
            this.players[0].matchLog.push(this.players[0].visits.slice()); // add the visits array to the matchLog array
            this.players[1].matchLog.push(this.players[1].visits.slice());
            this.players[0].visits = []; // reset the visits array
            this.players[1].visits = [];
            isMatchOver() ? endMatch() : this.startNewLeg(`Leg over...  \n${this.players[0].name}: ${this.players[0].legs} | ${this.players[1].name}: ${this.players[1].legs}`); // check if the match is over, if true, start a new leg and send score message
        }
    }


    startNewLeg(message = ""){  // method to start a new leg
        this.players.forEach(function(player){player.score = match.scoreToWin});
        this.legVisits = [];
        this.upFirst();  // set the player who goes first
        updateInterface(message);  // update the interface with current data
    }

    calculatePlayerScore(){
        let currentPlayer = this.atTheOche;                  // set the current player
        currentPlayer.score = match.scoreToWin;              // set the current player's score to the original score
        currentPlayer.visits.forEach(function(visit){    // for each visit in the legVisits array subtract the visit's score from the current player's score
            currentPlayer.score -= visit.score;
        });
    }

    calculateAverages() {
        console.log("Calculating averages...");

        for(let i = 0; i < 2; i++){
            match.players[i].legAverage = function(){
                let sum = 0;
                let count = 0;
                match.players[i].visits.forEach(function(visit){
                    sum += visit.score;
                    count += visit.darts;
                });
                return ((sum / count) * 3).toFixed(2);
            }();
        }
        (Number.isNaN(match.playerA.legAverage)) ? console.log(0) : console.log(match.playerA.legAverage) ;
        (Number.isNaN(match.playerB.legAverage)) ? console.log(0) : console.log(match.playerB.legAverage) ;
    }
}
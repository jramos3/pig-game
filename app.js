/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

const btnRoll = document.querySelector(".btn-roll"),
      btnHold = document.querySelector(".btn-hold"),
      btnNew = document.querySelector(".btn-new"),
      diceDOM = document.querySelector('.dice'),
      player0PanelDOM = document.querySelector(".player-0-panel"),
      player1PanelDOM = document.querySelector(".player-1-panel");

init();

function getCurrentScoreDOM() {
  return document.querySelector(`#current-${activePlayer}`);
}

function nextPlayer() {
  const currentScoreDOM = getCurrentScoreDOM()

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  currentScoreDOM.textContent = "0";
  diceDOM.style.display = "none";

  player0PanelDOM.classList.toggle("active");
  player1PanelDOM.classList.toggle("active"); 
}

function init() {
  gamePlaying = true;

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  diceDOM.style.display = "none";

  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  document.querySelector(`#name-0`).textContent = "Player 1";
  document.querySelector(`#name-1`).textContent = "Player 2";

  player0PanelDOM.classList.remove("winner");
  player1PanelDOM.classList.remove("winner");
  player0PanelDOM.classList.add("active");

}

btnRoll.addEventListener("click", function() {

  if(gamePlaying) {
    const currentScoreDOM = getCurrentScoreDOM();

    //Generate a random number between 1 and 6
    const dice = Math.floor(Math.random() * 6) + 1;
  
    //Display the result
    diceDOM.style.display = "block";
    diceDOM.src = `img/dice-${dice}.png`;
  
    //Update the round score if the rolled dice is not 1
    if(dice !== 1) {
      roundScore += dice;
      currentScoreDOM.textContent = roundScore;
    } else {
      nextPlayer()
    }
  }
});

btnHold.addEventListener("click", function() {

  if(gamePlaying) {
    const playerScoreDOM = document.querySelector(`#score-${activePlayer}`);

    //Add round scrore to global score
    scores[activePlayer] += roundScore;
  
    //Update the UI
    playerScoreDOM.textContent = scores[activePlayer];
  
    //Check if the player won the game
    if(scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent = "WINNER!";
  
      diceDOM.style.display = "none";
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
      document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");

      gamePlaying = false;
    } else {
        //Change active player
        nextPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
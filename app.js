// ---------- START SCREEN ----------
const startButton = document.querySelector(".startButton");
const startScreen = document.querySelector(".startScreen");
const gamePlay = document.querySelector(".gamePlay");

startButton.addEventListener('click', function onClick() {
    startScreen.style.display = "none";
    gamePlay.style.display= "block";
});



// ---------- GAME LOGIC ----------
  // Computer selection randomizer
var compChoice;
function randChoice(){
  return Math.floor(Math.random() * 3 + 1);
}

const playerOption = document.querySelectorAll(".playerOption");
let playerScoreNum = 0;
let computerScoreNum = 0;

// triggered when player makes selection
playerOption.forEach((option) => {
  option.addEventListener("click", function () {
    var playerChoice = parseInt(this.id);
    var compChoice = randChoice();
    hideNonChosen(playerChoice);
    displayCompChoice(compChoice);
    choiceCompare(playerChoice, compChoice);
    roundWinnerDisplay();
    updateScore();

    if (gameOver()) {
      playerScoreNum = computerScoreNum = 0;
      gameOverAnnouncement();
    } 
    hideCompChoice();
    reDisplayHidden(playerChoice);
  });
});

// compare player and computer choices
let roundWinner = "";
function choiceCompare(playerChoice, compChoice){
  if (playerChoice === compChoice){
    roundWinner = "tie";
    return;

  } else if (playerChoice === 1){ // player selects rock
    if (compChoice === 2){
      computerScoreNum++;
      roundWinner = "comp";
    } else if (compChoice === 3) {
      playerScoreNum++;
      roundWinner = "player";
    }

  } else if (playerChoice === 2) { // player selects paper
    if (compChoice === 1){
      playerScoreNum++;
      roundWinner = "player";
    } else if (compChoice === 3) {
      computerScoreNum++;
      roundWinner = "comp";
    }

  } else if (playerChoice === 3){ // player selects scissors
    if (compChoice === 1){
      computerScoreNum++;
      roundWinner = "comp";
    } else if (compChoice === 2) {
      playerScoreNum++;
      roundWinner = "player";
    }
    return;
  }
}

// check for winner
let winner = "";
function gameOver() {
  if (playerScoreNum >= 2 || computerScoreNum >= 2) {
    if (playerScoreNum >= 2){
      winner = "YOU WIN!"
    } else {
      winner = "YOU LOSE!";
    }
    playerScoreNum = computerScoreNum = 0;
    setTimeout(function(){
      updateScore();
    }, 5000)
    return true; // true if game is over
  }
  return false; // false if game is not over
}



// ---------- GAME DISPLAY ----------
function gameOverAnnouncement(){
  let gameWinner = document.querySelector(".gameWinner");
  setTimeout(function(){
    gameWinner.innerHTML = winner;
    gameWinner.style.display = "block";
  }, 1000)
  setTimeout(function(){
    gameWinner.style.display = "none";
    startScreen.style.display = "block";
    gamePlay.style.display = "none";
  },5000);
}

const choiceArray = ["", ".rockIconC", ".paperIconC", ".scissorsIconC"]; 
let compChoiceImg;
function displayCompChoice(compChoice) { // display choice after player chooses
  compChoiceImg = document.querySelector(choiceArray[compChoice]);
  compChoiceImg.style.display = "block";
}
function hideCompChoice() {   // hide choice icon after 2 seconds
  setTimeout(function(){
    compChoiceImg.style.display = "none";
  },2000);
}

function hideNonChosen(playerChoice) {
  for (var i = 1; i <= 3; i++){
    let currentIcon = document.getElementById(`${i}`);
    if (i != playerChoice){
      currentIcon.style.display = "none";
    }
  }
  // text under player choices
  let subText = document.querySelector(".playerQuestion");
  subText.style.display = "none";
}
function reDisplayHidden(playerChoice){
 setTimeout(function(){
    for (var i = 1; i <= 3; i++){
      let currentIcon = document.getElementById(`${i}`);
      if (i != playerChoice){
        currentIcon.style.display = "inline";
      }
    }  
    let subText = document.querySelector(".playerQuestion");
    subText.style.display = "block";

    // hiding round result text
    let roundResultText = document.querySelector(".currentRoundWinner");
    roundResultText.style.display = "none";
  },2000);
}

function roundWinnerDisplay(){
  let roundResultText = document.querySelector(".currentRoundWinner");
  if (roundWinner === "tie"){
    roundResultText.innerHTML = "It's a TIE!";
  } else if (roundWinner === "comp"){
    roundResultText.innerHTML = "You LOSE this round.";
  } else if (roundWinner === "player"){
    roundResultText.innerHTML = "You WIN this round!";
  }
  roundResultText.style.display = "block";
  setTimeout(function(){
    roundResultText.style.display = "none";
  }, 2000)
}

  // score board
function updateScore() {
  document.querySelector(".computerScore").innerHTML = computerScoreNum;
  document.querySelector(".playerScore").innerHTML = playerScoreNum;
}
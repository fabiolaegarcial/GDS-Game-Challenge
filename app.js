// start screen
const startButton = document.querySelector(".startButton");
const startScreen = document.querySelector(".startScreen");
const gamePlay = document.querySelector(".gamePlay");

startButton.addEventListener('click', function onClick() {
    startScreen.style.display = "none";
    gamePlay.style.display= "block";
});

// Computer selection randomizer
var compChoice;
function randChoice(){
  return Math.floor(Math.random() * (3 - 1 + 1) + 1);
}

// when played makes selection
const playerOption = document.querySelectorAll(".playerOption");
let playerScoreNum = 0;
let computerScoreNum = 0;

playerOption.forEach((option) => {
  option.addEventListener("click", function () {
    var playerChoice = parseInt(this.id);
    var compChoice = randChoice();
    displayCompChoice(compChoice);

    choiceCompare(playerChoice, compChoice);
    updateScore();

    setTimeout(function(){
      hideChoice();
    },1000);

    if (gameOver()) {
      playerScoreNum = computerScoreNum = 0;
      updateScore();
    }
  });
});


// display choice after player chooses
const choiceArray = ["", ".rockIconC", ".paperIconC", ".scissorsIconC"]; //leave index 0 empty for ease of access
var compChoiceImg;
function displayCompChoice(compChoice) {
  compChoiceImg = document.querySelector(choiceArray[compChoice]);
  compChoiceImg.style.display = "block";
}
function hideChoice() {
  compChoiceImg.style.display = "none";
}


// Player choices
function choiceCompare(playerChoice, compChoice){
  if (playerChoice === compChoice){
    return;

  } else if (playerChoice === 1){ // player selects rock
    if (compChoice === 2){
      computerScoreNum++;
    } else if (compChoice === 3) {
      playerScoreNum++;
    }

  } else if (playerChoice === 2) { // player selects paper
    if (compChoice === 1){
      playerScoreNum++;
    } else if (compChoice === 3) {
      computerScoreNum++;
    }

  } else if (playerChoice === 3){ // player selects scissors
    if (compChoice === 1){
      computerScoreNum++;
    } else if (compChoice === 2) {
      playerScoreNum++;
    }
    return;
  }
}

// score board
function updateScore() {
  document.querySelector(".computerScore").innerHTML = computerScoreNum;
  document.querySelector(".playerScore").innerHTML = playerScoreNum;
}

// check for winner
function gameOver() {
  if (playerScoreNum === 2 || computerScoreNum === 2) {
    if (playerScoreNum === 2){
      console.log("You Win!")
    } else {
      console.log("You Lose!")
    }
    return true;
  }
  return false;
}
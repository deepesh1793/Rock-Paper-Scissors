const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win!';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  }

  if (result === 'You win!') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  updateResultElement(result);
  updateMoveElement(playerMove, computerMove);

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}

function updateResultElement(result) {
  document.querySelector('.js-result').innerHTML = result;
}

function updateMoveElement(playerMove, computerMove) {
  document.querySelector('.js-move').innerHTML = `You <img class="move-icon" src="icons/${playerMove}-emoji.png">
    <img class="move-icon" src="icons/${computerMove}-emoji.png"> Computer`;
}

function pickComputerMove() {
  const randomNumer = Math.random();
  let computerMove = '';

  if (randomNumer >= 0 && randomNumer < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumer >= 1 / 3 && randomNumer < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumer >= 2 / 3 && randomNumer < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

function resetElement() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}
'use strict';

let message = document.querySelector('.message');
let number = document.querySelector('.number');
let score = document.querySelector('.score');
let hScore = document.querySelector('.highscore');
// let again = document.querySelector('.again');
let hGuess = document.querySelector('.guess');

// Create a random number between 1 and 20 for player to guess
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// console.log(secretNumber);
// number.textContent = secretNumber;

// Set initial score state
let currentScore = 5;
score.textContent = currentScore;
let highScore = 3;
hScore.textContent = highScore;

// console.log(score.textContent, typeof score.text);
// console.log(secretNumber);
document.querySelector('.again').addEventListener('click', function () {
  currentScore = 5;
  score.textContent = currentScore;
  hGuess.value = '';
  number.textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  message.textContent = 'Start guessing...';
  console.log(secretNumber);
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // console.log(guess);
  if (currentScore > 1) {
    if (!guess) {
      message.textContent = 'Not a valid guess...';
    } else if (guess == secretNumber) {
      message.textContent = 'You guessed it! 🤗';
      number.textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      if (currentScore > highScore) {
        hScore.textContent = currentScore;
      }
    } else if (guess != secretNumber) {
      message.textContent =
        guess > secretNumber ? 'Too high! 👻' : 'Too low! 👻';
      // if (guess > secretNumber) {
      //   message.textContent = 'Too high! 👻';
      // } else if (guess < secretNumber) {
      //   message.textContent = 'Too low! 👻';
      // }
      currentScore--;
    }

    score.textContent = currentScore;
  } else {
    message.textContent = "Go home Rudy, you're drunk...";
    score.textContent = 0;
  }
});

'use strict';
// SELECT ELEMENTS
// players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// dice
const diceEl = document.querySelector('.dice');
// buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// score elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Game state tracking variables
let scores, currentScore, activePlayer, playing;
// FUNCTIONALITY
// Starting Contitions
const init = function () {
  // Initial game state values
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // reset the visible parts of the game
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // reset to starting display styles
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  // switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle active player styles
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// click roll button
btnRoll.addEventListener('click', function () {
  // 0) Functional if the game hasn't ended
  if (playing) {
    // 1) Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2) Display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // 3) Check for rolled
    if (dice !== 1) {
      // add dice value to current score
      currentScore += dice;
      // current0El.textContent = currentScore;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to player's score in score array
    scores[activePlayer] += currentScore;
    // update player's score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if over 100
    if (scores[activePlayer] >= 100) {
      // console.log('winna!');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // if not switch active player turn
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

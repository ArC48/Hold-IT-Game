'use strict';

// getting names
const firstPlayerName = prompt('Enter 1st Player\'s name:') || 'Player 1';
const secondPlayerName = prompt('Enter 2nd Player\'s name:') || 'Player 2';


// Selecting Elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const player0Name = document.querySelector('.name0').textContent = firstPlayerName;
const player1Name = document.querySelector('.name1').textContent = secondPlayerName;

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceImageElement = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

// Data Variables

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;


//  Starting Conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceImageElement.classList.add('hide');

const switchPlayers = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer? 0 : 1;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

const hideElementsWhenWinning = () => {
    document.querySelector(`.hideFirstCurrent`).classList.toggle('hide');
    document.querySelector(`.hideSecondCurrent`).classList.toggle('hide');
    diceImageElement.classList.add('hide');
    buttonRoll.classList.add('hide');
    buttonHold.classList.add('hide');
}

const showElementsWhenRestart = () => {
    document.querySelector(`.hideFirstCurrent`).classList.remove('hide');
    document.querySelector(`.hideSecondCurrent`).classList.remove('hide');
    diceImageElement.classList.add('hide');
    buttonRoll.classList.remove('hide');
    buttonHold.classList.remove('hide');
}

//  Rolling Dice Functionality

buttonRoll.addEventListener('click', function () {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceImageElement.classList.remove('hide');
    diceImageElement.src = `images/dice-${dice}.png`;

    // 3. Checked for rolled value === 1, switch to next player

    if (dice !== 1) {
        // add dice to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayers();
        currentScore = 0;
    }
    // document.getElementById(`current--${activePlayer}`).class = currentScore;
});

buttonHold.addEventListener('click', function () {
    // 1. add current score to active player's main score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = 
        scores[activePlayer];

    // 2. check if player's score is >= 100 & Finish the game
    if(scores[activePlayer] >= 100) {
        //Finish the game
        hideElementsWhenWinning();
        
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

        document.querySelector(`.resultPlayer--${activePlayer}`).textContent = 'Winner'

        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer? 0 : 1}`).classList.add('player--loser');
    } else {
        // 3. switch to the next player
        switchPlayers();
    };
});

buttonNew.addEventListener('click', function () {

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.resultPlayer--${activePlayer}`).textContent = '';

    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--${activePlayer? 0 : 1}`).classList.remove('player--loser');

    //  Starting Conditions

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;

    player1Element.classList.remove('player--active');

    score0Element.textContent = 0;
    score1Element.textContent = 0;

    showElementsWhenRestart();
});
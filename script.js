// Gameboard Module
let Gameboard = (function () {
  let gameBoard = new Array(9).fill('');

  let getBoard = () => gameBoard;

  let resetBoard = () => {
    gameBoard.fill('');
  };

  let placeMark = (cell, mark) => {
    if (gameBoard[cell] === '') {
      gameBoard[cell] = mark;
      return true;
    }
    return false;
  };

  return {
    getBoard,
    resetBoard,
    placeMark,
  };
})();

// Player Factory
let Players = function (name, symbol) {
  return {
    name,
    symbol,
  };
};

// GameController Module
let GameController = (function () {
  let playerOne;
  let playerTwo;
  let currentPlayer;
  let gameStatus = 'inactive';

  let startGame = (playerOneName, playerTwoName) => {
    playerOne = Players(playerOneName, 'X');
    playerTwo = Players(playerTwoName, 'O');
    currentPlayer = playerOne;
    Gameboard.resetBoard();
    currentPlayer = playerOne;
    gameStatus = 'active';
  };

  let switchTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  let makeMove = (cell) => {
    let winner = document.querySelector('.winnerplayer');
    if (gameStatus === 'active' && Gameboard.placeMark(cell, currentPlayer.symbol)) {
      if (checkWin()) {
        gameStatus = 'won';
        winner.textContent = `The Winner is ${currentPlayer.name}`;
      } else if (checkDraw()) {
        gameStatus = 'draw';
        winner.textContent = `The Match is drawn`;
      } else {
        switchTurn();
      }
    }
  };

  let checkWin = () => {
    let board = Gameboard.getBoard();
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      let [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  let checkDraw = () => {
    let board = Gameboard.getBoard();
    return board.every((cell) => cell !== '');
  };
  

  return {
    startGame,
    makeMove,
    getCurrentPlayer: () => currentPlayer,
    getStatus: () => gameStatus,
  };
})();

// DOM Manipulation Module
let DOM = (function () {
  // Selecting buttons and other necessary elements
  let btns = document.querySelectorAll('.gameboard-container button');
  let startBtn = document.querySelector('.startBtn');
  let restartBtn = document.querySelector('.restartBtn');
  let submitBtn = document.querySelector('.submitBtn');
  let playerOneNamesDisplay = document.querySelector('.playerOnepara');
  let playerTwoNamesDisplay = document.querySelector('.playerTwopara');
 


  // Create a single instance of domActions
  let actions = domActions();

  // Add event listeners to the game board buttons
  btns.forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
      actions.playRound(event, index);
    });
  });

  // Add event listeners to the start and restart buttons and submit btn
  startBtn.addEventListener('click', actions.startGame);
  restartBtn.addEventListener('click', actions.startGame);
  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let playerOneName = document.getElementById('playerOne').value;
    let playerTwoName = document.getElementById('playerTwo').value;
    playerOneNamesDisplay.textContent = playerOneName;
    playerTwoNamesDisplay.textContent= playerTwoName;
    actions.startGame(playerOneName, playerTwoName);
  });

  // Function to update the game board UI
  let updateBoard = () => {
    let board = Gameboard.getBoard();
    btns.forEach((btn, index) => {
      btn.textContent = board[index];
    });
  };


  // Return updateBoard so it can be used in domActions
  return {
    updateBoard,
  };
})();

// Factory function for DOM actions
function domActions() {
  // Create an instance of the game controller
  let round = GameController;

  // Function to start the game
  let startGame = (playerOneName, playerTwoName) => {
    round.startGame(playerOneName, playerTwoName);
    DOM.updateBoard();
  };

  // Function to handle a player's move
  let playRound = (event, index) => {
    if (round.getStatus() === 'active') {
      round.makeMove(index);
      DOM.updateBoard();
    }
  };

  // Return the functions to be used as event handlers
  return {
    startGame,
    playRound,
  };
}

// Initialize the game by calling startGame once
document.addEventListener('DOMContentLoaded', () => {
  domActions().startGame();
});

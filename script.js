let Gameboard = (
  function () {
    let gameBoard = new Array(9).fill('');

    let getBoard = () => gameBoard;

    let resetBoard = () => {
      for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i] = '';
      }
    };

    let placeMark = (cell, mark) => {
      if (gameBoard[cell] === '') {
        gameBoard[cell] = mark;
        return true
      }
      return false
    };

    return {
      getBoard,
      resetBoard,
      placeMark,
    }
  }
)();

let Players = function (name, symbol) {
  return {
    name,
    symbol
  }
};

let GameController = function () {
  let playerOne = Players('shahid', 'X');
  let playerTwo = Players('Khan', 'O');
  let currentPlayer = playerOne;
  let gameStatus = '';

  let startGame = () => {
    Gameboard.resetBoard();
    currentPlayer = playerOne;
    gameStatus = 'active';
  }

  let switchTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  let makeMove = (cell) => {
    if (gameStatus === 'active' && Gameboard.placeMark(cell, currentPlayer.symbol)) {
      if (checkWin()) {
        gameStatus = 'won';
        console.log(`${currentPlayer.name} has won`);
      } else if (checkDraw()) {
        gameStatus = 'draw';
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
      [2, 4, 6]
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
    return board.every(cell => cell !== '')
  };

  return {
    startGame,
    switchTurn,
    makeMove,
    checkWin,
    checkDraw,
    getCurrentPlayer: () => currentPlayer,
    getStatus: () => gameStatus,
  }
};

// Create a single instance of GameController
let round1 = GameController();

// Start the game
round1.startGame();

// Make a move and check the board
round1.makeMove(5);
round1.makeMove(0);
round1.makeMove(6);
round1.makeMove(1);
round1.makeMove(7);
round1.makeMove(2);
console.log();
console.log(Gameboard.getBoard());
console.log(round1.getCurrentPlayer());


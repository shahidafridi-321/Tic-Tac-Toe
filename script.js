let Gameboard = (
  function(){
    let board = new Array(9);
    let getbaord = ()=>board;
    return{getbaord};
  }
)();

function Player(name,symbol){
  let getPlayeName = () => name;
  let getPlayerSymbol = () => symbol;
  return {
    getPlayeName,
    getPlayerSymbol
  }
}

function GameController(){
  let playerOne = Player('Shahid','X');
  let playerTwo = Player('khan','O');
  let currentPlayer = playerOne;
  let gameStatus = 'active';
}
//Function to load the main game.
const gameTabHTML = document.querySelector(".game__tab");
const gameTurn = document.querySelector("#turn");
const gameRows = document.querySelectorAll(".game-row");
const gameWinner = document.querySelector(".game__winner");
const restartGameButton = document.querySelector(".reset__game");
const tabControllers = document.querySelector("#games__counter");

restartGameButton.addEventListener("click", restartGame);

let op = 'X';
let player1 = '';
let player2 = '';
let turn = '';
let putValid = false;
let cellsNotEmpty = 0;
let xWins = 0;
let oWins = 0;
let draws = 0;

let gameTabMat = [
   ['', '', ''],
   ['', '', ''],
   ['', '', '']
];


gameTabHTML.addEventListener("click", putOp);

function loadGame (player1Op, player2Op) {
   nextScreen();

   player1 = player1Op;
   player2 = player2Op;
   
   turn = (player1 === 'X' ? "player1" : "player2");

   if (gameMode === "computer" && turn === "player2") putComputerOp (player2);
   else putValid = true;
}

function putOp (e) {
   cell = e.target;

   if (cell.classList.contains("game-cell") && putValid && cell.innerText === '') {
      gameTurn.querySelector(".highlight").innerText = op;
      op = (turn === "player1" ? player1 : player2);
      cell.innerText = op;
      cell.classList.add((op === player1 ? null : "white"));

      cellsNotEmpty++;

      gameTabMat[cell.parentElement.getAttribute("data-row")][cell.getAttribute("data-column")] = op;

      console.log(gameTabMat);

      setWinner();

      if (gameMode === "player") turn = (turn === "player1" ? "player2" : "player1");
      else {
         putValid = false;
         putComputerOp(player2);
         cellsNotEmpty++;
      }
   } 

}

function putComputerOp (op) {
   gameTurn.querySelector(".highlight").innerText = op;
   if (cellsNotEmpty < 9) {
      const row = Math.floor(Math.random() * (3 - 0) + 0);
      const col = Math.floor(Math.random() * (3 - 0) + 0);
      
      
      if (gameRows[row].children[col].innerText === '') {
         setTimeout(() => {
            gameRows[row].children[col].innerText = op;
            gameRows[row].children[col].classList.add("white");
            
            putValid = true;

            turn = "player1";

            gameTabMat[row][col] = op;

            gameTurn.querySelector(".highlight").innerText = player1;

            setWinner();
         }, 500)
      } else putComputerOp(op);
   }
}

function setWinner () {
   const winnerTitle = gameWinner.querySelector(".winner__title");
   const winnerOp = winnerTitle.querySelector(".winner__operator");
   const counter = gameWinner.querySelector(".counter");
   
   let c = 3;
   
   if (setHorizontal() || setVertical() || setDiagonal()){
      const addWin = tabControllers.querySelector(`.player-${op}`).querySelector(".counter");

      winnerOp.innerText = op;
      gameWinner.classList.remove("noshow");
      counter.innerText = c;
      putValid = false;

      xWins += (op === 'X' ? 1 : 0);
      oWins += (op === 'O' ? 1 : 0);

      addWin.innerText = (op === 'X' ? xWins : oWins);
      
      let intervalId = setInterval(() => {
         c--;
         counter.innerText = c;

         if (c === 0) {
            restartGame();
            clearInterval(intervalId);
            gameWinner.classList.add("noshow");
         }
      }, 1000)
   }
   else if (cellsNotEmpty === 9) {
      const addDraw = tabControllers.querySelector(".draws").querySelector(".counter");

      winnerTitle.innerText = "Draw";
      gameWinner.classList.remove("noshow");
      counter.innerText = c;
      putValid = false;

      draws++;

      addDraw.innerText = draws;

      let intervalId = setInterval(() => {
         c--;
         counter.innerText = c;

         if (c === 0) {
            restartGame();
            clearInterval(intervalId);
            gameWinner.classList.add("noshow");
         }
      }, 1000)
   }
}

function setHorizontal () {
   let count = 0;
   gameTabMat.forEach(row => {
      if (count === 3) return;

      const op = row[0];
      count = 0;

      row.forEach(e => {
         if (e === op && e !== '') count++;;
      });
   });

   return count === 3;
}

function setVertical () {
   let count = 0;
   
   for (let i = 0; i < 3; i++) {
      if (count === 3) return true;

      const op = gameTabMat[0][i];
      count = 0;
      
      for (let j = 0; j < 3; j++) {
         if (gameTabMat[j][i] === op && gameTabMat[j][i] !== '') count++;
      }
   }

   return count === 3;
}

function setDiagonal () {
   const op1 = gameTabMat[0][0];
   const op2 = gameTabMat[0][2];

   let count = 0;

   for (let i = 0; i < 3; i++) {
      if ((gameTabMat[i][i] === op1 && gameTabMat[i][i] !== '') || (gameTabMat[i][2-i] === op2 && gameTabMat[i][2-i] !== '')) count++;
      else count = 0;
      if (count === 3) return true;
   }

   return false;
}

function restartGame () {
   for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         gameRows[i].children[j].innerText = null;
         gameRows[i].children[j].classList.remove('white');
         gameTabMat[i][j] = '';
      }
   }

   cellsNotEmpty = 0;
   turn = "player1";
   gameTurn.querySelectorAll(".highlight").innerText = player1;
   putValid = true;
}
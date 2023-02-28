//Variables declaration.
const playWithFriendButton = document.querySelector(".play__with__friend")
const playWithComputerButton = document.querySelector(".play__with__computer")
// const showRulesButton = document.querySelector(".rules");
const selectControllsButtons = document.querySelector(".select__control");
const selectPlayer1 = document.querySelector("#select-player1");
const selectPlayer2 = document.querySelector("#select-player2");
const confirmButton = document.querySelector(".select__confirm");

let gameMode = "";
let currentScreen = document.querySelector(".current");


//Adding event listeners.
eventListeners();

//Functions.
//Function to add event listeners.
function eventListeners() {
   playWithFriendButton.addEventListener("click", loadFriend);
   playWithComputerButton.addEventListener("click", loadComputer);
   // showRulesButton.addEventListener("click", showRules);
   selectControllsButtons.addEventListener("click", selectControlls);
   confirmButton.addEventListener("click", () => {loadGame(selectPlayer1.innerText, selectPlayer2.innerText)});
}

//Function to start the game with a friend.
function loadFriend(){
   nextScreen();
   gameMode = "player";
}

//Function to start the game with the computer.
function loadComputer(){
   nextScreen();
   gameMode = "computer";
}

//Function to show the rules.
function showRules(){
   console.log("Show rules...");
}

//Function to change the screen.
function nextScreen(){
   currentScreen.classList.remove("current");
   currentScreen.classList.add("fade-out");
   setTimeout(() => {
      currentScreen.classList.add("noshow");
      currentScreen.nextElementSibling.classList.add("current");

      currentScreen.nextElementSibling.classList.remove("noshow");
      currentScreen.classList.remove("fade-out");
   
      currentScreen = document.querySelector(".current");
      currentScreen.classList.add("fade-in");

      setTimeout(() => currentScreen.classList.remove("fade-in"), 250);
   }, 250)

}

//Function to select the controlls.
function selectControlls(e) {
   const control = e.target;

   if (control.classList.contains("select__option")) {
      if (control.nextElementSibling) control.nextElementSibling.classList.remove("active");
      else if (control.previousElementSibling) control.previousElementSibling.classList.remove("active");

      control.classList.add("active");
      confirmButton.classList.remove("noshow");

      const controlSelected = control.getAttribute("data-control");
      selectPlayer1.innerText = controlSelected;
      selectPlayer2.innerText = (controlSelected === "X" ? "O" : "X");
   }
}
const cells = document.querySelectorAll('.grid div');
const message = document.querySelector(".message");
const startButton = document.querySelector(".btn-start");

let started = false;
let nextPlayer;
let state;

const winningState = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function isGameOver() {
    //check if player has won

    for (let i = 0; i < winningState.length; i++) {

        const x = winningState[i][0];
        const y = winningState[i][1];
        const z = winningState[i][2];

        if (state[x] !== "" && state[x] === state[y] && state[y] === state[z]) {
            message.textContent = nextPlayer + " has WON!!!"
            return true;
        }
    }

    //check if game has not drawn

    for (let i = 0; i < state.length; i++) {
        if (state[i] === ""){
            return false;
        }
    }
    //check if game has drawn

    message.textContent = "Game DRAW!!!"
    return true;
}

function displayNextPlayer() {

    message.textContent = "Next turn: Player " + nextPlayer;

}

function onCellClick(index) {
    if (started === false) {
        alert(`Sorry, the game is not started yet, click start button to start the game.`);
        return;
    }
    if (state[index] !== "") {
        alert(`Cell is already taken`);
        return;
    }
    state[index] = nextPlayer;
    cells[index].textContent = nextPlayer;
    
    if (isGameOver()) {
        return;
        
    }

    changePlayer();
    displayNextPlayer();
   
}

function changePlayer() {
    if (nextPlayer == "X") {
        nextPlayer = "O";
    } else
        nextPlayer = "X";
}
function clearCell() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
    }
}
function startGame() {
    started = true;

    nextPlayer = "X";

    state = ["", "", "",
        "", "", "",
        "", "", ""]
    clearCell();
    displayNextPlayer();
};

console.log(cells);

startButton.addEventListener('click', startGame);

cells.forEach(function (cell, index) {
    cell.addEventListener("click", function () {
        onCellClick(index);
    });
}
);
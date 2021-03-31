let bodyElem = document.querySelector("body");
let cellClass = bodyElem.getElementsByClassName("cell");
let gameStatus = document.querySelector(".game--status");
let Btn = bodyElem.querySelector(".game--restart");
gameStatus.innerHTML = "It's X's turn";

let gameOver = false;
let XTurn = true;
let gameValues = ["","","","","","","","",""];

for(let i = 0; i < 9;i++){
    cellClass[i].onclick = function (){
        if(XTurn === true && gameOver === false){
            if(cellClass[i].innerHTML === ""){
                cellClass[i].innerHTML = "X";
                gameValues[i] = "X";
                XTurn = false;
                gameStatus.innerHTML = "It's O's turn";
                checkWinner();
                if(checkAllCellIsFull() === true){
                    gameStatus.innerHTML = "Game ended in a draw";
                    gameOver = false;
                }
            }
        }
        else if(XTurn === false && gameOver === false){
            if(cellClass[i].innerHTML === ""){
                cellClass[i].innerHTML = "O";
                gameValues[i] = "O";
                XTurn = true;
                gameStatus.innerHTML = "It's X's turn";
                checkWinner();
                if(checkAllCellIsFull() === true){
                    gameStatus.innerHTML = "Game ended in a draw";
                    gameOver = false;
                }
            }
        }
    }
}


Btn.addEventListener("click",() => {
    for(let i = 0; i < 9; i++){
        gameValues[i] = "";
        cellClass[i].innerHTML = "";
    }
    gameStatus.innerHTML = "It's X's turn";
    gameOver = false;
    XTurn = true;
});

function checkWinner(){
    for(let i = 0; i < 3; i++){
        if(gameValues[i] === gameValues[i + 3] && gameValues[i + 3] === gameValues[i + 6] && gameValues[i + 6] === gameValues[i] && gameValues[i] !== "" && gameValues[i + 3] !== "" && gameValues[i + 6] !== "") {
            gameOver = true;
            gameStatus.innerHTML = "Player " + cellClass[i].innerHTML + " has won";
            return;
        }
    }
    for(let i = 0 ; i < 7; i += 3){
        if(gameValues[i] === gameValues[i + 1] && gameValues[i + 1] === gameValues[i + 2] && gameValues[i + 2] === gameValues[i] && gameValues[i] !== "" && gameValues[i + 1] !== "" && gameValues[i + 2] !== ""){
            gameOver = true;
            gameStatus.innerHTML = "Player " + cellClass[i].innerHTML + " has won";
            return;
        }
    }
    if(gameValues[0] === gameValues[4] && gameValues[4] === gameValues[8] && gameValues[8] === gameValues[0] && gameValues[0] !== "" && gameValues[4] !== "" && gameValues[8] !== ""){
        gameOver = true;
        gameStatus.innerHTML = "Player " + cellClass[0].innerHTML + " has won";
        return;
    }
    if(gameValues[2] === gameValues[4] && gameValues[4] === gameValues[6] && gameValues[6] === gameValues[2] && gameValues[2] !== "" && gameValues[4] !== "" && gameValues[6] !== ""){
        gameOver = true;
        gameStatus.innerHTML = "Player " + cellClass[2].innerHTML + " has won";
    }

}

function checkAllCellIsFull(){
    for(let i = 0; i < 9;i++){
        if(gameValues[i] === ""){
            return false;
        }
    }
    return true;
}



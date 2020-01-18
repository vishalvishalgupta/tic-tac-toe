const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn;
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const cellElems = document.querySelectorAll('[data-cell]')
const boardElem = document.getElementById('board'); 
const winningMsgElem = document.getElementById('winningMessage'); 
const restartButton =  document.getElementById('restartButton');
const winningMsgTextElem = document.querySelector('[data-winning-message-text]'); 

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    cellElems.forEach(cell=> {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true });
    })
    setBoardHoverClass();
    winningMsgElem.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass =  circleTurn? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    // check for win
    if(checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
    // check for draw
}

function isDraw() {
    return [...cellElems].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(isDraw) {
    if(isDraw) {
        winningMsgTextElem.innerText =  `Draw!`
    } else {
        winningMsgTextElem.innerText =  `${circleTurn? "O's" : "X's"} Wins!`
    }
    winningMsgElem.classList.add('show');
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;   
}

function setBoardHoverClass() {
    boardElem.classList.remove(X_CLASS);
    boardElem.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        boardElem.classList.add(CIRCLE_CLASS);
    } else {
        boardElem.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index =>{
            return cellElems[index].classList.contains(currentClass);
        })
    })
}
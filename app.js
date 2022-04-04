// selects all of the div squares
let squares = document.querySelectorAll('.square');
// Places them all in an array
squares = Array.from(squares);
let numTurns = 0
let currentPlayer = 'X'
let start = document.querySelector('.startButton')
let reset = document.querySelector('.resetButton')
let grid = document.querySelector('.gamegrid')
let msg = document.querySelector('.alert')
let winmsg = document.querySelector('.winner')
let xSpan = document.querySelector('.xScore')
let oSpan = document.querySelector('.oScore')
let gamescore = document.querySelector('.scoreboard')
msg.innerHTML = `It is X's turn`;
let xScore = 0;
let oScore = 0;
//sets a win variable to false 
let win = false;
//starts the game of tictactoe
start.addEventListener('click', () => {
    squares.forEach(square => {
        grid.classList.remove('hidden');
        start.classList.add('nodisplay');
        msg.classList.remove('hidden');
        gamescore.classList.remove('hidden');
        square.classList.remove('nodisplay');
    })
})
//resets the game board
reset.addEventListener('click', () => {
    squares.forEach(square => {
        square.innerHTML = '';
        square.classList.remove('highlight')
        msg.innerHTML = `It is X's turn`;
        win = false;
        winmsg.classList.add('nodisplay')
        numTurns = 0;
        currentPlayer = 'X'
    })
})
//an array of all possible winning combos
let winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// checks if any of the winning combos have been met
function checkForWinner(){
    winCombo.forEach(function(combo){
        let check = combo.every(index => squares[index].innerText == currentPlayer)
        if(check){
            
            winmsg.classList.remove('nodisplay')
            winmsg.innerHTML = `${currentPlayer} is the winner!`
            winningSquares(combo);
            win = true;  
            if(currentPlayer == 'X'){
                xScore++;
            xSpan.innerHTML = `X WINS: ${xScore}`
            }else if(currentPlayer == 'O'){
                oScore++;
                oSpan.innerHTML = `O WINS: ${oScore}`
            }
        }
    })
}


//Highlights the winning squares 
function winningSquares(combo){
    combo.forEach(function(index){
        squares[index].classList.add('highlight')
    })
}
//when an individual square is clicked currentPlayer's value appears alternating between X and O. If square has already been clicked it cant be clicked again. Also if win = true game can not continue;
squares.forEach(function(square){
    square.addEventListener('click', function(){
        if(win) return;
        if(square.innerHTML != '') return;
        square.innerHTML = currentPlayer;
        numTurns++;
        if(numTurns >= squares.length){
            winmsg.classList.remove('nodisplay')
            winmsg.innerHTML = `It's a Draw!`
        }
        checkForWinner();
        if(currentPlayer === 'X'){
            currentPlayer = 'O';
            msg.innerHTML = `It is ${currentPlayer}'s turn`;
        }else if(currentPlayer === 'O'){
            currentPlayer = 'X';
            msg.innerHTML = `It is ${currentPlayer}'s turn`;
        }
    })
})

console.log(numTurns)
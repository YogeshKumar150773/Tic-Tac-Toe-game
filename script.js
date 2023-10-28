const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGamebtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];




//initialisisng the game

function initGame() {
    
    currentPlayer = "X";
    
    gameGrid = ["","","","","","","","",""];
    
    
    //Logic to empty the UI
    
    boxes.forEach((box, index) => {
        
        box.innerText = "";
        
        boxes[index].style.pointerEvents = "all";

        // remove green colour after we found a winner, initialise box with css properties again

        box.classList = `box box${index + 1}`;
    
    });
    
    newGamebtn.classList.remove("active");
    
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}



initGame();



function swapTurn() {
    
    if(currentPlayer ==="X") {
    
        currentPlayer = "0";
    
    } 
    
    else {
    
        currentPlayer = "X";
    
    }
    
    
    //UI Update
    
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}



function checkGameOver() {
    
    let answer = "";

    winningPositions.forEach((position) => {

        //all 3 boxes should be same and non empty

        if( ( gameGrid [ position [ 0 ] ] !== "" || gameGrid [ position [ 1 ] ] !== "" || gameGrid [ position [ 2 ] ] !== "" ) 
            && ( gameGrid [ position [ 0 ] ] === gameGrid [ position [ 1 ] ]) && ( gameGrid [ position [ 1 ] ] === gameGrid [ position [ 2 ] ] ) ) {
        
                //check if winner is x

                if(gameGrid[position[0]] === "X") {

                    answer = "X";

                }

                else {

                    answer = "0";

                }

                //disable pointer events

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X or 0 is a winner

                boxes[position[0]].classList.add("win");
                
                boxes[position[1]].classList.add("win");
                
                boxes[position[2]].classList.add("win");

            }

    });

    // it means we have a winner

    if ( answer !== "" ) {

        gameInfo.innerText = `Winner Player - ${answer}`;

        newGamebtn.classList.add("active");

        return;

    }

    //let's check whether there is a tie

    let fillCount = 0;

    gameGrid.forEach((box) => {
        
        if(box !== "") {
        
            fillCount++;
        
        }
    
    });

    //board is full, game is tied

    if(fillCount === 9) {
    
        gameInfo.innerText = "Game Tied !";
    
        newGamebtn.classList.add("active");
    
    }

}



function handleClick(index) {

    if(gameGrid[index] === "") {

        boxes[index].innerText = currentPlayer;                                     //this changes in the UI

        gameGrid[index] = currentPlayer;                                            //thsi is for inner logic

        boxes[index].style.pointerEvents = "none";

        
        //swap the players

        swapTurn();

        
        //check if somebocy won or not

        checkGameOver();

    }

}



boxes.forEach((box, index) => {
    
    box.addEventListener('click', () => {
    
        handleClick(index);
    
    });

});



newGamebtn.addEventListener('click', initGame);
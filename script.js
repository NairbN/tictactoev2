const btn1 = document.createElement('button');
const btn2 = document.createElement('button');
const btn3 = document.createElement('button');
const btn4 = document.createElement('button');
const btn5 = document.createElement('button');
const btn6 = document.createElement('button');
const btn7 = document.createElement('button');
const btn8 = document.createElement('button');
const btn9 = document.createElement('button');
const startBtn = document.createElement('button');
const container = document.getElementById('button-container')
let buttons = [btn1, btn2, btn3, btn4, btn5, btn6, btn7,btn8,btn9];
for(let i = 0; i < buttons.length; i++){
    buttons[i].innerText = ' ';
    container.appendChild(buttons[i]);
}
startBtn.className = 'start';
startBtn.innerText = 'Start';
container.appendChild(startBtn);

startBtn.onclick = function(){
    startGame();
};


function startGame(){
    for(let i = 0; i < 9; i++){
        buttons[i].disabled = false;
        buttons[i].innerText = ' ';
    }
    let gameboard = ['_','_', '_', '_','_', '_', '_', '_', '_'];
    const opponent = 'X';
    const cpu = 'O';
    let index;
    for(let i = 0; i < 9; i++){
        buttons[i].onclick = function(){
            gameboard[i] = opponent;
            buttons[i].innerText = opponent;
            buttons[i].disabled = true;
            if(evaluate(gameboard, cpu, opponent) != 0 || isFull(gameboard)){
                end(gameboard,cpu,opponent);
            }
            index = findBestMove(gameboard, cpu, opponent);
            gameboard[index] = cpu;
            buttons[index].innerText = cpu;
            buttons[index].disabled = true;
            if(evaluate(gameboard, cpu, opponent) != 0 || isFull(gameboard)){
                end(gameboard,cpu,opponent);
            }
        }
    }
}

function end(gameboard, cpu, opponent){
    if(evaluate(gameboard, cpu, opponent) === -10){
        setTimeout(function(){ alert('You Won!'); }, 100);
    } else if(evaluate(gameboard, cpu, opponent) === 10){
        setTimeout(function(){ alert('You Lost.'); }, 100);
    } else{
        setTimeout(function(){ alert('It\'s a tie!'); }, 100);
    }
    for(let i = 0; i < 9; i++){
        buttons[i].disabled = true;
    }
}

function findBestMove(gameboard, cpu, opponent){
    let bestVal = -1000;
    let bestIndex = -1;
    for(let i = 0; i < 9; i++){
        if(gameboard[i] === '_'){
            gameboard[i] = cpu;
            let moveVal = minimax(gameboard, cpu, opponent, false);
            gameboard[i] = '_';
            if(moveVal > bestVal){
                bestIndex = i;
                bestVal = moveVal;
            }
        }
    }
    return bestIndex;
}

function minimax(gameboard,cpu,opponent, isMax){
    let score = evaluate(gameboard,cpu,opponent);
    if(score === 10 || score === -10){
        return score;
    }
    if(isFull(gameboard)){
        return 0;
    }

    if(isMax){
        let best = -1000;
        for(let i = 0; i < 9; i++){
            if(gameboard[i] === '_'){
                gameboard[i] = cpu;
                best = Math.max(best, minimax(gameboard,cpu,opponent, !isMax));
                gameboard[i] = '_';
            }
        }
        return best;
    } else {
        let best = 1000;
        for(let i = 0; i < 9; i++){
            if(gameboard[i] === '_'){
                gameboard[i] = opponent;
                best = Math.min(best, minimax(gameboard,cpu,opponent, !isMax));
                gameboard[i] = '_';
            }
        }
        return best;
    }
}

function isFull(gameboard){
    for(let i = 0; i < 9; i++){
        if(gameboard[i] === '_'){
            return false;
        }
    }
    return true;
}

function evaluate(gameboard, cpu, opponent){
    if (checkWin(gameboard, cpu)) {
		return 10;
	}
	if (checkWin(gameboard, opponent)) {
		return -10;
	}
	return 0;
}
function checkWin(gameboard, piece){
     if(((gameboard[0] === piece) && (gameboard[1] === piece) && (gameboard[2] === piece)) ||
        ((gameboard[3] === piece) && (gameboard[4] === piece) && (gameboard[5] === piece)) ||
        ((gameboard[6] === piece) && (gameboard[7] === piece) && (gameboard[8] === piece)) ||
        ((gameboard[0] === piece) && (gameboard[3] === piece) && (gameboard[6] === piece)) ||
        ((gameboard[1] === piece) && (gameboard[4] === piece) && (gameboard[7] === piece)) ||
        ((gameboard[2] === piece) && (gameboard[5] === piece) && (gameboard[8] === piece)) || 
        ((gameboard[0] === piece) && (gameboard[4] === piece) && (gameboard[8] === piece)) ||
        ((gameboard[2] === piece) && (gameboard[4] === piece) && (gameboard[6] === piece))){
            return true;
     } else {
         return false;
     }
}

/*
function highlightWin(gameboard, piece){
    switch(true){
        case ((gameboard[0] === piece) && (gameboard[1] === piece) && (gameboard[2] === piece)):

            buttons[0].className = 'highlight';
            buttons[1].className = 'highlight';
            buttons[2].className = 'highlight';
            buttons[0].disabled = false;
            buttons[1].disabled = false;
            buttons[2].disabled = false;
            break;
        case ((gameboard[3] === piece) && (gameboard[4] === piece) && (gameboard[5] === piece)):
            buttons[3].className = 'highlight';
            buttons[4].className = 'highlight';
            buttons[5].className = 'highlight';
            break;
        case ((gameboard[6] === piece) && (gameboard[7] === piece) && (gameboard[8] === piece)):
            buttons[6].className = 'highlight';
            buttons[7].className = 'highlight';
            buttons[8].className = 'highlight';
            break;
        case ((gameboard[0] === piece) && (gameboard[3] === piece) && (gameboard[6] === piece)):
            buttons[0].className = 'highlight';
            buttons[3].className = 'highlight';
            buttons[6].className = 'highlight';
            break;
        case ((gameboard[1] === piece) && (gameboard[4] === piece) && (gameboard[7] === piece)):
            buttons[1].className = 'highlight';
            buttons[4].className = 'highlight';
            buttons[7].className = 'highlight';
            break;
        case ((gameboard[2] === piece) && (gameboard[5] === piece) && (gameboard[8] === piece)):
            buttons[2].className = 'highlight';
            buttons[5].className = 'highlight';
            buttons[8].className = 'highlight';
            break;
        case ((gameboard[0] === piece) && (gameboard[4] === piece) && (gameboard[8] === piece)):
            buttons[0].className = 'highlight';
            buttons[4].className = 'highlight';
            buttons[8].className = 'highlight';
            break;
        case ((gameboard[2] === piece) && (gameboard[4] === piece) && (gameboard[6] === piece)):
            buttons[2].className = 'highlight';
            buttons[4].className = 'highlight';
            buttons[6].className = 'highlight';
            break;
        default:
            break;
    }
}

*/
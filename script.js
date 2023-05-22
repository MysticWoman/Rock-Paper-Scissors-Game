const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton =document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true }) 
    })  
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

const changeColor = () => {
    if (WINNING_COMBINATION) {
      body.classList.remove("purple");
      body.classList.remove("pink");
      body.classList.add("pink");
    } else {
      body.classList.remove("purple");
      body.classList.remove("pink");
      body.classList.add("purple");
    }
  };

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
      endGame(false)  
    } else if (isDraw()) {
      endGame(true)
    } else {
      swapTurns()
      setBoardHoverClass()  
    }
}

function endGame(draw) {
    if(draw) {
      winningMessageTextElement.innerText = 'Draw!'  
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }   else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');

let audioActualmenteReproduciendo = null;

function reproducirAudio(audio) {
  if (audioActualmenteReproduciendo) {
    audioActualmenteReproduciendo.pause();
  }
  audio.play();
  audioActualmenteReproduciendo = audio;
};

button1.addEventListener('click', function() {
  const audio1 = document.getElementById('audio1');
  reproducirAudio(audio1);
});

button2.addEventListener('click', function() {
  const audio2 = document.getElementById('audio2');
  reproducirAudio(audio2);
});

button3.addEventListener('click', function() {
  const audio3 = document.getElementById('audio3');
  reproducirAudio(audio3);
});

button4.addEventListener('click', function() {
    const audio4 = document.getElementById('audio4');
    reproducirAudio();
});

// Obtener la etiqueta body
const body = document.querySelector('body');

// Cambiar la clase del body según el jugador actual
if (currentPlayer === 'X') {
  body.classList.remove('player-o');
  body.classList.add('player-x');
} else {
  body.classList.remove('player-x');
  body.classList.add('player-o');
}

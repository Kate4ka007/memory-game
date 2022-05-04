const cards = document.querySelectorAll('.card');
const btn = document.querySelector('.restart');

const moves = document.querySelector('.moves');
const btnNewGame = document.querySelector('.btn-close');
const modalWindow = document.querySelector('.modal-result-wrapper');
const text = document.querySelector('.text')

let player
let move = 0
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let totalChecked = 0

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    if(move == 0) {
      timer()
    }
  hasFlippedCard = true;
  firstCard = this;
  return;    
  }

  secondCard = this;   
  move++;
  console.log(move)
  moves.innerHTML = `Moves: ${move}`
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.food === secondCard.dataset.food) {
    disableCards();
    totalChecked++
    console.log(`совпадения: ${totalChecked}`)
  if(totalChecked == 15) {
    console.log('Winner');
    modalWindow.style.display = "block"
    stopTime();
    text.innerHTML = `<p>You did it!!!</p><p></p><p>You completed the game in ${move} moves.</p><p></p><p>Will you try again?</p>`
    recordLastScore()
  }
    return;
  }
  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
  let ramdomPos = Math.floor(Math.random() * 30);
  card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

btn.addEventListener('click', () => {
  location.reload()
  stopTime()
})


btnNewGame.addEventListener('click', () => {
  location.reload()
  modalWindow.style.display = "none"    
})

const timeCounter = document.querySelector(".timer");

let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

function timer() {
	time = setInterval(function() {
		seconds++;
			if (seconds === 60) {
				minutes++;
				seconds = 0;
			}		
		timeCounter.innerHTML = "<i class='hour-start'></i>" + " Timer: " + minutes + " min " + seconds + " sec" ;
	}, 1000);
}

function stopTime() {
	clearInterval(time);
}

const PREVIOUS_SCORE_TABLE = document.getElementById('previous-score__table');
const PREVIOUS_SCORE_CNT = document.getElementById('previous-score__container');
let matchNumber = 1;

function recordLastScore() {
  let newLineScore
  player = prompt("What is you name?", "Player")
  if (player === null) {
    player = 'Player';
  }
  if (localStorage.getItem('score')) {
    let value = localStorage.getItem('score')
    newLineScore = value + '<tr><td>' + player + '</td><td>' + minutes + ' min ' + seconds + ' sec</td><td>' + move ;
  } else {
  newLineScore = '<tr><td>' + player + '</td><td>' + minutes + ' min ' + seconds + ' sec</td><td>' + move ;}
  PREVIOUS_SCORE_TABLE.insertAdjacentHTML('beforeend', newLineScore);
  PREVIOUS_SCORE_CNT.style.display = 'block';
  localStorage.setItem('score', newLineScore);
}

const volume = document.querySelector('.volume');

document.getElementById("mybtn").onclick = function()  {
  let myaudio = document.getElementById("myaudio");
  if(myaudio.paused == true) {
    document.getElementById("myaudio").play();
      volume.src = './assets/image/volume-on.png';
  }
  else if (myaudio.paused == false) {
    document.getElementById("myaudio").pause();
    volume.src = './assets/image/volume-off.png';
  }
}

function cliCk() {
  let audio = new Audio();
  audio.src = './assets/image/69880c1f5e57698.mp3';
  audio.autoplay = true;
  return true;
}

btnNewGame.addEventListener('click', cliCk);
btn.addEventListener('click', cliCk);
mybtn.addEventListener('click', cliCk);
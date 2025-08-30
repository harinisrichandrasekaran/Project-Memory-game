// script.js

const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart");

// Card icons (pairs)
const icons = ["🐓", "🦤", "🦃", "🦚", "🦜", "🦢", "🕊️", "🦩"];
let cardsArray = [...icons, ...icons]; // duplicate for pairs

let flippedCards = [];
let matchedCards = [];

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create cards
function createBoard() {
  board.innerHTML = "";
  shuffle(cardsArray).forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">❓</div>
        <div class="card-back">${icon}</div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card, icon));
    board.appendChild(card);
  });
}

// Flip card function
function flipCard(card, icon) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped") && !matchedCards.includes(icon)) {
    card.classList.add("flipped");
    flippedCards.push({ card, icon });

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check for match
function checkMatch() {
  const [first, second] = flippedCards;

  if (first.icon === second.icon) {
    matchedCards.push(first.icon);
    flippedCards = [];
  } else {
    setTimeout(() => {
      first.card.classList.remove("flipped");
      second.card.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Restart Game
restartBtn.addEventListener("click", () => {
  flippedCards = [];
  matchedCards = [];
  createBoard();
});

// Initialize game
createBoard();

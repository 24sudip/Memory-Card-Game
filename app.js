// 
const cards = document.querySelectorAll(".memory-card");
let cardIsFlipped = false;
let firstCard, secondCard;

let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add("flip");
    if (!cardIsFlipped) {
        // first click first card
        cardIsFlipped = true;
        firstCard = this;
        // console.log({cardIsFlipped, firstCard});
        return;
    }
    // second click second card
    secondCard = this;
    // console.log({firstCard, secondCard});
    checkForMatch();
}

function checkForMatch() {
    let isMatched = firstCard.dataset.name === secondCard.dataset.name;
    isMatched ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {                
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [cardIsFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// IIFE
(function shuffle() {
    cards.forEach(function (card) {
        let randomPositions = Math.floor(Math.random() * 12);
        // console.log(randomPositions);
        card.style.order = randomPositions;
    });
})();

cards.forEach(function (card) {
    card.addEventListener("click", flipCard);
});

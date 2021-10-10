const tilesArea = document.querySelector('.tilesarea');
let curLives = 6;
let curDiff = 1;
const difficulty = [
    {
        name: 'easy',
        lives: 6,
        tiles: 12
    },
    {
        name: 'medium',
        lives: 7,
        tiles: 16
    },
    {
        name: 'hard',
        lives: 8,
        tiles: 20
    }
]
let wins = localStorage.getItem('wins') || 0;
let losses = localStorage.getItem('losses') || 0;

const livesText = document.querySelector('.lives');
const winsText = document.querySelector('.wins');
const lossesText = document.querySelector('.losses');

const buttons = document.querySelectorAll('button');
console.log(buttons)

buttons.forEach(btn => btn.addEventListener('click', (e) => {
    buttons.forEach(btn => btn.classList.remove('active'))
    e.target.classList.add('active');
}))

easyDif = document.querySelector('.easy').addEventListener('click', () => {
    let easyMode = confirm("Switch to Easy Difficulty?");
    if (easyMode) {
        curDiff = 0;
        resetCards();
    }
})

medDif = document.querySelector('.medium').addEventListener('click', () => {
    let medMode = confirm("Switch to Medium Difficulty?");
    if (medMode) {
        curDiff = 1;
        resetCards();
    }
})

hardDif = document.querySelector('.hard').addEventListener('click', () => {
    let hardMode = confirm("Switch to Hard Difficulty?");
    if (hardMode) {
        curDiff = 2;
        resetCards();
    }
})

winsText.textContent = wins;
livesText.textContent = curLives;
lossesText.textContent = losses;

const getData = () => {
    const cards = [];
    for (let i = 0; i < difficulty[curDiff].tiles / 2; i++) {
        cards.push({
            imgSrc: `./img/tile${i}.jpg`, name: `${i}`
        })
        cards.push({
            imgSrc: `./img/tile${i}.jpg`, name: `${i}`
        })
    }
    return cards;
}

//Fisher-yates shuffle
const shuffle = (array) => {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

const makeCard = (cardItem) => {
    const card = document.createElement(`div`);
    const face = document.createElement(`img`);
    const back = document.createElement(`div`);
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    face.src = cardItem.imgSrc;
    card.setAttribute('name', cardItem.name);
    card.appendChild(face);
    card.appendChild(back);
    card.addEventListener('click', (e) => {
        if (!card.classList.contains('toggled')) {
            card.classList.toggle('toggled');
            checkCards(e)
        }

    })
    return card;
}

const displayCards = () => {
    const cardData = shuffle(getData());
    cardData.forEach(cardItem => {
        const card = makeCard(cardItem)
        tilesArea.appendChild(card);
    })
}

const youWin = () => {
    alert('Congrats, you are the best gamer!');
    wins++;
    localStorage.setItem('wins', wins)
    winsText.textContent = wins;
}

const youLose = () => {
    alert('Game over! Please try again!');
    losses++;
    localStorage.setItem('losses', losses)
    lossesText.textContent = losses;
}

const resetCards = () => {
    tilesArea.querySelectorAll('*').forEach(n => n.remove());
    displayCards();
    curLives = difficulty[curDiff].lives;
    livesText.textContent = curLives;
}

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped')
    const toggledCards = document.querySelectorAll('.toggled');
    const flippedCards = document.querySelectorAll('.flipped');

    console.log(flippedCards)

    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        } else {
            flippedCards.forEach(card => {
                setTimeout(() => {
                    card.classList.remove('toggled');
                    card.classList.remove('flipped');
                }, 500);
            })
            curLives--;
            livesText.textContent = curLives;
        }
    }

    if (curLives <= 0) {
        setTimeout(() => {
            youLose();
            resetCards();
        }, 250);
    }

    if (toggledCards.length === difficulty) {
        setTimeout(() => {
            youWin();
            resetCards();
        }, 250);
    }
}

displayCards();

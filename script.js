const tilesArea = document.querySelector('.tilesarea');
let lives = 4;
let difficulty = 16;
let wins = localStorage.getItem('wins') || 0;
let losses = localStorage.getItem('losses') || 0;

const livesText = document.querySelector('.lives')
const winsText = document.querySelector('.wins')
const lossesText = document.querySelector('.losses')

winsText.textContent = wins;
livesText.textContent = lives;
lossesText.textContent = losses;

const getData = () => {
    const cards = [];
    for (let i=0; i<difficulty / 2; i++){
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
    face.src=cardItem.imgSrc;
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
    alert('YOU WIN');
    wins++;
    localStorage.setItem('wins', wins)
    winsText.textContent = wins;
}

const youLose = () => {
    alert('YOU DIED');
    losses++;
    localStorage.setItem('losses', losses)
    lossesText.textContent = losses;
}

const resetCards = () => {
    tilesArea.querySelectorAll('*').forEach(n => n.remove());
    displayCards();
    lives = 5;
    livesText.textContent = lives;
}

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped')
    const toggledCards = document.querySelectorAll('.toggled');
    const flippedCards = document.querySelectorAll('.flipped');

    console.log(flippedCards)

    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            console.log('MATCH FOUND')
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        } else {
            console.log('MATCH NOT FOUND')
            flippedCards.forEach(card => {
                setTimeout(() => {
                    card.classList.remove('toggled');
                    card.classList.remove('flipped');
                }, 500);
            })
            lives--;
            livesText.textContent = lives;  
        }
    }

    console.log(e.target)

    if (lives <= 0) {
        setTimeout(() => {
            youLose();
            resetCards();  
        }, 250);
    }
    
    if (toggledCards.length === 16) {
        setTimeout(() => {
            youWin();  
        }, 250);
    }
}

displayCards();

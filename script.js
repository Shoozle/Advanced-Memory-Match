const tilesArea = document.querySelector('.tilesarea');
let lives = 5;
let difficulty = 16;
let wins = 0;
let losses = 0;

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
        card.classList.toggle('togglecard');
        checkCards(e)
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
}

const checkCards = (e) => {
    const toggledCards = document.querySelectorAll('.togglecard');
    if (toggledCards.length === 3) {
        setTimeout(() => {
            youWin();  
        }, 250);
    }
}

displayCards();

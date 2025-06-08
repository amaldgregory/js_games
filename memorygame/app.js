const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
        {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
]

cardArray.sort(() => 0.5 - Math.random())

const grid = document.querySelector('#grid')
let cardchosen = []
let cardschosenids = []
const cardswon = []
const resultdisplay = document.querySelector('#result')

function createboard(){
    for(let i=0; i<cardArray.length; ++i){
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipcard);
        grid.append(card)
    }
}

function checkmatch(){
    const cards = document.querySelectorAll('#grid img');
    if(cardschosenids[0] === cardschosenids[1]){
        cards[cardschosenids[0]].setAttribute('src', 'images/blank.png')
        cards[cardschosenids[0]].setAttribute('src', 'images/blank.png')
        alert("You have selected the same image");
    }
    else if(cardchosen[0] === cardchosen[1]){
        alert("Match");
        cards[cardschosenids[0]].setAttribute('src', 'images/white.png');
        cards[cardschosenids[1]].setAttribute('src', 'images/white.png');
        cards[cardschosenids[0]].removeEventListener('click', flipcard);
        cards[cardschosenids[1]].removeEventListener('click', flipcard);
        cardswon.push(cardchosen)
    }
    else{
        cards[cardschosenids[0]].setAttribute('src', 'images/blank.png')
        cards[cardschosenids[1]].setAttribute('src', 'images/blank.png')
        alert("sorry try again")
    }
    resultdisplay.textContent = cardswon.length
    cardchosen = []
    cardschosenids = []

    if(cardswon.length == 6){
        resultdisplay.innerHTML = "congrats";
    }
}

function flipcard(){
    const cardid = this.getAttribute('data-id');
    cardchosen.push(cardArray[cardid].name)
    cardschosenids.push(cardid)
    console.log("Clicked" + this.getAttribute('data-id'));
    this.setAttribute('src', cardArray[cardid].img)
    if(cardchosen.length == 2){
        setTimeout(checkmatch, 500);
    }
}

createboard()
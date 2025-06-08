const computerchoicedisplay = document.getElementById('computer_choice');
const userchoicedisplay = document.getElementById('user_choice');
const resultdisplay = document.getElementById('result');

const possiblechoices = document.querySelectorAll('button')
console.log(possiblechoices)
let userchoice;
let computerchoice;
let result;
let wincounter = 0;
let losscounter = 0;
let drawcounter = 0;

document.getElementById('wincounter').innerHTML = wincounter;
document.getElementById('losscounter').innerHTML = losscounter;
document.getElementById('drawcounter').innerHTML = drawcounter;



possiblechoices.forEach(possiblechoice => possiblechoice.addEventListener('click', (e)=>{
    userchoice = e.target.id;
    userchoicedisplay.innerHTML = userchoice;
    generateComputerChoice();
    getResult();
}));


function generateComputerChoice(){
    const randomnumber = Math.floor(Math.random()*3) + 1;

    if(randomnumber === 1){
        computerchoice = 'rock';
    }
    if(randomnumber === 2){
        computerchoice = 'scissors';
    }
    if(randomnumber === 3){
        computerchoice = 'paper';
    }
    computerchoicedisplay.innerHTML = computerchoice
}

let results = {};
results["rock"] = "scissors";
results["paper"] = "rock";
results["scissors"] = "paper";

function getResult(){
    if (computerchoice === userchoice){
        result = "its a draw";
        drawcounter = drawcounter + 1;
        document.getElementById('drawcounter').innerHTML = drawcounter
    }
    else if(results[userchoice] === computerchoice){
        result = "You win"
        wincounter++;
        document.getElementById('wincounter').innerHTML = wincounter
    }
    else{
        result = "You lose"
        losscounter++;
        document.getElementById('losscounter').innerHTML = losscounter

    }
    resultdisplay.innerHTML = result;
}
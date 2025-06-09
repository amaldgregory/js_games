//all constant declaration
const grid = document.querySelector('.grid')
const scoredisplay = document.querySelector('#score')

const blockwidth = 100;
const blockheight = 20;

const userwidth = 100;

const boardwidth = 560;
const boardheight = 300;

const userstart = [230, 10]
let currentposition = userstart

const ballstart = [270,40]
let ballcurrent = ballstart

const balldiamter = 20;

let timerid
let xdir = 2
let ydir = 2
let score =0;
let scoreLog = [];


//create blocks
class Block {
    constructor(xaxis, yaxis){
        this.bottomleft = [xaxis, yaxis];
        this.bottomright = [xaxis + blockwidth, yaxis];
        this.topleft = [xaxis, yaxis + blockheight];
        this.topright = [xaxis + blockwidth, yaxis + blockheight];
    }
}

const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),

]

//add blocks
function addblocks(){
    for(let i=0; i<blocks.length; ++i){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomleft[0] +'px'
        block.style.bottom = blocks[i].bottomleft[1] + 'px'
        grid.appendChild(block)
    }
}
addblocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawuser()
grid.appendChild(user)

function drawuser(){
    user.style.left = currentposition[0] + 'px'
    user.style.bottom = currentposition[1] + 'px'
}

function drawball(){
    ball.style.left = ballcurrent[0] + 'px'
    ball.style.bottom = ballcurrent[1] + 'px'
}


//move user
function moveuser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentposition[0] > 0){
                currentposition[0]-=10;
                drawuser()
            }
            break;
        case 'ArrowRight':
            if(currentposition[0] + userwidth < boardwidth){
                currentposition[0]+=10;
                drawuser()
            }
            break;
    }
}

document.addEventListener('keydown', moveuser)


//create ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawball()
grid.appendChild(ball)


function moveball(){
    ballcurrent[0]+=xdir
    ballcurrent[1]+=ydir
    drawball()
    checkforcollision()
}

//timerid = setInterval(moveball, 20)

function checkforcollision(){
    //block collisions
    for(let i=0; i<blocks.length; ++i){
        if(
            (ballcurrent[0] > blocks[i].bottomleft[0] && ballcurrent[0]<blocks[i].bottomright[0]) &&
            ((ballcurrent[1] + balldiamter)>blocks[i].bottomleft[1] && ballcurrent[1]<blocks[i].topleft[1])
        ){
            const allblocks = Array.from(document.querySelectorAll('.block'))
            allblocks[i].classList.remove('block')
            blocks.splice(i,1)
            changedirection()
            score++;
            scoredisplay.innerHTML = "Score: " + score;
        }
    }

    //for wall
    if(ballcurrent[0] >= (boardwidth - balldiamter) || 
    ballcurrent[1] >= boardheight - balldiamter ||
    ballcurrent[0] <=0){
        changedirection()
    }

    //user collision
    if ( 
        (ballcurrent[0] > currentposition[0] && ballcurrent[0] < currentposition[0] + blockwidth) &&
        (ballcurrent[1] > currentposition[1] && ballcurrent[1] <currentposition[1] + blockheight)
    ){
        changedirection()
    }

    //game over
    if(ballcurrent[1]<=0 || score >= 15){
        clearInterval(timerid)
        timerid = null
        scoredisplay.textContent = "Game Over"
        document.removeEventListener('keydown', moveuser)
        logScore(score)
    }
}

function changedirection(){
    if(xdir === 2 && ydir ===2){
        ydir = -2;
        return
    }
    if(xdir === 2 && ydir === -2){
        xdir = -2;
        return;
    }
    if(xdir === -2 && ydir === -2){
        ydir = 2;
        return;
    }
    if(xdir === -2 && ydir === 2){
        xdir = 2;
        return;
    }
}

document.getElementById('start-btn').addEventListener('click', startgame);
document.getElementById('stop-btn').addEventListener('click', stopgame);

function startgame() {
    if (!timerid) {
        timerid = setInterval(moveball, 20);
    }
}

function stopgame() {
    if (timerid) {
        clearInterval(timerid);
        timerid = null;
        logScore(score);
    }
}

function logScore(currentScore) {
    scoreLog.push(currentScore);
    const logElement = document.getElementById('score-log');
    logElement.textContent = 'Score Log:\n' + scoreLog.join('\n');
}

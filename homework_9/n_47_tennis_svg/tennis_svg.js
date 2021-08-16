const WIDTH_FIELD = 900;
const HEIGHT_FIELD = 500;
const WIDTH_RACQUET = 15;
const HEIGHT_RACQUET = 100;
const RADIUS_BALL = 20;
const TOP_RACQUET = 50;
let moveLeft;
let moveRight;
let animation;
let countLeft = 0;
let countRigth = 0;
let timer;
let timerTrigger = false;
let objBall = {
    x: WIDTH_FIELD / 2,
    y: HEIGHT_FIELD / 2,
    dx: randomAngle()[0],
    dy: randomAngle()[1],
}
let objRacquet = {
    yFirst: TOP_RACQUET,
    ySecond: HEIGHT_FIELD - HEIGHT_RACQUET - TOP_RACQUET,
    dyF: 1,
    dyS: 1,
}

const divStart = document.createElement('div');
divStart.classList.add('divNumber');

const divButtonStart = document.createElement('input');
divButtonStart.setAttribute('id', 'start_button_id');
divButtonStart.setAttribute('type', 'button');
divButtonStart.setAttribute('value', 'Старт!');
divButtonStart.style.position = 'absolute';
divButtonStart.style.top = 10 + 'px';
divButtonStart.style.left = 10 + 'px';
divStart.appendChild(divButtonStart);

const divCount = document.createElement('div');
divCount.style.fontSize = '40px';
divCount.textContent = '0:0';
divStart.appendChild(divCount);

document.body.appendChild(divStart)

const field = document.createElement('div');
field.style.height = HEIGHT_FIELD + 'px';
field.style.width = WIDTH_FIELD + 'px';
field.style.border = '2px black solid';
field.style.backgroundColor = 'yellow';
document.body.appendChild(field);

addEventListener('keydown', (e) => {
    if(e.code === 'ShiftLeft'){
        moveLeft = 'upLeft';
    }
    if(e.code === 'ControlLeft'){
        moveLeft = 'downLeft';
    }
    if(e.code === 'ArrowUp'){
        moveRight = 'upRight';
    }
    if(e.code === 'ArrowDown'){
        moveRight = 'downRight';
    }
})

addEventListener('keyup', (e) =>{
    if(e.code === 'ShiftLeft' || e.code === 'ControlLeft'){
        moveLeft = 'none';
    }
    if(e.code === 'ArrowUp' || e.code === 'ArrowDown'){
        moveRight = 'none';
    }
})

drawSVG();

divButtonStart.onclick = () =>{
    if(timerTrigger){
        return;
    }
    timerTrigger = true;
    timer = setInterval(moveBall, 10);

    objBall = {
        x: WIDTH_FIELD / 2,
        y: HEIGHT_FIELD / 2,
        dx: randomAngle()[0],
        dy: randomAngle()[1],
    }

    objRacquet = {
        yFirst: TOP_RACQUET,
        ySecond: HEIGHT_FIELD - HEIGHT_RACQUET - TOP_RACQUET,
        dyF: 1,
        dyS: 1,
    }
}

function moveBall(){
    objBall.x += objBall.dx;
    objBall.y += objBall.dy;

    if(moveLeft === 'upLeft' && objRacquet.yFirst > 0){
        objRacquet.yFirst -= objRacquet.dyF;
    }
    if(moveLeft === 'downLeft' && objRacquet.yFirst < HEIGHT_FIELD - HEIGHT_RACQUET){
        objRacquet.yFirst += objRacquet.dyF;
    }
    if(moveRight === 'upRight' && objRacquet.ySecond > 0){
        objRacquet.ySecond -= objRacquet.dyS;
    }
    if(moveRight === 'downRight' && objRacquet.ySecond < HEIGHT_FIELD - HEIGHT_RACQUET){
        objRacquet.ySecond += objRacquet.dyS;
    }

    if(objBall.x - RADIUS_BALL + 1 <= WIDTH_RACQUET && (objRacquet.yFirst <= objBall.y && objRacquet.yFirst + HEIGHT_RACQUET >= objBall.y)){
        objBall.dx = objBall.dx * -1;
    }

    if(WIDTH_FIELD - objBall.x - RADIUS_BALL - WIDTH_RACQUET <= 0 && (objRacquet.ySecond <= objBall.y && objRacquet.ySecond + HEIGHT_RACQUET >= objBall.y)){
        objBall.dx = objBall.dx * -1;
    }

    if(objBall.x - RADIUS_BALL <= 0){
        clearInterval(timer);
        timer = -1;
        timerTrigger = false;
        countRigth++;
        divCount.textContent = `${countLeft}:${countRigth}`;
        return;
    }

    if(objBall.y - RADIUS_BALL <= 0){
        objBall.dy = objBall.dy * -1;
    }

    if(objBall.x + RADIUS_BALL >= WIDTH_FIELD){
        clearInterval(timer);
        timer = -1;
        timerTrigger = false;
        countLeft++;
        divCount.textContent = `${countLeft}:${countRigth}`;
        return;
    }

    if(objBall.y + RADIUS_BALL > HEIGHT_FIELD + 1){
        objBall.dy = objBall.dy * -1;
    }

    drawSVG();

}

function drawSVG(){
    const headSVG = `<svg version="1.1"
    width="${WIDTH_FIELD}" height="${HEIGHT_FIELD}"
    xmlns="http://www.w3.org/2000/svg" id="svg_id">

    <rect x="${0}" y="${objRacquet.yFirst}" width="${WIDTH_RACQUET}" height="${HEIGHT_RACQUET}" />\n
    <rect x="${WIDTH_FIELD - WIDTH_RACQUET}" y="${objRacquet.ySecond}" width="${WIDTH_RACQUET}" height="${HEIGHT_RACQUET}" />\n
    <circle cx="${objBall.x}" cy="${objBall.y}" r="${RADIUS_BALL}" fill="red" />\n
    </svg>`
    field.innerHTML = '';
    field.innerHTML = headSVG;
}

function randomAngle(){
    const random = Math.floor(Math.random() * (136 - 45) + 45);
    const randomM = Math.random();
    let xM = 1;
    let yM = 1;

    if(randomM < 0.2){
        xM = -1;
    }

    if(randomM > 0.2 && randomM < 0.4){
        yM = -1;
    }

    if(randomM > 0.4 && randomM < 0.6){
        xM = -1;
        yM = -1;
    }
    return [Math.sin((random) * Math.PI / 180) * xM, Math.cos((random) * Math.PI / 180) * yM]
}

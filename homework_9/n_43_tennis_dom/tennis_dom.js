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
let trigger = false;

let objBall = {
    x: WIDTH_FIELD / 2,
    y: HEIGHT_FIELD / 2,
    dx: 0,
    dy: 0,
}

let objRacquet = {
    yFirst: TOP_RACQUET,
    ySecond: TOP_RACQUET,
    dyF: 0,
    dyS: 0,
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
field.style.position = 'relative';
document.body.appendChild(field);

const first_racquet = document.createElement('div');
first_racquet.style.height = HEIGHT_RACQUET + 'px';
first_racquet.style.width = WIDTH_RACQUET + 'px';
first_racquet.style.border = 'none';
first_racquet.style.backgroundColor = 'green';
first_racquet.style.position = 'absolute';
first_racquet.style.top = TOP_RACQUET + 'px';
first_racquet.style.left = 0;

field.appendChild(first_racquet);

const second_racquet = document.createElement('div');
second_racquet.style.height = HEIGHT_RACQUET + 'px';
second_racquet.style.width = WIDTH_RACQUET + 'px';
second_racquet.style.border = 'none';
second_racquet.style.backgroundColor = '#6f00cc';
second_racquet.style.position = 'absolute';
second_racquet.style.bottom = TOP_RACQUET + 'px';
second_racquet.style.right = 0;

field.appendChild(second_racquet);

const ball = document.createElement('div');
ball.style.height = RADIUS_BALL * 2 + 'px';
ball.style.width = RADIUS_BALL * 2 + 'px';
ball.style.borderRadius = '50%';
ball.style.backgroundColor = 'red';
ball.style.border = 'none';
ball.style.position = 'absolute';
ball.style.top = HEIGHT_FIELD / 2 + 'px';
ball.style.left = WIDTH_FIELD / 2 + 'px';

field.appendChild(ball);

addEventListener('keydown', (e) => {
    if (e.code === 'ShiftLeft') {
        moveLeft = 'upLeft';
    }
    if (e.code === 'ControlLeft') {
        moveLeft = 'downLeft';
    }
    if (e.code === 'ArrowUp') {
        moveRight = 'upRight';
    }
    if (e.code === 'ArrowDown') {
        moveRight = 'downRight';
    }
})

addEventListener('keyup', (e) => {
    if (e.code === 'ShiftLeft' || e.code === 'ControlLeft') {
        moveLeft = 'none';
    }
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        moveRight = 'none';
    }
})

setInterval(moveBall, 5);

divButtonStart.onclick = () => {

    if (!trigger) {
        objBall = {
            x: WIDTH_FIELD / 2,
            y: HEIGHT_FIELD / 2,
            dx: randomAngle()[0],
            dy: randomAngle()[1],
        }

        objRacquet = {
            yFirst: TOP_RACQUET,
            ySecond: TOP_RACQUET,
            dyF: 1,
            dyS: 1,
        }
    }

    trigger = true;
}

function moveBall() {
    objBall.x += objBall.dx;
    objBall.y += objBall.dy;

    if (moveLeft === 'upLeft' && objRacquet.yFirst > 0) {
        objRacquet.yFirst -= objRacquet.dyF;
    }
    if (moveLeft === 'downLeft' && objRacquet.yFirst < HEIGHT_FIELD - HEIGHT_RACQUET) {
        objRacquet.yFirst += objRacquet.dyF;
    }
    if (moveRight === 'upRight' && objRacquet.ySecond < HEIGHT_FIELD - HEIGHT_RACQUET) {
        objRacquet.ySecond += objRacquet.dyS;
    }
    if (moveRight === 'downRight' && objRacquet.ySecond > 0) {
        objRacquet.ySecond -= objRacquet.dyS;
    }

    if (objBall.x - 2 <= WIDTH_RACQUET && (objRacquet.yFirst <= objBall.y && objRacquet.yFirst + HEIGHT_RACQUET >= objBall.y)) {
        objBall.dx = objBall.dx * -1;
    }

    if (WIDTH_FIELD - objBall.x - RADIUS_BALL * 2 - WIDTH_RACQUET <= 0 && (objRacquet.ySecond <= HEIGHT_FIELD - objBall.y && objRacquet.ySecond + HEIGHT_RACQUET >= HEIGHT_FIELD - objBall.y)) {
        objBall.dx = objBall.dx * -1;
    }

    if (objBall.x <= -1) {
        objBall.dx = 0;
        objBall.dy = 0;
        objRacquet.dyF = 0;
        objRacquet.dyS = 0;
        if (trigger) {
            countRigth++;
            divCount.textContent = `${countLeft}:${countRigth}`;
            trigger = false;
        }
        return;
    }

    if (objBall.y <= -1) {
        objBall.dy = objBall.dy * -1;
    }

    if (objBall.x + RADIUS_BALL * 2 >= WIDTH_FIELD + 1) {
        objBall.dx = 0;
        objBall.dy = 0;
        objRacquet.dyF = 0;
        objRacquet.dyS = 0;
        if (trigger) {
            countLeft++;
            divCount.textContent = `${countLeft}:${countRigth}`;
            trigger = false;
        }
        return;
    }

    if (objBall.y + RADIUS_BALL * 2 > HEIGHT_FIELD + 1) {
        objBall.dy = objBall.dy * -1;
    }

    ball.style.top = objBall.y + 'px';
    ball.style.left = objBall.x + 'px';
    first_racquet.style.top = objRacquet.yFirst + 'px';
    second_racquet.style.bottom = objRacquet.ySecond + 'px';
}

function randomAngle() {
    const random = Math.floor(Math.random() * (136 - 45) + 45);
    const randomM = Math.random();
    let xM = 1;
    let yM = 1;

    if (randomM < 0.2) {
        xM = -1;
    }

    if (randomM > 0.2 && randomM < 0.4) {
        yM = -1;
    }

    if (randomM > 0.4 && randomM < 0.6) {
        xM = -1;
        yM = -1;
    }
    return [Math.sin((random) * Math.PI / 180) * xM, Math.cos((random) * Math.PI / 180) * yM]
}
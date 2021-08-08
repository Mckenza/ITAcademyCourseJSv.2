const height = 500;
const radStart = getRadian(0);
const radEnd = getRadian(360);
const amountNumbers = 12;
const radiusSmallArc = Math.round(height * 0.07);
const border = radiusSmallArc * 0.25;
const radiusDrow = height / 2 - radiusSmallArc - border;
const textCoordX = height / 2 / 1.5;
const textCoordY = height / 2 / 1.5;

const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'main_canvas');
canvas.height = height;
canvas.width = height;
document.body.appendChild(canvas);

function draw(){
    let currentAngle = 0;
    const [strTime, hour, min, sec] = formatTime();

    const cvs = canvas.getContext('2d');
    cvs.clearRect(0, 0, height, height);
    cvs.fillStyle = 'yellow';

    cvs.beginPath();
    cvs.arc(height / 2, height / 2, height / 2, radStart, radEnd);
    cvs.fill();

    cvs.fillStyle = 'green';
    cvs.font = `bold ${radiusSmallArc * 1.2}px serif`;
    
    for (let i = 0; i < amountNumbers; i++) {
        const angle = getRadian(currentAngle);
        const x = Math.round(radiusDrow * Math.sin(angle) + radiusDrow + radiusSmallArc + border);
        const y = Math.round(radiusDrow * Math.cos(angle) + radiusDrow + radiusSmallArc + border);
        cvs.beginPath();
        cvs.arc(x, y, radiusSmallArc, radStart, radEnd);
        cvs.fill();
        cvs.fillStyle = 'white';
        cvs.fillText(12 - (6 + i) > 0 ? (6 - i) : 12 - (i - 6), 12 - (6 + i) > 0 || i > 8 ? x - radiusSmallArc / 2 + border / 2 :  x - radiusSmallArc / 2 - border / 2, y + radiusSmallArc / 2 - border /2);
        cvs.fillStyle = 'green';
        currentAngle += 30;
    }

    cvs.fillStyle = 'black';
    cvs.font = `${height * 0.1}px serif`;
    cvs.fillText(strTime, textCoordX, textCoordY);

    const radiusH = 0.6;
    const radiusM = 0.8;
    const radiusS = 0.9;
    const strokeHour = 10;
    const strokeMin = 6;
    const strokeSec = 4;
    const xH = radiusH * Math.round(height / 2 * Math.sin((hour * 30 + min * 0.5 + sec * 0.008) * Math.PI / 180)) + height / 2;
    const yH = radiusH * Math.round(-height / 2 * Math.cos((hour * 30 + min * 0.5 + sec * 0.008) * Math.PI / 180)) + height / 2;
    const xM = radiusM * Math.round(height / 2 * Math.sin(((min * 6 + sec * 0.1)) * Math.PI / 180)) + height / 2;
    const yM = radiusM * Math.round(-height / 2 * Math.cos(((min * 6 + sec * 0.1)) * Math.PI / 180)) + height / 2;
    const xS = radiusS * Math.round(height / 2 * Math.sin((sec * 6) * Math.PI / 180)) + height / 2;
    const yS = radiusS * Math.round(-height / 2 * Math.cos((sec * 6) * Math.PI / 180)) + height / 2;

    cvs.lineCap = 'round';
    cvs.lineWidth = strokeHour;
    cvs.beginPath();
    cvs.moveTo(height / 2, height / 2);
    cvs.lineTo(xH, yH);
    cvs.stroke();

    cvs.lineWidth = strokeMin;
    cvs.beginPath();
    cvs.moveTo(height / 2, height / 2);
    cvs.lineTo(xM, yM);
    cvs.stroke();

    cvs.lineWidth = strokeSec;
    cvs.beginPath();
    cvs.moveTo(height / 2, height / 2);
    cvs.lineTo(xS, yS);
    cvs.stroke();
}

function startTimer(){
    draw();
    setInterval(()=>{
        draw();
    }, 1000)
}

startTimer();

function formatTime() {
    let strTime = '';
    const timeNow = new Date();
    if (timeNow.getHours() < 10) {
        strTime += ('0' + timeNow.getHours() + ':');
    } else {
        strTime += timeNow.getHours() + ':';
    }
    if (timeNow.getMinutes() < 10) {
        strTime += ('0' + timeNow.getMinutes() + ':');
    } else {
        strTime += timeNow.getMinutes() + ':';
    }
    if (timeNow.getSeconds() < 10) {
        strTime += ('0' + timeNow.getSeconds());
    } else {
        strTime += timeNow.getSeconds();
    }
    return [strTime, timeNow.getHours() < 13 ? timeNow.getHours() : timeNow.getHours() - 12, timeNow.getMinutes(), timeNow.getSeconds()];
}

function getRadian(angle){
    return (Math.PI / 180) * angle;
}
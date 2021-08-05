const heightDiv = 600;

const divSvg = document.createElement('div');
divSvg.setAttribute('style', `height: ${heightDiv}px; width: ${heightDiv}px`);
divSvg.insertAdjacentHTML("afterbegin", drawCircles());
document.body.appendChild(divSvg);
const svgID = document.getElementById('svg_id');

function drawCircles() {
    const headSVG = `<svg version="1.1"
    width="${heightDiv}" height="${heightDiv}"
    xmlns="http://www.w3.org/2000/svg" id="svg_id">
    </svg>`

    return headSVG;
}

function renderNumbers() {
    const radiusSmallCircle = Math.round(heightDiv * 0.07);
    const border = 10;
    const countNumbers = 12;
    const constAngle = 30;
    let strHtml = '';
    let currentAngle = 0;
    const radius = (heightDiv / 2) - radiusSmallCircle - border;
    const fontSize = Math.round(radiusSmallCircle);

    for (let i = 0; i < countNumbers; i++) {
        const x = Math.round(radius * Math.sin(currentAngle * Math.PI / 180)) + radius + radiusSmallCircle + border;
        const y = Math.round(radius * Math.cos(currentAngle * Math.PI / 180)) + radius + radiusSmallCircle + border;
        strHtml += `<circle cx="${x}" cy="${y}" r="${radiusSmallCircle}" fill="green" />\n`
        strHtml += `<text x="${x}" y="${y + border}" font-size="${fontSize}" text-anchor="middle" fill="white">${12 - (6 + i) > 0 ? (6 - i) : 12 - (i - 6)}</text>`
        currentAngle += constAngle;
    }
    return strHtml;
}

function arrows(hour, min, sec, ml) {
    const radiusH = 0.6;
    const radiusM = 0.8;
    const radiusS = 0.9;
    const strokeHour = 10;
    const strokeMin = 6;
    const strokeSec = 4;
    const lineHour = `<line x1="${heightDiv / 2}" y1="${heightDiv / 2}" x2="${radiusH * Math.round(heightDiv / 2 * Math.sin(((hour * 30 + min * 0.5 + sec * 0.008)) * Math.PI / 180)) + heightDiv / 2}" y2="${radiusH * Math.round(-heightDiv / 2 * Math.cos(((hour * 30 + min * 0.5 + sec * 0.008)) * Math.PI / 180)) + heightDiv / 2}" stroke="black" stroke-width="${strokeHour}" stroke-linecap="round" />\n`;
    const lineMinute = `<line x1="${heightDiv / 2}" y1="${heightDiv / 2}" x2="${radiusM * Math.round(heightDiv / 2 * Math.sin(((min * 6 + sec * 0.1)) * Math.PI / 180)) + heightDiv / 2}" y2="${radiusM * Math.round(-heightDiv / 2 * Math.cos(((min * 6 + sec * 0.1)) * Math.PI / 180)) + heightDiv / 2}" stroke="black" stroke-width="${strokeMin}" stroke-linecap="round" />\n`;
    const lineSecond = `<line x1="${heightDiv / 2}" y1="${heightDiv / 2}" x2="${Math.round(heightDiv / 2 * Math.sin(((sec * 1000 + ml) * 0.006) * Math.PI / 180) + heightDiv / 2)}" y2="${Math.round(-heightDiv / 2 * Math.cos(((sec * 1000 + ml) * 0.006) * Math.PI / 180) + heightDiv / 2)}" stroke="black" stroke-width="${strokeSec}" stroke-linecap="round" />\n`;
    return lineHour + lineMinute + lineSecond;
}

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
    return [strTime, timeNow.getHours() < 13 ? timeNow.getHours() : timeNow.getHours() - 12, timeNow.getMinutes(), timeNow.getSeconds(), timeNow.getMilliseconds()];
}

function timer() {
    setInterval(() => {
        const [strTime, hour, minute, sec, ml] = formatTime();
        svgID.innerHTML = `<circle cx="${heightDiv / 2}" cy="${heightDiv / 2}" r="${heightDiv / 2}" fill="yellow" />
        <text x="${heightDiv / 3}" y="${heightDiv / 3}" font-size="${heightDiv * 0.1}" fill="black">${strTime}</text>
        ${renderNumbers()}
        ${arrows(hour, minute, sec, ml)}`
    }, 10);
}

timer();
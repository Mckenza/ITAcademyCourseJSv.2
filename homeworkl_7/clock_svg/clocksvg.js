const heightDiv = 600;

const divSvg = document.createElement('div');
divSvg.setAttribute('style', `height: ${heightDiv}px; width: ${heightDiv}px`);
divSvg.insertAdjacentHTML("afterbegin", drawCircles());
document.body.appendChild(divSvg);

function drawCircles(){
    const headSVG = `<svg version="1.1"
    width="${heightDiv}" height="${heightDiv}"
    xmlns="http://www.w3.org/2000/svg">

    <circle cx="${heightDiv / 2}" cy="${heightDiv / 2}" r="${heightDiv / 2}" fill="yellow" />
    ${renderNumbers()}

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
        strHtml += `<text x="${x}" y="${y + border}" font-size="${fontSize}" text-anchor="middle" fill="white">12</text>`
        currentAngle += constAngle;
    }
    return strHtml;
}

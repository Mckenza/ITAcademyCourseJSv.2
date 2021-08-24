class ClockSVG {
    constructor(params) {
        this.heightDiv = params.width;
        this.mainDiv = params.div;
    }

    draw(time) {
        const [strTime, hour, min, sec] = time;

        const radiusSmallCircle = Math.round(this.heightDiv * 0.07);
        const border = 10;
        const countNumbers = 12;
        const constAngle = 30;
        let strHtml = '';
        let currentAngle = 0;
        const radius = (this.heightDiv / 2) - radiusSmallCircle - border;
        const fontSize = Math.round(radiusSmallCircle);

        for (let i = 0; i < countNumbers; i++) {
            const x = Math.round(radius * Math.sin(currentAngle * Math.PI / 180)) + radius + radiusSmallCircle + border;
            const y = Math.round(radius * Math.cos(currentAngle * Math.PI / 180)) + radius + radiusSmallCircle + border;
            strHtml += `<circle cx="${x}" cy="${y}" r="${radiusSmallCircle}" fill="green" />\n`
            strHtml += `<text x="${x}" y="${y + border}" font-size="${fontSize}" text-anchor="middle" fill="white">${12 - (6 + i) > 0 ? (6 - i) : 12 - (i - 6)}</text>`
            currentAngle += constAngle;
        }

        const radiusH = 0.6;
        const radiusM = 0.8;
        const strokeHour = 10;
        const strokeMin = 6;
        const strokeSec = 4;
        const lineHour = `<line x1="${this.heightDiv / 2}" y1="${this.heightDiv / 2}" x2="${radiusH * Math.round(this.heightDiv / 2 * Math.sin(((hour * 30 + min * 0.5 + sec * 0.008)) * Math.PI / 180)) + this.heightDiv / 2}" y2="${radiusH * Math.round(-this.heightDiv / 2 * Math.cos(((hour * 30 + min * 0.5 + sec * 0.008)) * Math.PI / 180)) + this.heightDiv / 2}" stroke="black" stroke-width="${strokeHour}" stroke-linecap="round" />\n`;
        const lineMinute = `<line x1="${this.heightDiv / 2}" y1="${this.heightDiv / 2}" x2="${radiusM * Math.round(this.heightDiv / 2 * Math.sin(((min * 6 + sec * 0.1)) * Math.PI / 180)) + this.heightDiv / 2}" y2="${radiusM * Math.round(-this.heightDiv / 2 * Math.cos(((min * 6 + sec * 0.1)) * Math.PI / 180)) + this.heightDiv / 2}" stroke="black" stroke-width="${strokeMin}" stroke-linecap="round" />\n`;
        const lineSecond = `<line x1="${this.heightDiv / 2}" y1="${this.heightDiv / 2}" x2="${Math.round(this.heightDiv / 2 * Math.sin((sec * 6) * Math.PI / 180) + this.heightDiv / 2)}" y2="${Math.round(-this.heightDiv / 2 * Math.cos((sec * 6) * Math.PI / 180) + this.heightDiv / 2)}" stroke="black" stroke-width="${strokeSec}" stroke-linecap="round" />\n`;

        const innerHTMLSVG = `<circle cx="${this.heightDiv / 2}" cy="${this.heightDiv / 2}" r="${this.heightDiv / 2}" fill="yellow" />
        <text x="${this.heightDiv / 3}" y="${this.heightDiv / 3}" font-size="${this.heightDiv * 0.1}" fill="black">${strTime}</text>
        ${strHtml}
        ${lineHour + lineMinute + lineSecond}`;

        const headSVG = `<svg version="1.1"
        width="${this.heightDiv}" height="${this.heightDiv}"
        xmlns="http://www.w3.org/2000/svg" id="svg_id">
        ${innerHTMLSVG}
        </svg>`

        this.mainDiv.innerHTML = headSVG;
    }
}

export { ClockSVG };
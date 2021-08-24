class ViewCanvas {
    constructor(widthCanvas) {
        this.widthCanvas = widthCanvas;
        this.canvas = document.createElement('canvas');
        this.canvas.height = this.widthCanvas;
        this.canvas.width = this.widthCanvas;
        this.radiusSmallArc = Math.floor(this.widthCanvas * 0.07);
        this.border = Math.floor(this.radiusSmallArc * 0.25);
        this.radiusDrow = this.widthCanvas / 2 - this.radiusSmallArc - this.border;
        this.textCoordX = this.widthCanvas / 2 / 1.5;
        this.textCoordY = this.widthCanvas / 2 / 1.5;
    }

    drawCanvas() {
        let currentAngle = 0;
        const [strTime, hour, min, sec] = formatTime(); /* */

        const cvs = this.canvas.getContext('2d'); 
        cvs.clearRect(0, 0, this.widthCanvas, this.widthCanvas);    
        cvs.fillStyle = 'yellow';   

        cvs.beginPath();    
        cvs.arc(this.widthCanvas / 2, this.widthCanvas / 2, this.widthCanvas / 2, this.getRadian(0), this.getRadian(360));  
        cvs.fill(); 

        cvs.fillStyle = 'green';    
        cvs.font = `bold ${this.radiusSmallArc * 1.2}px serif`; 

        for (let i = 0; i < 12; i++) {
            const angle = getRadian(currentAngle);  
            const x = Math.round(this.radiusDrow * Math.sin(angle) + this.radiusDrow + this.radiusSmallArc + this.border);
            const y = Math.round(this.radiusDrow * Math.cos(angle) + this.radiusDrow + this.radiusSmallArc + this.border);
            
            cvs.beginPath();
            cvs.arc(x, y, this.radiusSmallArc, this.getRadian(0), this.getRadian(360));
            cvs.fill();
            cvs.fillStyle = 'white';
            cvs.fillText(12 - (6 + i) > 0 ? (6 - i) : 12 - (i - 6), 12 - (6 + i) > 0 || i > 8 ? x - this.radiusSmallArc / 2 + this.border / 2 : x - this.radiusSmallArc / 2 - this.border / 2, y + this.radiusSmallArc / 2 - this.border / 2);
            cvs.fillStyle = 'green';
            currentAngle += 30;
        }

        cvs.fillStyle = 'black';
        cvs.font = `${this.widthCanvas * 0.1}px serif`;
        cvs.fillText(strTime, this.textCoordX, this.textCoordY);  /* */

        const radiusH = 0.6;
        const radiusM = 0.8;
        const radiusS = 0.9;
        const strokeHour = 10;
        const strokeMin = 6;
        const strokeSec = 4;
        const xH = radiusH * Math.round(this.widthCanvas / 2 * Math.sin((hour * 30 + min * 0.5 + sec * 0.008) * Math.PI / 180)) + this.widthCanvas / 2;
        const yH = radiusH * Math.round(-this.widthCanvas / 2 * Math.cos((hour * 30 + min * 0.5 + sec * 0.008) * Math.PI / 180)) + this.widthCanvas / 2;
        const xM = radiusM * Math.round(this.widthCanvas / 2 * Math.sin(((min * 6 + sec * 0.1)) * Math.PI / 180)) + this.widthCanvas / 2;
        const yM = radiusM * Math.round(-this.widthCanvas / 2 * Math.cos(((min * 6 + sec * 0.1)) * Math.PI / 180)) + this.widthCanvas / 2;
        const xS = radiusS * Math.round(this.widthCanvas / 2 * Math.sin((sec * 6) * Math.PI / 180)) + this.widthCanvas / 2;
        const yS = radiusS * Math.round(-this.widthCanvas / 2 * Math.cos((sec * 6) * Math.PI / 180)) + this.widthCanvas / 2;

        cvs.lineCap = 'round';
        cvs.lineWidth = strokeHour;
        cvs.beginPath();
        cvs.moveTo(this.widthCanvas / 2, this.widthCanvas / 2);
        cvs.lineTo(xH, yH);
        cvs.stroke();

        cvs.lineWidth = strokeMin;
        cvs.beginPath();
        cvs.moveTo(this.widthCanvas / 2, this.widthCanvas / 2);
        cvs.lineTo(xM, yM);
        cvs.stroke();

        cvs.lineWidth = strokeSec;
        cvs.beginPath();
        cvs.moveTo(this.widthCanvas / 2, this.widthCanvas / 2);
        cvs.lineTo(xS, yS);
        cvs.stroke();

    }

    getRadian(angle){
        return (Math.PI / 180) * angle;
    }

}
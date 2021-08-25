class ClockDOM {
    constructor(param) {
        this.time = param.time;
        this.linkDOMelem = param.div;
        this.height = param.width;
        this.heightNumbers = this.height * 0.12;
        this.mainDiv = this.createMainDiv();
        this.arrayCoords = this.renderNumbers(this.height, this.heightNumbers);
        this.addNumbers();
        this.elements = this.renderClock();
    }

    draw(time) {
        const [str, hour, min, sec] = time;
        const [clockLikeNumbers, hourElem, minuteElem, secondElem] = this.elements;
        clockLikeNumbers.textContent = str;
        hourElem.setAttribute('style', `transform: rotate(${((hour + this.time) * 30 + min * 0.5 + sec * 0.008) + 90}deg)`);
        minuteElem.setAttribute('style', `transform: rotate(${(min * 6 + sec * 0.1) + 90}deg)`)
        secondElem.setAttribute('style', `transform: rotate(${(sec * 6) + 90}deg)`);  
    }

    renderClock(){
        const clockLikeNumbers = document.createElement('div');
        clockLikeNumbers.setAttribute('style', `position: absolute; top: ${(this.height / 2) / 2}px; left: ${(this.height / 2) / 1.5}px; height: ${this.height * 0.12}px; width: ${this.height * 0.32}px; font-size: ${this.height * 0.1}px;`);
        clockLikeNumbers.classList.add('clock');
        this.mainDiv.appendChild(clockLikeNumbers);
        
        const clockArrows = document.createElement('div');
        clockArrows.classList.add('arrows');
        const divHour = document.createElement('div');
        const divMinute = document.createElement('div');
        const divSecond = document.createElement('div');
    
        const hourArrow = document.createElement('div');
        hourArrow.setAttribute('style', `height: ${this.height * 0.025}px; width: 60%;`);
        hourArrow.classList.add('arrowsStyle');
        const hourArrowBlack = document.createElement('div');
        hourArrowBlack.setAttribute('style', 'height: 100%; width: 50%; background-color: black; border-radius: 7.5px;')
        hourArrow.appendChild(hourArrowBlack);
        divHour.appendChild(hourArrow);
        clockArrows.appendChild(divHour);
    
        const minuteArrow = document.createElement('div');
        minuteArrow.setAttribute('style', `height: ${this.height * 0.015}px; width: 80%;`);
        minuteArrow.classList.add('arrowsStyle');
        const minuteArrowBlack = document.createElement('div');
        minuteArrowBlack.setAttribute('style', 'height: 100%; width: 50%; background-color: black; border-radius: 4.5px;')
        minuteArrow.appendChild(minuteArrowBlack);
        divMinute.appendChild(minuteArrow);
        clockArrows.appendChild(divMinute);
    
        const secondArrow = document.createElement('div');
        secondArrow.setAttribute('style', `height: ${this.height * 0.007}px; width: 100%;`);
        secondArrow.classList.add('arrowsStyle');
        const secondArrowBlack = document.createElement('div');
        secondArrowBlack.setAttribute('style', 'height: 100%; width: 50%; background-color: black; border-radius: 4.5px;')
        secondArrow.appendChild(secondArrowBlack);
        divSecond.appendChild(secondArrow);
        clockArrows.appendChild(divSecond);
    
        this.mainDiv.appendChild(clockArrows);
        this.linkDOMelem.innerHTML = '';
        this.linkDOMelem.appendChild(this.mainDiv);

        return [clockLikeNumbers, divHour, divMinute, divSecond];
    }

    renderNumbers(height, heightNumbers) {
        const countNumbers = 12;
        const constAngle = 30;
        const arrayCoord = [];
        let currentAngle = 0;
        const radius = (height / 2) * 0.95 - heightNumbers / 2;

        for (let i = 0; i < countNumbers; i++) {
            arrayCoord.push([Math.round(radius * Math.sin(currentAngle * Math.PI / 180)), Math.round(radius * Math.cos(currentAngle * Math.PI / 180))])
            currentAngle += constAngle;
        }
        return arrayCoord;
    }

    addNumbers() {
        let number = 0;
        this.arrayCoords.forEach(value => {
            const divNumber = document.createElement('div');
            divNumber.setAttribute('style', `height: ${this.heightNumbers}px; width: ${this.heightNumbers}px; top: ${((this.height / 2) - value[1]) - this.heightNumbers / 2 + 'px'}; left: ${((this.height / 2) + value[0]) - this.heightNumbers / 2 + 'px'}; font-size: ${this.height * 0.08}px;`);
            divNumber.classList.add('numbers');
            divNumber.textContent = number++;
            this.mainDiv.appendChild(divNumber);
        })
        this.mainDiv.firstChild.textContent = '12';
    }

    createMainDiv() {
        const div = document.createElement('div');
        div.setAttribute('style', `height: ${this.height}px; width: ${this.height}px;`);
        div.classList.add('maindiv');
        
        return div;
    }
}

export { ClockDOM };
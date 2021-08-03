function createClock() {
    const height = 500;
    const heightNumbers = height * 0.12;
    const div = document.createElement('div');
    div.setAttribute('style', `height: ${height}px; width: ${height}px;`);
    div.classList.add('maindiv');
    document.body.appendChild(div);

    const arrayCoords = renderNumbers(height, heightNumbers);

    let number = 0;
    arrayCoords.forEach(value => {
        const divNumber = document.createElement('div');
        divNumber.setAttribute('style', `height: ${heightNumbers}px; width: ${heightNumbers}px; top: ${((height / 2) - value[1]) - heightNumbers / 2 + 'px'}; left: ${((height / 2) + value[0]) - heightNumbers / 2 + 'px'}; font-size: ${height * 0.08}px;`);
        divNumber.classList.add('numbers');
        divNumber.textContent = number++;
        div.appendChild(divNumber);
    })
    div.firstChild.textContent = '12';

    const clockLikeNumbers = document.createElement('div');
    clockLikeNumbers.setAttribute('style', `position: absolute; top: ${(height / 2) / 2}px; left: ${(height / 2) / 1.5}px; height: ${height * 0.12}px; width: ${height * 0.32}px; font-size: ${height * 0.1}px;`)
    clockLikeNumbers.classList.add('clock');
    clockLikeNumbers.textContent = formatTime()[0];
    div.appendChild(clockLikeNumbers);

    const [str, hour, min, sec] = formatTime();
    const clockArrows = document.createElement('div');
    clockArrows.classList.add('arrows');
    const divHour = document.createElement('div');
    divHour.setAttribute('style', `transform: rotate(${(hour * 30 + min * 0.5 + sec * 0.008) + 90}deg)`);
    const divMinute = document.createElement('div');
    divMinute.setAttribute('style', `transform: rotate(${(min * 6 + sec * 0.1) + 90}deg)`);
    const divSecond = document.createElement('div');
    divSecond.setAttribute('style', `transform: rotate(${(sec * 6) + 90}deg)`);

    const hourArrow = document.createElement('div');
    hourArrow.setAttribute('style', `height: ${height * 0.025}px; width: 60%;`);
    hourArrow.classList.add('arrowsStyle');
    const hourArrowBlack = document.createElement('div');
    hourArrowBlack.setAttribute('style', 'height: 100%; width: 50%; background-color: black; border-radius: 7.5px;')
    hourArrow.appendChild(hourArrowBlack);
    divHour.appendChild(hourArrow);
    clockArrows.appendChild(divHour);

    const minuteArrow = document.createElement('div');
    minuteArrow.setAttribute('style', `height: ${height * 0.015}px; width: 80%;`);
    minuteArrow.classList.add('arrowsStyle');
    const minuteArrowBlack = document.createElement('div');
    minuteArrowBlack.setAttribute('style', 'height: 100%; width: 50%; background-color: black; border-radius: 4.5px;')
    minuteArrow.appendChild(minuteArrowBlack);
    divMinute.appendChild(minuteArrow);
    clockArrows.appendChild(divMinute);

    const secondArrow = document.createElement('div');
    secondArrow.setAttribute('style', `height: ${height * 0.007}px; width: 100%;`);
    secondArrow.classList.add('arrowsStyle');
    const secondArrowBlack = document.createElement('div');
    secondArrowBlack.setAttribute('style', 'height: 100%; width: 50%; background-color: black; border-radius: 4.5px;')
    secondArrow.appendChild(secondArrowBlack);
    divSecond.appendChild(secondArrow);
    clockArrows.appendChild(divSecond);

    div.appendChild(clockArrows)

    timer([clockLikeNumbers, divHour, divMinute, divSecond]);
}

function renderNumbers(height, heightNumbers) {
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

createClock();

function timer(elements) {
    const [clock, hourElem, minuteElem, secondElem] = elements;
    setInterval(() => {
        let [str, hour, min, sec, ml] = formatTime();
        clock.textContent = str;
        hourElem.setAttribute('style', `transform: rotate(${(hour * 30 + min * 0.5 + sec * 0.008) + 90}deg)`);
        minuteElem.setAttribute('style', `transform: rotate(${(min * 6 + sec * 0.1) + 90}deg)`)
        secondElem.setAttribute('style', `transform: rotate(${(sec * 1000 + ml) * 0.006 + 90}deg)`);
    }, 10);
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
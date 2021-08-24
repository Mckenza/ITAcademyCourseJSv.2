

class ModelClock {
    constructor() {
        
    }

    formatTime() {
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
}
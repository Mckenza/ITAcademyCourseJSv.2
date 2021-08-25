
class ModelClock {
    constructor(view, time) {
        this.timeZone = time;
        this.timeNow = this.formatTime();
        this.view = view;
        this.runTimer = true;
        this.updateTime();
    }

    setRunTimer(value){
        this.runTimer = value;
    }

    getRunTimer(){
        return this.runTimer;
    }

    setTimeZone(value){
        this.timeZone = value
    }

    formatTime() {
        let strTime = '';
        const timeNow = new Date();
        if (timeNow.getHours() + this.timeZone < 10) {
            strTime += ('0' + (timeNow.getHours() + this.timeZone) + ':');
        } else {
            strTime += (timeNow.getHours() + this.timeZone) + ':';
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

    updateTime() {
        this.view.draw(this.timeNow);
        setInterval(() => {
            if(this.runTimer){
                this.timeNow = this.formatTime();
                this.view.draw(this.timeNow);
            }
        }, 1000)
    }

    getTime() {
        return this.timeNow;
    }

}

export { ModelClock };
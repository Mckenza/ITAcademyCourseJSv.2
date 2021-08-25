import { Controller } from './controller/clockController.js';
import { ModelClock } from './model/clock.js';
import { ViewCanvas } from './view/clockViewCanvas.js';
import { ClockSVG } from './view/clockViewSVG.js';
import { ClockDOM } from './view/clockViewDOM.js';

class Init{
    constructor(){
        this.height = 340;
        this.width = 300;
        this.mainDiv = this.createEnvironment();
        this.createCanvas({str: 'Нью-Йорк (GTM - 4)', time: -7});
        this.createSVG({str: 'Лондон (GTM + 1)', time: -2})
        this.createDOM({str: 'Берлин (GTM + 2)', time: -1});
        this.createCanvas({str: 'Минск (GTM + 3)', time: 0});
        this.createSVG({str: 'Токио (GTM + 9)', time: 6});
        this.createDOM({str: 'Владивосток (GTM + 10)', time: 7});
    }

    createEnvironment(){
        const env = document.createElement('div');
        env.setAttribute('class', 'environment');
        document.body.appendChild(env);
        return env;
    }

    createCanvas(data){
        const divWrap = document.createElement('div');
        divWrap.setAttribute('class', 'wrapDiv');

        const divManage = document.createElement('div');
        divManage.setAttribute('class', 'manage_buttons');
        const buttonStart = document.createElement('input');
        buttonStart.setAttribute('type', 'button');
        buttonStart.setAttribute('class', 'buttons_view');
        buttonStart.setAttribute('value', 'Start');
        const buttonStop = document.createElement('input');
        buttonStop.setAttribute('type', 'button');
        buttonStop.setAttribute('class', 'buttons_view');
        buttonStop.setAttribute('value', 'Stop');
        const clockCity = document.createElement('div');
        clockCity.textContent = data.str;

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);

        divManage.appendChild(buttonStart);
        divManage.appendChild(buttonStop);
        divManage.appendChild(clockCity);
        divWrap.appendChild(divManage);
        divWrap.appendChild(canvas);

        this.mainDiv.appendChild(divWrap);
        const params = {
            buttonStop: buttonStop,
            buttonStart: buttonStart,
            canvas: canvas,
            width: this.width,
            time: data.time,
        }

        const canvasObj = new Controller(ViewCanvas, ModelClock, params);
    }

    createSVG(data){
        const divWrap = document.createElement('div');
        divWrap.setAttribute('class', 'wrapDiv');

        const divManage = document.createElement('div');
        divManage.setAttribute('class', 'manage_buttons');
        const buttonStart = document.createElement('input');
        buttonStart.setAttribute('type', 'button');
        buttonStart.setAttribute('class', 'buttons_view');
        buttonStart.setAttribute('value', 'Start');
        const buttonStop = document.createElement('input');
        buttonStop.setAttribute('type', 'button');
        buttonStop.setAttribute('class', 'buttons_view');
        buttonStop.setAttribute('value', 'Stop');
        const clockCity = document.createElement('div');
        clockCity.textContent = data.str;

        const divField = document.createElement('div');
        divField.setAttribute('style', `width: ${this.width}px; height: ${this.width}px`);


        divManage.appendChild(buttonStart);
        divManage.appendChild(buttonStop);
        divManage.appendChild(clockCity);
        divWrap.appendChild(divManage);
        divWrap.appendChild(divField);

        this.mainDiv.appendChild(divWrap);
        const params = {
            buttonStop: buttonStop,
            buttonStart: buttonStart,
            div: divField,
            width: this.width,
            time: data.time,
        }

        const svgObj = new Controller(ClockSVG, ModelClock, params);
    }

    createDOM(data){
        const divWrap = document.createElement('div');
        divWrap.setAttribute('class', 'wrapDiv');

        const divManage = document.createElement('div');
        divManage.setAttribute('class', 'manage_buttons');
        const buttonStart = document.createElement('input');
        buttonStart.setAttribute('type', 'button');
        buttonStart.setAttribute('class', 'buttons_view');
        buttonStart.setAttribute('value', 'Start');
        const buttonStop = document.createElement('input');
        buttonStop.setAttribute('type', 'button');
        buttonStop.setAttribute('class', 'buttons_view');
        buttonStop.setAttribute('value', 'Stop');
        const clockCity = document.createElement('div');
        clockCity.textContent = data.str;

        const divField = document.createElement('div');
        divField.setAttribute('style', `width: ${this.width}px; height: ${this.width}px`);


        divManage.appendChild(buttonStart);
        divManage.appendChild(buttonStop);
        divManage.appendChild(clockCity);
        divWrap.appendChild(divManage);
        divWrap.appendChild(divField);

        this.mainDiv.appendChild(divWrap);
        const params = {
            buttonStop: buttonStop,
            buttonStart: buttonStart,
            div: divField,
            width: this.width,
            time: data.time,
        }

        const domObj = new Controller(ClockDOM, ModelClock, params);
    }
}

const init = new Init();
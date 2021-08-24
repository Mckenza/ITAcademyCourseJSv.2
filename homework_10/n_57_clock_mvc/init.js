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
        this.createCanvas();
        this.createSVG()
        this.createCanvas();
        this.createSVG();
        this.createDOM();
        this.createDOM();
    }

    createEnvironment(){
        const env = document.createElement('div');
        env.setAttribute('class', 'environment');
        document.body.appendChild(env);
        return env;
    }

    createCanvas(){
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

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);

        divManage.appendChild(buttonStart);
        divManage.appendChild(buttonStop);
        divWrap.appendChild(divManage);
        divWrap.appendChild(canvas);

        this.mainDiv.appendChild(divWrap);
        const params = {
            buttonStop: buttonStop,
            buttonStart: buttonStart,
            canvas: canvas,
            width: this.width,
        }

        const canvasObj = new Controller(ViewCanvas, ModelClock, params);
    }

    createSVG(){
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

        const divField = document.createElement('div');
        divField.setAttribute('style', `width: ${this.width}px; height: ${this.width}px`);


        divManage.appendChild(buttonStart);
        divManage.appendChild(buttonStop);
        divWrap.appendChild(divManage);
        divWrap.appendChild(divField);

        this.mainDiv.appendChild(divWrap);
        const params = {
            buttonStop: buttonStop,
            buttonStart: buttonStart,
            div: divField,
            width: this.width,
        }

        const svgObj = new Controller(ClockSVG, ModelClock, params);
    }

    createDOM(){
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

        const divField = document.createElement('div');
        divField.setAttribute('style', `width: ${this.width}px; height: ${this.width}px`);


        divManage.appendChild(buttonStart);
        divManage.appendChild(buttonStop);
        divWrap.appendChild(divManage);
        divWrap.appendChild(divField);

        this.mainDiv.appendChild(divWrap);
        const params = {
            buttonStop: buttonStop,
            buttonStart: buttonStart,
            div: divField,
            width: this.width,
        }

        const domObj = new Controller(ClockDOM, ModelClock, params);
    }
}

const init = new Init();
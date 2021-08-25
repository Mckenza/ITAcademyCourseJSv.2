class Controller{
    constructor(view, model, params){
        this.params = params;
        this.view = new view(params);
        this.model = new model(this.view, params.time);
        this.events();
    }

    setTimeZone(){
        this.model.setTimeZone(this.params.time);
    }

    events(){
        this.params.buttonStop.onclick = () =>{
            if(this.model.getRunTimer()){
                this.model.setRunTimer(false);
            }
        }

        this.params.buttonStart.onclick = () =>{
            if(!this.model.getRunTimer()){
                this.model.setRunTimer(true);
            }
        }
    }
}

export { Controller };
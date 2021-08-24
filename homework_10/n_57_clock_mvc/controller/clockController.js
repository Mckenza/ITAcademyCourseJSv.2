class Controller{
    constructor(view, model, params){
        this.view = new view(params);
        this.model = new model(this.view);
        this.params = params;
        this.events();
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
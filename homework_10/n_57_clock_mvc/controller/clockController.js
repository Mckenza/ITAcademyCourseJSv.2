
class Controller{
    constructor(view, paramsView, model){
        this.view = new view(paramsView);
        this.model = new model();
    }

    events(start, stop){
        
    }
}
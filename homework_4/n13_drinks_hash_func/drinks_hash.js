function HashStorageFunc(){
    this.data = {};
    
    this.addValue = function(key, value){
        if(typeof key === 'string' || !value){
            this.data[key] = value;
        }
    }

    this.getValue = function(key){
        if(this.data[key]){
            return -1;
        } else {
            return this.data[key];
        }
    }

    this.deleteValue = function(key){
        if(key in this.data){
            delete this.data[key];
            return true;
        } else {
            return false;
        }
    }

    this.getKey = function(){
        const arrayKeys = Object.keys(this.data);
        if(arrayKeys.length === 0){
            return arrayKeys;
        } else {
            return false;
        }
    }
}
const data = {};

class HashStorageClass{
    
    constructor(data){
        this.data = data;
    }
    
    addValue(key, value){
        if(typeof key === 'string' || !value){
            this.data[key] = value;
        }
    }

    getValue(key){
        if(!this.data[key]){
            return false;
        } else {
            return this.data[key];
        }
    }

    deleteValue(key){
        if(key in this.data){
            delete this.data[key];
            return true;
        } else {
            return false;
        }
    }

    getKey(){
        const arrayKeys = Object.keys(this.data);
        if(arrayKeys.length !== 0){
            return arrayKeys;
        } else {
            return false;
        }
    }
}

const inputNameDrink = document.getElementById('input_name_id');
const inputRecipe = document.getElementById('input_recipe_id');
const checkAlco = document.getElementById('check_alcohol_id');
const getInfoInput = document.getElementById('get_info_id');
const showInfoDiv = document.getElementById('fullInfo_id');

const logic = new HashStorageClass({});

document.getElementById('add_button').onclick = () =>{
    if(!inputNameDrink.value){
        styleBoard(inputNameDrink);
    } 
    if (!inputRecipe.value){
        styleBoard(inputRecipe);
    } else {
        const isAlco = checkAlco.checked;
        logic.addValue(inputNameDrink.value, {recipe: inputRecipe.value, alco: isAlco});
    }
}

document.getElementById('get_button').onclick = () =>{
    if(!getInfoInput.value){
        styleBoard(getInfoInput);
    } else {
        const item = logic.getValue(getInfoInput.value);
        if(!item){
            styleBoard(getInfoInput);
        } else {
            showInfoDiv.textContent = `Название: ${getInfoInput.value}
            Рецепт: ${item.recipe}
            Алкогольный? - ${item.alco ? 'Да' : 'Нет'}`;
        }
    }
}

document.getElementById('del_button').onclick = () =>{
    if(!getInfoInput.value){
        styleBoard(getInfoInput);
    } else {
        logic.deleteValue(getInfoInput.value);
        showInfoDiv.textContent = '';
    }
}

document.getElementById('all_list_button').onclick = () =>{
    const arrayKeys = logic.getKey();
    if(!arrayKeys){
        showInfoDiv.textContent = 'нет элементов списка';
    } else {
        let str = '';
        arrayKeys.forEach((value, index) =>{
            str += `${(index + 1)}. ${value} `;
        })
        showInfoDiv.textContent = str;
    }
}

function styleBoard(element){
    setTimeout(()=>{
        element.classList.remove('borderred');
    }, 2000);
    element.classList.add('borderred');
}
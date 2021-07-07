function HashStorageFunc(){
    const data = {};
    
    this.addValue = function(key, value){
        if(typeof key === 'string'){
            data[key] = value;
        }
    }

    this.getValue = function(key){
        if(!data[key]){
            return undefined;
        } else {
            return data[key];
        }
    }

    this.deleteValue = function(key){
        if(key in data){
            delete data[key];
            return true;
        } else {
            return false;
        }
    }

    this.getKey = function(){
        const arrayKeys = Object.keys(data);
        return arrayKeys;
    }
}

const inputNameDrink = document.getElementById('input_name_id');
const inputRecipe = document.getElementById('input_recipe_id');
const checkAlco = document.getElementById('check_alcohol_id');
const getInfoInput = document.getElementById('get_info_id');
const showInfoDiv = document.getElementById('fullInfo_id');

const logic = new HashStorageFunc();

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
    if(arrayKeys.length === 0){
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
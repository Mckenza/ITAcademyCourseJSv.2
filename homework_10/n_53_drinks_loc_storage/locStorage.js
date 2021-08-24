function LocStorage(type){
    this.type = type;
    checkLocal.call(this);
    const data = JSON.parse(localStorage.getItem(this.type));

    function checkLocal(){
        if(!JSON.parse(localStorage.getItem(this.type))){
            console.log('sdf');
            localStorage.setItem(this.type, JSON.stringify({}));
        }
    }

    this.setLocal = function(){
        localStorage.setItem(this.type, JSON.stringify(data));
    }
    
    this.addValue = function(key, value){
        if(typeof key === 'string'){
            data[key] = value;
            this.setLocal();
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
            this.setLocal();
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

const logic = new LocStorage('dataDrinks');

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

/* ----------------------------------------------------------- */

const inputNameDish = document.getElementById('input_name_id_dish');
const inputRecipeDish = document.getElementById('input_recipe_id_dish');
const getInfoInputDish = document.getElementById('get_info_id_dish');
const showInfoDivDish = document.getElementById('fullInfo_id_dish');

const logicDish = new LocStorage('dataDish');

document.getElementById('add_button_dish').onclick = () =>{
    if(!inputNameDish.value){
        styleBoard(inputNameDish);
    } 
    if (!inputRecipeDish.value){
        styleBoard(inputRecipeDish);
    } else {
        logicDish.addValue(inputNameDish.value, {recipe: inputRecipeDish.value,});
    }
}

document.getElementById('get_button_dish').onclick = () =>{
    if(!getInfoInputDish.value){
        styleBoard(getInfoInputDish);
    } else {
        const item = logicDish.getValue(getInfoInputDish.value);
        if(!item){
            styleBoard(getInfoInputDish);
        } else {
            showInfoDivDish.textContent = `Название: ${getInfoInputDish.value}
            Рецепт: ${item.recipe}`;
        }
    }
}

document.getElementById('del_button_dish').onclick = () =>{
    if(!getInfoInputDish.value){
        styleBoard(getInfoInputDish);
    } else {
        logicDish.deleteValue(getInfoInputDish.value);
        showInfoDivDish.textContent = '';
    }
}

document.getElementById('all_list_button_dish').onclick = () =>{
    const arrayKeys = logicDish.getKey();
    if(arrayKeys.length === 0){
        showInfoDivDish.textContent = 'нет элементов списка';
    } else {
        let str = '';
        arrayKeys.forEach((value, index) =>{
            str += `${(index + 1)}. ${value} `;
        })
        showInfoDivDish.textContent = str;
    }
}

function styleBoard(element){
    setTimeout(()=>{
        element.classList.remove('borderred');
    }, 2000);
    element.classList.add('borderred');
}
function LocStorage(type){
    this.type = type;
    checkLocal.call(this);
    let data = JSON.parse(localStorage.getItem(this.type));

    this.getData = function(){
        return data;
    }

    function checkLocal(){
        if(!JSON.parse(localStorage.getItem(this.type))){
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

    this.send = function(){
        ajax(data);
    }

    this.setData = function(d){
        data = d;
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
        ajax(logic.getData());
        
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

function ajax(dataSend){
    console.log(dataSend)
    const url = 'https://fe.it-academy.by/AjaxStringStorage2.php';
    const nameStr = 'buyak_eugene_drinks_ajax';
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'JSON',
        data: {
            f: 'READ',
            n: nameStr,
        },
        success: resolve,
        error: reject,
    })

    function resolve(data){
        if(data.result !== ''){
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'JSON',
                data: {
                    f: 'INSERT',
                    n: nameStr,
                    v: JSON.stringify(dataSend),
                },

                success: resolve_,
                error: reject_,
            });

            function resolve_(data){
                console.log(data);
                ajaxUpdate(logic.getData());
            }

            function reject_(){
                console.log('error insert');
                return data;
            }
        }
    }

    function reject(){
        console.log('bad');
        return;
    }
}

function ajaxUpdate(dataStr){
    const url = 'https://fe.it-academy.by/AjaxStringStorage2.php';
    const nameStr = 'buyak_eugene_drinks_ajax';
    const pass = '123456Zz';
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            f: 'LOCKGET',
            n: nameStr,
            p: pass,
        },
        success: resolve,
        error: reject,
    });

    function resolve(data){
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'JSON',
            data: {
                f: 'UPDATE',
                n: nameStr,
                p: pass,
                v: JSON.stringify(dataStr),
            },
            success: resolve_f,
            error: reject_f,
        });
    
        function resolve_f(data){
            console.log(data);
            logic.setData(data);
        }
    
        function reject_f(){
            console.log('upadate - bad');
        }
    }

    function reject(){
        console.log('lockget - bad');
    }
}

function test(){
    ajaxUpdate(logic.getData());
}



function styleBoard(element){
    setTimeout(()=>{
        element.classList.remove('borderred');
    }, 2000);
    element.classList.add('borderred');
}
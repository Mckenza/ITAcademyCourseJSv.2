function random(start, end){
    const randomValue = Math.floor(Math.random() * (end - start) + start);
    return randomValue;
}

function mood(colorsCount){
    const arrayColors = ['оранжевый', 'красный', 'желтый', 'зеленый', 'голубой', 'синий', 'фиолетовый', 'черный'];

    if(colorsCount > arrayColors.length || colorsCount <= 0){
        console.log('Неправильное значение');
        return false;
    }
    console.log('Цветов: ' + colorsCount);
    
    const objColor = {};
    for(let i = 0; i < colorsCount; i++){
        for( ; ; ){
            let valueColor = arrayColors[random(0, arrayColors.length)];
            if(valueColor in objColor){
                continue;
            } else {
                objColor[valueColor] = 1;
                break;
            }
        } 
    }
    return objColor;
}

const obj = mood(3);
if(obj){
    alert(Object.keys(obj).toString());
}







/* --------------- */

/*
function random(start, end){
    const randomValue = Math.floor(Math.random() * (end - start) + start);
    return randomValue;
}

function mood(colorsCount){
    const arrayColors = ['оранжевый', 'красный', 'желтый', 'зеленый', 'голубой', 'синий', 'фиолетовый', 'черный'];
    const arrayDelete = [...arrayColors];

    console.log('Цветов: ' + colorsCount);
    
    const objColor = {};
    for(let i = 0; i < colorsCount; i++){
        let randomValue = random(0, arrayDelete.length);
        let valueColor = arrayDelete[randomValue];
        objColor[valueColor] = 1;
        arrayDelete.splice(randomValue, 1);
    }
    return objColor;
}

const obj = mood(3);
if(obj){
    console.log(Object.keys(obj).toString());
}

*/
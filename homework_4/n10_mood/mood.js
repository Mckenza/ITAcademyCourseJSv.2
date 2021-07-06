function random(start, end){
    const randomValue = Math.floor(Math.random() * (end - start) + start);
    return randomValue;
}

function mood(colorsCount){
    const arrayColors = ['оранжевый', 'красный', 'желтый', 'зеленый', 'голубой', 'синий', 'фиолетовый', 'черный', ];

    if(colorsCount > arrayColors.length){
        console.log('Цветов в масиве меньше, чем введенное значение');
        return;
    }
    console.log('Цветов: ' + colorsCount);
    
    const objColor = {};
    for(let i = 0; i < colorsCount; i++){
        let valueArray = arrayColors[random(0, arrayColors.length)];
        if(valueArray in objColor){
            i--;
        } else {
            objColor[valueArray] = 1;
        }
    }

    return objColor;
}

const obj = mood(3);
console.log(Object.keys(obj).toString());

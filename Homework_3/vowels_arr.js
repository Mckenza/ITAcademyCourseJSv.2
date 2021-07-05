const objLetters = {
    'а': 0,
    'о': 0,
    'и': 0,
    'е': 0,
    'ё': 0,
    'э': 0,
    'ы': 0,
    'у': 0,
    'ю': 0,
    'я': 0,
    sum: 0,
}

/* ForEach */
function countLetters(str){
    const bufArray = Array.from(str.toString().toLowerCase());
    bufArray.forEach((value) =>{
        if(value in objLetters){
            objLetters.sum++;
        }
    });
    return objLetters.sum;
}

alert('Согласных букв: ' + countLetters(prompt('Введите строку (ForEach)')));
console.log(objLetters);
clearObj();           // очищаю объект от значений перед следующим поиском                                                          

/* filter */
function countLettersFilter(str){
    const bufArray = Array.from(str.toString().toLowerCase());
    const array = bufArray.filter(value => value in objLetters);
    return array.length;
}

alert('Согласных букв: ' + countLettersFilter(prompt('Введите строку (filter)')));
console.log(objLetters);
clearObj();

/* reduce */
function countLettersReduce(str){
    const bufArray = Array.from(str.toString().toLowerCase());
    objLetters.sum = bufArray.reduce((acc, value) =>{
        if(value in objLetters){
            acc++;
        }
        return acc;
    }, 0);

    return objLetters.sum;
}

alert('Согласных букв: ' + countLettersReduce(prompt('Введите строку (reduce)')));
console.log(objLetters);
//clearObj();




function clearObj(){
    for(let value in objLetters){
        objLetters[value] = 0;
    }
}
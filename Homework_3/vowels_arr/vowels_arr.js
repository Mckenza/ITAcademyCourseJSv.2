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
}

/* ForEach */
function countLetters(str){
    let sum = 0;
    const bufArray = Array.from(str.toString().toLowerCase());
    bufArray.forEach((value) =>{
        if(value in objLetters){
            sum++;
        }
    });
    return sum;
}

alert('Согласных букв: ' + countLetters(prompt('Введите строку (ForEach)')));                                                 

/* filter */
function countLettersFilter(str){
    const bufArray = Array.from(str.toString().toLowerCase());
    const array = bufArray.filter(value => value in objLetters);
    return array.length;
}

alert('Согласных букв: ' + countLettersFilter(prompt('Введите строку (filter)')));

/* reduce */
function countLettersReduce(str){
    let sum = 0;
    const bufArray = Array.from(str.toString().toLowerCase());
    sum = bufArray.reduce((acc, value) =>{
        if(value in objLetters){
            acc++;
        }
        return acc;
    }, 0);

    return sum;
}

alert('Согласных букв: ' + countLettersReduce(prompt('Введите строку (reduce)')));
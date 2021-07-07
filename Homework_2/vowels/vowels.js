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

alert('Согласных букв: ' + countLetters(prompt('Введите строку')));
console.log(objLetters);

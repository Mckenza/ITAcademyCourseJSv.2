
const testStr = '(6+10-4)/(1+1*2)+1';
const test = ('5*2+10');


const obj = {
    '/': 2,
    '*': 2,
    '+': 1,
    '-': 1,
}


function calc(str){
    const buffArray = parseStr(str);

    const operandArray = [];
    const numbersArray = [];

    buffArray.forEach(value =>{
        if(value === '('){
            operandArray.push('(');
        } else if(value === ')'){
            while(true){
                let del = operandArray.pop();
                if(del === '('){
                    break;
                }
                numbersArray.push(del);   
            }
        } else {
            if(value in obj){
                if(obj[value] === obj[operandArray[operandArray.length - 1]]){
                    numbersArray.push(operandArray.pop());
                    operandArray.push(value);
                } else if (obj[value] > obj[operandArray[operandArray.length - 1]]){
                    operandArray.push(value);
                } else if (obj[value] < obj[operandArray[operandArray.length - 1]]) {
                    numbersArray.push(operandArray.pop())
                    operandArray.push(value);
                } else {
                    operandArray.push(value);
                }
            } else {
                numbersArray.push(value);
            }
        }
    });

    if(operandArray.length !== 0){
        for(let i = 0; i < operandArray.length; i++){
            numbersArray.push(operandArray.pop());
        }
    }
    
    return numbersArray;
}

function parseStr(str){
    const arrayBuf = Array.of(...str);
    let bufLetter = '';
    const returnArray = [];

    arrayBuf.map(value =>{

        if(value in obj || value === '(' || value === ')'){
            if(bufLetter){
                returnArray.push(bufLetter);
                bufLetter = '';
            }
            returnArray.push(value);
        } else {
            bufLetter += value;
        }
    });
    if(bufLetter){
        returnArray.push(bufLetter);
    }
    return returnArray;
}

function revers(array){
    const bufArray = [];
    const argsArray = [...array];

    argsArray.map((value, index) =>{
        if(value in obj){
            let first = Number(bufArray.pop());
            let second = Number(bufArray.pop());
            if(value === '*'){
                bufArray.push(second * first);
            }
            if(value === '/'){
                bufArray.push(second / first);
            }
            if(value === '+'){
                bufArray.push(second + first);
            }
            if(value === '-'){
                bufArray.push(second - first);
            }
        } else {
            bufArray.push(Number(argsArray[index]));
        }
        console.log(bufArray, '-----');
    })

    return bufArray;
}

console.log(calc(testStr));
console.log(calc(test));

console.log(revers(calc(testStr)));
console.log(revers(calc(test)));
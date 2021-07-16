const testStr = '-6+(-6+10-4)*(1+1*-2)+1+-1';
const test = '-2*(-5-4)';
const teeeest = '2*(-3+1)';

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
                if(obj[value] <= obj[operandArray[operandArray.length - 1]]){
                    numbersArray.push(operandArray.pop());
                    operandArray.push(value);
                } else if (obj[value] > obj[operandArray[operandArray.length - 1]]) {
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

    returnArray.map((value, index) =>{
        if(value === '-'){
            if(index === 0){
                returnArray.splice(0, 2, `-${returnArray[index + 1]}`);
            } else if (returnArray[index - 1] in obj || returnArray[index - 1] === '('){
                returnArray.splice(index, 2, `-${returnArray[index + 1]}`);
            }
        } 
    })
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
    })

    return bufArray;
}

console.log(testStr);
console.log(revers(calc(testStr))[0]);
console.log(test);
console.log(revers(calc(test))[0]);
console.log(teeeest);
console.log(revers(calc(teeeest))[0]);
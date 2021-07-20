const obj = {
    '/': 2,
    '*': 2,
    '+': 1,
    '-': 1,
}

function calc(str) {
    const buffArray = parseStr(str);

    const operandArray = [];
    const numbersArray = [];

    buffArray.forEach(value => {
        if (value === '(') {
            operandArray.push('(');
        } else if (value === ')') {
            while (true) {
                let del = operandArray.pop();
                if (del === '(') {
                    break;
                }
                numbersArray.push(del);
            }
        } else {
            if (value in obj) {
                if (obj[value] <= obj[operandArray[operandArray.length - 1]]) {
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

    if (operandArray.length !== 0) {
        for (let i = operandArray.length - 1; i >= 0; i--) {
            numbersArray.push(operandArray[i]);
        }
    }
    return numbersArray;
}

function parseStr(str) {
    const arrayBuf = Array.of(...str);
    let bufLetter = '';
    const returnArray = [];

    arrayBuf.map(value => {

        if (value in obj || value === '(' || value === ')') {
            if (bufLetter) {
                returnArray.push(bufLetter);
                bufLetter = '';
            }
            returnArray.push(value);
        } else {
            bufLetter += value;
        }
    });
    if (bufLetter) {
        returnArray.push(bufLetter);
    }

    returnArray.map((value, index) => {
        if (value === '-') {
            if (index === 0) {
                returnArray.splice(0, 2, `-${returnArray[index + 1]}`);
            } else if (returnArray[index - 1] in obj || returnArray[index - 1] === '(') {
                returnArray.splice(index, 2, `-${returnArray[index + 1]}`);
            }
        }
    })
    return returnArray;
}

function revers(array) {
    const bufArray = [];
    const argsArray = [...array];

    argsArray.map((value, index) => {
        if (value in obj) {
            let first = Number(bufArray.pop());
            let second = Number(bufArray.pop());
            if (value === '*') {
                bufArray.push(second * first);
            }
            if (value === '/') {
                bufArray.push(second / first);
            }
            if (value === '+') {
                bufArray.push(second + first);
            }
            if (value === '-') {
                bufArray.push(second - first);
            }
        } else {
            bufArray.push(Number(argsArray[index]));
        }
    })
    return bufArray;
}

const input = document.getElementById('input_id');
document.getElementById('result').onclick = () => {
    const value = input.value;
    if (!value) {
        alert('Поле пустое');
        return;
    }
    alert(revers(calc(input.value))[0].toFixed(5))
}
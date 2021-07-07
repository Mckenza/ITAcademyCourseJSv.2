const testArray = [5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8,];

function treesum(array) {
    return array.reduce((acc, value) => {
        if (Array.isArray(value)) {
            value = treesum(value);
        }
        return acc += value;
    }, 0)
}

/* без вложенных функций  */

function dd(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            console.log(sum);
            sum += dd(array[i]);
            continue;
        }
        sum += array[i];
    }
    return sum;
}

console.log(`Без вложенных функций, Ответ: ${dd(testArray)}`);          // 50
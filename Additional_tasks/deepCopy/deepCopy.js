
function deepCopy(value) {
    if (typeof value === 'object' && value !== null) {
        return copyObj(value);
    }

    if (Array.isArray(value)) {
        return copyArray(value);
    }

    function copyObj(obj) {
        const newObj = {};
        for (let value in obj) {
            if (typeof obj[value] === 'object' && obj[value] !== null) {
                newObj[value] = copyObj(obj[value]);
                continue;
            }
            if (Array.isArray(obj[value])) {
                newObj[value] = copyArray(obj[value]);
                continue;
            }
            newObj[value] = obj[value];
        }
        return newObj;
    }

    function copyArray(array) {
        const newArray = [];
        for (let value of array) {
            if (Array.isArray(value)) {
                newArray.push(copyArray(value));
                continue;
            }
            if (typeof value === 'object' && value !== null) {
                newArray.push(copyObj(value));
            }
            newArray.push(value);
        }
        return newArray;
    }
    return value;
}

const one = {
    a: 1,
    b: 2,
    c: {
        d: 4,
        e: {
            f: 10,
            ddddd: true,
            dd: [{
                aaa: 1,
                aa2: [1, 4, 3],
                aaa3: null,
            }, [1, 3, 4]]
        }
    },
    g: [1, 2, 3],
    unde: undefined,
    n: NaN,
    number: 54,
    bool: true,
    testf: {
        f: true,
        f3: [1, 5, 2, [5, 3, 5]],
    },
    f: [null, undefined]
};

function test(objForCopy) {
    const copyObj = deepCopy(objForCopy);
    const report = {};

    if (typeof copyObj === 'object' && typeof objForCopy === 'object' && copyObj !== null) {
        searchAllKeys([objForCopy, copyObj], ['obj', 'copy']);
    } else {
        checkAll(objForCopy, copyObj);
    }

    function searchAllKeys(arrayObj, str) {
        const keys = Object.keys(arrayObj[0]);
        keys.forEach(value => {
            report[`${str[0]} === ${str[1]} => ${nanAndArray(arrayObj[0])}`] = (arrayObj[0] === arrayObj[1]);
            if (typeof arrayObj[0][value] === 'object' && typeof arrayObj[1][value] === 'object' && arrayObj[0][value] !== null) {
                if (arrayObj[0][value] === arrayObj[1][value]) {
                    console.log('тест провален - не глубокая копия', arrayObj[0][value]);
                    return;
                } else {
                    const str1 = `${str[0]}.${value}`;
                    const str2 = `${str[1]}.${value}`;
                    report[`${str1} === ${str2} => ${nanAndArray(arrayObj[0][value])}`] = (arrayObj[0][value] === arrayObj[1][value]);
                    searchAllKeys([arrayObj[0][value], arrayObj[1][value]], [str1, str2]);
                }
            } else {
                report[`${str[0]}.${value} === ${str[1]}.${value} => ${nanAndArray(arrayObj[0][value])}`] = (arrayObj[0][value] === arrayObj[1][value]);
            }
        })
        return;
    }

    function checkAll(obj, copy) {
        if (typeof copy === 'number' && copy.toString() !== 'NaN') {
            report[`${obj} obj === ${copy} copy  --  number`] = (copy === obj);
            return 'number';
        }

        if (typeof copy === 'number' && copy.toString() === 'NaN') {
            report[`${obj} obj === ${copy} copy  --  NaN`] = (copy === obj);
            report[`typeof ${obj} === typeof ${copy} --  NaN`] = (typeof copy === typeof obj);
            return 'NaN'
        }

        if (obj === null && copy === null) {
            report[`${obj} obj === ${copy} copy  --  null`] = (copy === obj);
            return 'null';
        }

        if (obj === undefined && copy === undefined) {
            report[`${obj} obj === ${copy} copy  --  undefined`] = (copy === obj);
            return 'undefined';
        }

        if (Array.isArray(obj) && Array.isArray(copy)) {
            report[`${obj} obj === ${copy} copy  --  array`] = (copy === obj);
            return 'array';
        }

        if (typeof obj === 'string' && typeof copy === 'string') {
            report[`${obj} obj === ${copy} copy  --  string`] = (copy === obj);
            return 'string';
        }

        if (typeof obj === 'boolean' && typeof copy === 'boolean' && (obj.toString() === 'true' || obj.toString() === 'false')) {
            report[`${obj} obj === ${copy} copy  --  boolean`] = (copy === obj);
            return 'boolean';
        }
    }

    function nanAndArray(value) {
        if (Array.isArray(value)) {
            return 'array';
        } else if (typeof value === 'number' && value.toString() === 'NaN') {
            return 'NaN';
        } else if (value === null) {
            return 'null';
        } else {
            return typeof value;
        }
    }
    return report;
}

const h1 = { a: 5, b: { b1: 6, b2: 7 }, c: [33, 22], d: null, e: undefined, f: Number.NaN };
const h2 = [5, { b1: 6, b2: 7 }, [33, 22], null, undefined, Number.NaN];
const v1 = 'sss';
const z1 = null;
const n1 = Number.NaN;

const objTest = {
    0: false,
    1: true,
    2: false,
    3: true,
    4: true,
    5: false,
    6: true,
    7: true,
    8: true,
    9: true,
    10: false,
}

function compare(deepTest, objResult) {
    const arrayTest = [];
    const arrayResult = [];

    for (let value in deepTest) {
        arrayTest.push(deepTest[value]);
    }

    for (let value in objResult) {
        arrayResult.push(objResult[value])
    }

    if (arrayTest.length === arrayResult.length) {
        if (arrayTest.every((value, index) => value === arrayResult[index]) && isNaN(deepTest.f && deepTest.c instanceof Array)) {
            console.log('ПРОШЕЛ');
        } else {
            console.log('НЕ ПРОШЕЛ');
        }
    } else {
        console.log('НЕ ПРОШЕЛ');
    }
}

function parseObj(obj) {
    const array = Object.keys(obj);
    if (obj[array[0]] || obj[array[1]]) {
        return 'ПРОШЕЛ';
    } else {
        return 'НЕ ПРОШЕЛ';
    }
}


console.log(h1);
compare(test(h1), objTest);
console.log(h2);
compare(test(h2), objTest);
console.log(v1);
console.log(parseObj(test(v1)));
console.log(z1);
console.log(parseObj(test(z1)));
console.log(n1);
console.log(parseObj(test(n1)));
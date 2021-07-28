const objfaults = {
    fault: 0,
    success: 0,
}

function deepComp(first, second) {
    if (Array.isArray(first) && Array.isArray(second)) {
        return compareArrays(first, second);
    } else if (typeof first === 'object' && typeof second === 'object' && first !== null && second !== null) {
        if ((Array.isArray(first) && !Array.isArray(second)) || (!Array.isArray(first) && Array.isArray(second))) {
            return false;
        }
        return compareObjects(first, second);
    } else {
        if (Number.isNaN(first) && Number.isNaN(second)) {
            return true;
        }
        return first === second;
    }

    function compareArrays(one, two) {
        if (one.length !== two.length) {
            return false;
        }
        for (let i = 0; i < one.length; i++) {
            if (Array.isArray(one[i]) && Array.isArray(two[i])) {
                if(!compareArrays(one[i], two[i])){
                    return false;
                }
            } else if (typeof one[i] === 'object' && typeof two[i] === 'object' && one[i] !== null && two[i] !== null) {
                if ((Array.isArray(one[i]) && !Array.isArray(two[i])) || (!Array.isArray(one[i]) && Array.isArray(two[i]))) {
                    return false;
                }
                if(!compareObjects(one[i], two[i])){
                    return false;
                }
            } else {
                if (Number.isNaN(one[i]) && Number.isNaN(two[i])) {
                    continue;
                }
                if (one[i] !== two[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    function compareObjects(one, two) {
        if (Object.keys(one).length !== Object.keys(two).length) {
            return false;
        }
        for (let value in one) {
            if (value in two) {
                if (Array.isArray(one[value]) && Array.isArray(two[value])) {
                    if (!compareArrays(one[value], two[value])) {
                        return false;
                    }
                } else if (typeof one[value] === 'object' && typeof two[value] === 'object' && one[value] !== null && two[value] !== null) {
                    if ((Array.isArray(one[value]) && !Array.isArray(two[value])) || (!Array.isArray(one[value]) && Array.isArray(two[value]))) {
                        return false;
                    }
                    if (!compareObjects(one[value], two[value])) {
                        return false;
                    }
                } else {
                    if (Number.isNaN(one[value]) && Number.isNaN(two[value])) {
                        continue;
                    }
                    if (one[value] !== two[value]) {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }
        return true;
    }
}

var H1 = { a: 5, b: { b1: 6, b2: 7 } };
var H2 = { b: { b1: 6, b2: 7 }, a: 5 };
var H3 = { a: 5, b: { b1: 6 } };
var H4 = { a: 5, b: { b1: 66, b2: 7 } };
var H5 = { a: 5, b: { b1: 6, b2: 7, b3: 8 } };
var H6 = { a: null, b: undefined, c: Number.NaN };
var H7 = { c: Number.NaN, b: undefined, a: null };
var H8 = { a: 5, b: 6 };
var H9 = { c: 5, d: 6 };
var H10 = { a: 5 };
var A1 = [5, 7];
var A2 = [5, 5, 7];
var A3 = [5, 8, 7];
const AA1 = [[2, 5], 3];
const AA2 = [[2, 5], 7];
const NAAN1 = { a:Number.NaN, b:7 };
const NAAN2 = { a:Number.NaN, c:9 };

const arrayTest = [[NAAN1, NAAN2], [AA1, AA2], [H1, H2], [H1, H3], [H1, H4], [H1, H5], [H6, H7], [H8, H9], [H8, H10], [null, H10], [H10, null], [null, null], [null, undefined],
[5, "5"], [5, H1], [A1, H1], [A2, A3], [{ a: 5, b: undefined }, { a: 5, c: undefined }], [[5, 7], { 0: 5, 1: 7 }], [[5, 7], { 0: 5, 1: 7, length: 2 }], ["aaa", "bbb"], [Number.NaN, Number.NaN]];

const arrayResult = [false, false, true, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, false, true];

function testComp(one, two, result) {
    if (deepComp(one, two) === result) {
        objfaults.success += 1;
        console.log('Тест пройден');
    } else {
        objfaults.fault += 1;
        console.log('Тест не пройден');
    }
}

function showResult() {
    alert(`Кол-во ошибочных - ${objfaults.fault};
Кол-во успешных - ${objfaults.success};`);
    console.log(`Кол-во ошибочных - ${objfaults.fault};
Кол-во успешных - ${objfaults.success};`);
}

function auto(arrayFunc, arrayRes){
    for(let i = 0; i < arrayFunc.length; i++){
        testComp(arrayFunc[i][0], arrayFunc[i][1], arrayRes[i]);
    }
    showResult();
}

auto(arrayTest, arrayResult);
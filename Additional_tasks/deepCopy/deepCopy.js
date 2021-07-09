
function deepCopy(value){
    if(typeof value === 'string'){
        return value;
    }

    if(typeof value === 'object'){
        return copyObj(value);
    }

    if(value === undefined){
        return undefined;
    }

    if(value === null){
        return null;
    }

    if(typeof value === 'number'){
        return value;
    }

    if(Array.isArray(value)){
        return copyArray(value);
    }

    function copyObj(obj){
        const newObj = {};
        for(let value in obj){
            if(typeof obj[value] === 'object'){
                newObj[value] = copyObj(obj[value]);
                continue;
            }
            if(Array.isArray(obj[value])){
                newObj[value] = copyArray(obj[value]);
                continue;
            }
            newObj[value] = obj[value];
        }
        return newObj;
    }

    function copyArray(array){
        const newArray = [];
        for(let value of array){
            if(Array.isArray(value)){
                newArray.push(copyArray);
                continue;
            }
            if(typeof value === 'object'){
                newArray.push(copyObj(value));
            }
            newArray.push(value);
        }
        return newArray;
    }
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
                aa2: [1,4,3],
            }, [1,3,4]]
        }
    }, 
    g: [1,2,3],
    unde: undefined,
    n: NaN,
    number: 54,
    bool: true,
};

//const a = deepCopy(one);


/*
const two = deepCopy(one);

console.log(two);
console.log(two.c === one.c);
console.log(two.c.e === one.c.e);
console.log(two.g === one.g)
console.log(one.c.e.dd[0] === two.c.e.dd[0]);
console.log(one.c.e.dd[1] === two.c.e.dd[1]);
console.log(one.bool === two.bool);
console.log(one.c.e.ddddd === two.c.e.ddddd)


console.log(one === deepCopy(one));

const s = [1,2,4,5,7, {f: 4}];
const s2 = deepCopy(s);
console.log(s[5] === s2[5]);
*/

function test(objForCopy){
    const copyObj = deepCopy(objForCopy);
    const report = {};

    searchAllKeys([objForCopy, copyObj], ['obj', 'copy']);

    function searchAllKeys(arrayObj, str){
        const keys = Object.keys(arrayObj[0]);
        keys.forEach(value =>{
            if(typeof arrayObj[0][value] === 'object'){

                if(arrayObj[0][value] === arrayObj[1][value]){
                    console.log('тест провален - не глубокая копия');
                    return;
                } else {
                    const str1 = `${str[0]}.${value}`;
                    const str2 = `${str[1]}.${value}`;
                    report[`${str1} === ${str2}`] = (arrayObj[0][value] === arrayObj[1][value]);
                    searchAllKeys([arrayObj[0][value], arrayObj[1][value]], [str1, str2]);
                }        
            } else {
                report[`${str[0]}.${value} === ${str[1]}.${value}`] = (arrayObj[0][value] === arrayObj[1][value]);
            }
        })
        return;
    }

    return report;
}

console.log(test(one));
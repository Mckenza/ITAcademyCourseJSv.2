function deepComp(first, second) {
    let trigger = true;
    if (Array.isArray(first) && Array.isArray(second)) {
        if (first.length !== second.length) {
            return false;
        }
        return compareArrays(first, second);
    } else if (typeof first === 'object' && typeof second === 'object' && first !== null && second !== null) {
        if((Array.isArray(first) && !Array.isArray(second)) || (!Array.isArray(first) && Array.isArray(second))){
            return first === second;
        }
        return compareObjects(first, second);
    } else {
        if(isNaN(first) && isNaN(second) && typeof first !== 'string' && typeof second !== 'string'){
            return true;
        }
        return first === second;
    }

    function compareArrays(one, two) {
        one.forEach((value, index) => {
            if (!trigger) {
                return;
            }
            if (Array.isArray(one[index]) && Array.isArray(two[index])) {
                return compareArrays(one[index], two[index]);
            } else if (typeof one[index] === 'object' && typeof two[index] === 'object' && one[index] !== null && two[index] !== null) {
                if((Array.isArray(one[index]) && !Array.isArray(two[index])) || (!Array.isArray(one[index]) && Array.isArray(two[index]))){
                    return false;
                }
                return compareObjects(one[index], two[index]);
            } else {
                if(isNaN(one[index]) && isNaN(two[index]) && typeof one[index] !== 'string' && typeof two[index] !== 'string'){
                    return;
                }
                if (one[index] !== two[index]) {
                    trigger = false;
                }
            }
        })
        return trigger;
    }

    function compareObjects(one, two) {
        if(countObj(one) !== countObj(two)){
            return false;
        }
        for (let value in one) {
            if (value in two) {
                if (Array.isArray(one[value]) && Array.isArray(two[value])) {
                    
                    if(!compareArrays(one[value], two[value])){
                        return false;
                    }
                } else if (typeof one[value] === 'object' && typeof two[value] === 'object' && one[value] !== null && two[value] !== null) {
                    if((Array.isArray(one[value]) && !Array.isArray(two[value])) || (!Array.isArray(one[value]) && Array.isArray(two[value]))){
                        return false;
                    }
                    if(!compareObjects(one[value], two[value])){
                        return false;
                    }
                } else {
                    if(isNaN(one[value]) && isNaN(two[value]) && typeof one[value] !== 'string' && typeof two[value] !== 'string'){
                        return true;
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

    function countObj(object){
        let count = 0;
        function plus(obj){
            for(let value in obj){
                if(typeof obj[value] === 'object' && !Array.isArray(obj[value]) && obj[value] !== null){
                    count++;
                    plus(obj[value]);
                } else {
                    count++;
                }
            }
        }
        plus(object);
        return count;
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

console.log(deepComp(H1,H2)) //будет true
console.log(deepComp(H1,H3)) //будет false
console.log(deepComp(H1,H4)) //будет false
console.log(deepComp(H1,H5)) //будет false
console.log(deepComp(H6,H7)) //будет true
console.log(deepComp(H8,H9)) //будет false
console.log(deepComp(H8,H10)) //будет false
console.log(deepComp(null,H10)) //будет false
console.log(deepComp(H10,null)) //будет false
console.log(deepComp(null,null)) //будет true
console.log(deepComp(null,undefined)) //будет false
console.log(deepComp(5,"5")) //будет false
console.log(deepComp(5,H1)) //будет false
console.log(deepComp(A1,H1)) //будет false
console.log(deepComp(A2,A3)) //будет false
console.log(deepComp( {a:5,b:undefined}, {a:5,c:undefined} )) //будет false
console.log(deepComp([5,7],{0:5,1:7})) //будет false 
console.log(deepComp( [5,7],{0:5,1:7,length:2} )) //будет false
console.log(deepComp("aaa","bbb")) //будет false
console.log(deepComp(Number.NaN,Number.NaN)) //будет true
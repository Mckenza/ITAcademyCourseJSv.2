const testArray = ["ЛУЖА", "МУЗА", "ЛИРА", "МЕХА", "ЛИГА", "ТАРА", "ЛИПА", "ТУРА", "ПАРК", "ЛОЖЬ", "ЛУПА", "ПЛОТ", "МУРА", "ПАУК", "ПАУТ", "ПЛУТ", "ЛОЖА", "СЛОТ", "ПАРА"];

function chainWord(startWord, finishWord) {
    const resultArray = [];
    const mainArray = testArray;
    resultArray.push(startWord);

    searchWord(startWord);

    function searchWord(firstWord) {
        const func = countChangeableLetter(firstWord);
        let arrayChain = mainArray.reduce((acc, value) => func(value), []);

        if (func(finishWord).length === 1 && func(finishWord)[0] === finishWord) {
            resultArray.push(finishWord);
            return;
        }

        const currentWord = arrayChain[arrayChain.length - 1];

        if (arrayChain.length > 1) {
            for (let i = 0; i < arrayChain.length; i++) {
                mainArray.splice(mainArray.indexOf(arrayChain[i]), 1);
            }
        } else {
            mainArray.splice(mainArray.indexOf(currentWord), 1);
        }

        resultArray.push(currentWord);

        if (mainArray.length === 0) {
            resultArray.push(finishWord);
            return;
        } else {
            searchWord(currentWord);
        }
    }

    console.log(resultArray.join('-'));

    function countChangeableLetter(word) {
        const wordStart = word;
        const returnArray = [];
        return function (nextWord) {
            let compare = 0;
            for (let i = 0; i < wordStart.length; i++) {
                if (wordStart[i] !== nextWord[i]) {
                    compare++;
                }
            }
            if (compare === 0 || compare === 1) {
                returnArray.push(nextWord);
            }

            return returnArray;
        }
    }
}

console.log('МУХА - СЛОН:');
chainWord('МУХА', 'СЛОН');
console.log('ЛИСА - ЛОСЬ:');
chainWord('ЛИСА', 'ЛОСЬ');
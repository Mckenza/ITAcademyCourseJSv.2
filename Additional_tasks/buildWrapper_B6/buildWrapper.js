const objReplace = {
    '<': '&lt;',
    '>': '&gt;',
    '\'': '&apos;',
    '"': '&quot;',
    '&': '&amp;',
}

function wrapper(tagValue) {
    const tag = tagValue;

    return function (str, attributes) {
        let parseStr = renewStr(str);

        let textAttr = '';
        for (let keyObj in attributes) {
            textAttr += ` ${keyObj}="${renewStr(attributes[keyObj])}"`;
        }
        return `<${tag}${textAttr}>${parseStr}</${tag}>`;
    }

    function renewStr(str) {
        const newStr = Array.of(...str).map(value => {
            if (value in objReplace) {
                return objReplace[value];
            } else {
                return value;
            }
        });
        return newStr.join('');
    }
}

const wrap = wrapper('p');
console.log(wrap('Однажды в студёную зимнюю пору'));

console.log(wrap('Однажды в студёную зимнюю пору', { lang: 'ru' }));
console.log(wrap('Однажды в <студёную> зимнюю пору'));

const wrapH1 = wrapper('h1');
console.log(wrapH1('СТИХИ', { align: 'center', title: "M&M's" }));

const test = wrapper('div');
console.log(test('обычный div & символы: \' -- " -- < -- > ', { class: 'div_wrapper', id: 'id_001' }));
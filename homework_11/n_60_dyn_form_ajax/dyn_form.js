const url = 'https://fe.it-academy.by/AjaxStringStorage2.php';

sendData('buyak_eugene_dataOne_test', createForm, sendData);

function createForm(tag, options) {
    const rootElement = document.body;
    const formElement = document.createElement(tag);
    formElement.classList.add('just_');
    formElement.setAttribute('action', 'https://fe.it-academy.by/TestForm.php');

    options.forEach(element => {
        const divWrapper = document.createElement('div');
        for (let valueObj in element) {
            if (valueObj === 'label') {
                const spanTag = document.createElement('span');
                spanTag.textContent = element[valueObj];
                divWrapper.appendChild(spanTag);
            }
            if (valueObj === 'caption') {
                const submit = document.createElement('input');
                submit.setAttribute('type', element['kind']);
                submit.setAttribute('value', element['caption']);
                submit.setAttribute('id', 'send_id');
                divWrapper.appendChild(submit);
                continue;
            }
            if (valueObj === 'kind') {
                if (element[valueObj] === 'longtext') {
                    const type = document.createElement('input');
                    type.setAttribute('type', 'text');
                    type.setAttribute('name', element['name']);
                    type.classList.add('longtext');
                    divWrapper.appendChild(type);
                }
                if (element[valueObj] === 'number') {
                    const type = document.createElement('input');
                    type.setAttribute('type', 'number');
                    type.setAttribute('name', element['name']);
                    type.classList.add('shorttext');
                    divWrapper.appendChild(type);
                }
                if (element[valueObj] === 'shorttext') {
                    const type = document.createElement('input');
                    type.setAttribute('type', 'text');
                    type.setAttribute('name', element['name']);
                    type.classList.add('shorttext');
                    divWrapper.appendChild(type);
                }
                if (element[valueObj] === 'combo') {
                    const selectTag = document.createElement('select');
                    selectTag.setAttribute('name', element['name']);
                    const valueCombo = element['variants'];
                    valueCombo.forEach(val => {
                        const { text, value } = val;
                        const optionTag = document.createElement('option');
                        optionTag.textContent = text;
                        optionTag.setAttribute('value', value);
                        selectTag.appendChild(optionTag);
                    });
                    divWrapper.appendChild(selectTag);
                }
                if (element[valueObj] === 'radio') {
                    const radioWrapper = document.createElement('div');
                    const valueRadio = element['variants'];
                    valueRadio.forEach(val => {
                        const { text, value } = val;
                        const radioTag = document.createElement('input');
                        const spanName = document.createElement('span');
                        radioTag.setAttribute('type', 'radio');
                        radioTag.setAttribute('value', value);
                        radioTag.setAttribute('name', element['name']);
                        spanName.textContent = text;
                        radioWrapper.appendChild(radioTag);
                        radioWrapper.appendChild(spanName);
                    });
                    divWrapper.appendChild(radioWrapper);
                }
                if (element[valueObj] === 'check') {
                    const checkboxtag = document.createElement('input');
                    checkboxtag.setAttribute('type', 'checkbox');
                    checkboxtag.setAttribute('name', element['name']);
                    divWrapper.appendChild(checkboxtag);
                }
                if (element[valueObj] === 'memo') {
                    const textareaTag = document.createElement('textarea');
                    textareaTag.setAttribute('name', element['name']);
                    divWrapper.appendChild(textareaTag);
                }
            }
            formElement.appendChild(divWrapper);
        }
        rootElement.appendChild(formElement);
    })
}

function sendData(name, callback, callbackTwo = null) {
    $.ajax({
        url: url,
        type: 'POST',
        cash: false,
        data: {
            f: 'READ',
            n: name,
        },
        dataType: 'JSON',
        success: resolve,
        error: reject,
    });

    function resolve(data) {
        console.log('good');
        console.log(data)
        callback('form', JSON.parse(data.result));
        if(callbackTwo !== null){
            callbackTwo('buyak_eugene_dataTwo_test', createForm);
        }     
    }

    function reject() {
        console.log('bad');
    }
}

//sendData(formDef1, 'buyak_eugene_dataOne_test');
//sendData(formDef2, 'buyak_eugene_dataTwo_test');

/*
function sendData(data, name) {
    $.ajax({
        url: url,
        type: 'POST',
        cash: false,
        data: {
            f: 'INSERT',
            n: name,
            v: JSON.stringify(data),
        },
        dataType: 'JSON',
        success: resolve,
        error: reject
    });

    function resolve(data) {
        console.log(data);
        console.log('good');
    }

    function reject() {
        console.log('bad');
    }
}
*/

const formDef1 = [
    { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
    { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
    { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
    { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
    {
        label: 'Рубрика каталога:', kind: 'combo', name: 'division',
        variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
    },
    {
        label: 'Размещение:', kind: 'radio', name: 'payment',
        variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
    },
    { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
    { label: 'Описание сайта:', kind: 'memo', name: 'description' },
    { caption: 'Опубликовать:', kind: 'submit' },
];

const formDef2 = [
    { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
    { label: 'Имя:', kind: 'longtext', name: 'firstname' },
    { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
    { label: 'Возраст:', kind: 'number', name: 'age' },
    { caption: 'Зарегистрироваться:', kind: 'submit' },
];

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

createForm('form', formDef1);
createForm('form', formDef2);
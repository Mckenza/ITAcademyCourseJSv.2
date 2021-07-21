const developers = document.getElementById('1developers_id');
const nameSite = document.getElementById('2name_site_id');
const urlSite = document.getElementById('3url_site_id');
const dateStart = document.getElementById('4date_start_id');
const dayVisitors = document.getElementById('5day_visitors_id');
const email = document.getElementById('6email_id');
const catalog = document.getElementById('7catalog_id');
const radioWrap = document.getElementById('8div_radio_id');
const buttonSubmit = document.getElementById('submit_id');
const radioButtons = document.getElementsByName('radio_name');
const checkbox = document.getElementById('9checkbox_feedback');
const textArea = document.getElementById('10textarea');

const form = document.getElementById('main_form');

const viewState = {
    ['1developers_id']: false,
    ['2name_site_id']: false,
    ['3url_site_id']: false,
    ['4date_start_id']: false,
    ['5day_visitors_id']: false,
    ['6email_id']: false,
    ['7catalog_id']: false,
    ['8div_radio_id']: false,
    ['9checkbox_feedback']: false,
    ['10textarea']: false,
}

form.addEventListener('blur', (e) => {
    const element = e.target;
    if (element.getAttribute('type') === 'text' || element === textArea) {
        if (!element.value) {
            validFormStyle(element);
            const idElement = element.getAttribute('id');
            viewState[idElement] = false;
        } else {
            const idElement = element.getAttribute('id');
            viewState[idElement] = true;
            const parentElem = element.parentElement;
            if(parentElem.querySelector('.redMessage')){
                parentElem.querySelector('.redMessage').remove();
            }
        }
    }
    if (element.id === '7catalog_id') {
        if (element.value === '0') {
            validFormStyle(element);
            viewState['7catalog_id'] = false;
        } else {
            viewState['7catalog_id'] = true;
            const parentElem = element.parentElement;
            if(parentElem.querySelector('.redMessage')){
                parentElem.querySelector('.redMessage').remove();
            }
        }
    }
}, true)

radioWrap.addEventListener('click', (e)=>{
    if(e.target.getAttribute('type') === 'radio'){
        const parentElem = radioWrap.parentElement;
        if(parentElem.querySelector('.redMessage')){
            parentElem.querySelector('.redMessage').remove();
        }
    }
})

checkbox.onclick = () =>{
    if(checkbox.checked){
        viewState['9checkbox_feedback'] = true;
        const parentElem = checkbox.parentElement;
        if(parentElem.querySelector('.redMessage')){
            parentElem.querySelector('.redMessage').remove();
        }
    }
}

buttonSubmit.onclick = (e) => {
    let count = 0;
    for (let i = 0; i < radioButtons.length; i++) {
        if (!radioButtons[i].checked) {
            count++;
        }
    }
    
    if (count === 3) {
        viewState['8div_radio_id'] = false;
        validFormStyle(document.getElementById('8div_radio_id'));
        e.preventDefault();
    } else {
        viewState['8div_radio_id'] = true;
        const parentElem = radioWrap.parentElement;
        if(parentElem.querySelector('.redMessage')){
            parentElem.querySelector('.redMessage').remove();
        }
    }

    if(!checkbox.checked){
        validFormStyle(checkbox);
        e.preventDefault();
    } else {
        const parentElem = checkbox.parentElement;
        if(parentElem.querySelector('.redMessage')){
            parentElem.querySelector('.redMessage').remove();
        }
    }

    for (let value in viewState) {
        if (!viewState[value]) {
            validFormStyle(document.getElementById(value));
            e.preventDefault();
        }
    }

    for (let value in viewState) {
        if (viewState[value] === false) {
            if(value === '8div_radio_id'){
                radioButtons[0].focus();
                break;
            }
            document.getElementById(value).focus();
            break;
        }
    }
}

function validFormStyle(element) {
    setTimeout(() => {
        element.removeAttribute('style');
    }, 2000);
    element.setAttribute('style', 'border-bottom: 2px red solid');
    
    const parentElem = element.parentElement;
    if(!parentElem.querySelector('.redMessage')){
        const error = document.createElement('span');
        error.setAttribute('class', 'redMessage');
        error.textContent = 'Неверное значение';
        parentElem.appendChild(error);
    }
}
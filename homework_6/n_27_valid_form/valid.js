const developers = document.getElementById('1developers_id');
const nameSite = document.getElementById('2name_site_id');
const urlSite = document.getElementById('3url_site_id');
const dateStart = document.getElementById('4date_start_id');
const dayVisitors = document.getElementById('5day_visitors_id');
const email = document.getElementById('6email_id');
const catalog = document.getElementById('7catalog_id');
const buttonSubmit = document.getElementById('submit_id');
const radioButtons = document.getElementsByName('radio_name');

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
}

form.addEventListener('blur', (e) => {
    const element = e.target;
    if (element.getAttribute('type') === 'text') {
        if (!element.value) {
            validFormStyle(element);
            const idElement = element.getAttribute('id');
            viewState[idElement] = false;
        } else {
            const idElement = element.getAttribute('id');
            viewState[idElement] = true;
        }
    }
    if (element.id === '7catalog_id') {
        if (element.value === '0') {
            validFormStyle(element);
            viewState['7catalog_id'] = false;
        } else {
            viewState['7catalog_id'] = true;
        }
    }
}, true)

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
    }

    for (let value in viewState) {
        if (!viewState[value]) {
            validFormStyle(document.getElementById(value));
            e.preventDefault();
        }
    }

    for (let value in viewState) {
        if (viewState[value] === false) {
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
}
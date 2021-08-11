var menu = [
    {
        name: 'Пункт 1', submenu:
            [
                {
                    name: 'Пункт 1.1', submenu:
                        [
                            { name: 'Пункт 1.1.1', url: 'http://www.tut.by' },
                            { name: 'Пункт 1.1.2 длинный', url: 'http://www.tut.by' },
                            {
                                name: 'Пункт 1.1', submenu:
                                    [
                                        { name: 'Пункт 1.1.1', url: 'http://www.tut.by' },
                                        { name: 'Пункт 1.1.2 длинный', url: 'http://www.tut.by' }
                                    ]
                            },
                        ]
                },
                { name: 'Пункт 1.2', url: 'http://www.tut.by' },
                {
                    name: 'Пункт 1.3 длинный', submenu:
                        [
                            { name: 'Пункт 1.3.1', url: 'http://www.tut.by' },
                            { name: 'Пункт 1.3.2', url: 'http://www.tut.by' },
                            { name: 'Пункт 1.3.3', url: 'http://www.tut.by' },
                            { name: 'Пункт 1.3.4 длинный', url: 'http://www.tut.by' },
                            {
                                name: 'Пункт 1.1', submenu:
                                    [
                                        { name: 'Пункт 1.1.1', url: 'http://www.tut.by' },
                                        { name: 'Пункт 1.1.2 длинный', url: 'http://www.tut.by' }
                                    ]
                            },
                        ]
                }
            ]
    },
    { name: 'Пункт 2 длинный', url: 'http://www.tut.by' },
    {
        name: 'Пункт 3', submenu:
            [
                { name: 'Пункт 3.1 длинный', url: 'http://www.tut.by' },
                { name: 'Пункт 3.2', url: 'http://www.tut.by' }
            ]
    }
];

let currentId;
let divTreeId;
let bufArray = [];
let treeArray = [];
let currentObj;

function createMenu(array) {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('menu_div');

    array.map((value, index)=>{
        const divElementMenu = document.createElement('div');
        const divForEvent = document.createElement('div');
        divForEvent.classList.add('for_event_div');
        divElementMenu.classList.add('element_menu');
        const spanInner = document.createElement('span');
        
        if('submenu' in value){
            spanInner.textContent = value['name'] + `  ⇓`;
            divForEvent.setAttribute('id', index);
            divForEvent.setAttribute('action', 'false');
            divElementMenu.appendChild(divForEvent);
        } else {
            spanInner.textContent = value['name'];
            spanInner.setAttribute('id', 'none');
        }
        
        divElementMenu.appendChild(spanInner);
        mainDiv.appendChild(divElementMenu);
    });

    document.body.insertAdjacentElement('afterbegin', mainDiv);
}

createMenu(menu);

addEventListener('mouseover', (e) =>{
    currentObj = e.target;
    console.log(e.target.height);
    if(e.target.getAttribute('action') === 'false'){
        delDOM();
        currentId = e.target.getAttribute('id');
        divTreeId = '0submenu';
        treeArray.push(divTreeId);
        if(!document.getElementById(divTreeId)){
            createUnder(menu[currentId]['submenu'], {x: e.pageX, y: 38});
        }
    } else if (e.target.getAttribute('action') === 'true'){
        const id = e.target.id;
        currentId = id;
        const elem = document.getElementById(divTreeId);
        console.log(elem.style.left, window.getComputedStyle(elem)['width']);
        let buff = parseInt(divTreeId);
        divTreeId = ++buff + 'submenu';
        treeArray.push(divTreeId);
        createUnder(parse(id), {x: parseInt(window.getComputedStyle(elem)['width']) + parseInt(elem.style.left) - 5, y: parseInt(window.getComputedStyle(e.target)['top'])});

    } else if (e.target === document.getElementsByTagName('html')[0]){
        delDOM();
    } else if (getParent(e.target) !== 'randomSTR' && getParent(e.target) !== treeArray[treeArray.length - 1]){
        console.log('sdf')
        const a = document.getElementById(divTreeId);
        document.body.removeChild(a);
        treeArray.pop();
        divTreeId = treeArray[treeArray.length - 1];
    }
    console.log(getParent(e.target));
});

/* парсить ID и дуалаять все выше него */

/*
else if (treeArray[treeArray.length - 1] !== getParent(e.target)){
        const a = document.getElementById(divTreeId);
            document.body.removeChild(a);
            treeArray.pop();
    } 
*/

/*
else if (e.target.getAttribute('action') === 'none' ){
        const a = document.getElementById(divTreeId);
        document.body.removeChild(a);
        treeArray.pop();
    }
*/

/*
addEventListener('mouseout', (e) =>{
    if(e.target.getAttribute('action') === 'true'){
        if(treeArray[treeArray.length - 1] === divTreeId){
            const a = document.getElementById(divTreeId);
            document.body.removeChild(a);
            treeArray.pop();
        }
        
    }
})
*/

function getParent(element){
    //return element.parentElement;
    if(element.getAttribute('action') === 'none'){
        return element.parentElement.id;
    } else if (element.getAttribute('class') === 'element_menu'){
        return element.parentElement.id;
    } else if (element.getAttribute('id') === 'none'){
        return element.parentElement.parentElement.id;
    } else if (element.getAttribute('class') === 'for_event_div'){
        return element.parentElement.parentElement.id;
    } else {
       return 'randomSTR';
    }
    
}


function delDOM(trig = true) {
    if (trig) {
        for (let i = 0; i < treeArray.length; i++) {
            const doc = document.getElementById(treeArray[i]);
            document.body.removeChild(doc);
        }
        treeArray = [];
    }
}

function checkDiv(id){
    for(let i = 0; i < treeArray.length; i++){
        if(document.getElementById(id)){
            return false;
        }
    }
    return true;
}

function parse(strId){
    let array = menu;
    for(let i = 0; i < strId.length; i++){
        array = array[strId[i]]['submenu'];
    }
    
    return array;
}

function createUnder(array, dataCoord){
    const arrayBuff = [];
    const underMenu = document.createElement('div');
    underMenu.classList.add('underMenu');
    underMenu.setAttribute('style', `top: ${dataCoord.y}px; left: ${dataCoord.x}px;`);
    underMenu.setAttribute('id', divTreeId);

    array.map((value, index) => {
        const divPoint = document.createElement('div');
        divPoint.classList.add('element_menu');
        const divForEvent = document.createElement('div');
        divForEvent.classList.add('for_event_div');
        const spanDivPoint = document.createElement('span');
        if('submenu' in value){
            spanDivPoint.textContent = value['name'] + ' ⇒';
            divForEvent.setAttribute('id', currentId + '' + index);
            divForEvent.setAttribute('action', 'true');
            divPoint.appendChild(divForEvent);
        } else {
            spanDivPoint.textContent = value['name'];
            spanDivPoint.setAttribute('id', 'none');
            divPoint.setAttribute('action', 'none');
        }
        
        divPoint.appendChild(spanDivPoint);
        underMenu.appendChild(divPoint);
    })


    document.body.appendChild(underMenu);
}
var menu = [
    {
        name: 'Пункт 1', submenu:
            [
                {
                    name: 'Пункт 1.1', submenu:
                        [
                            { name: 'Пункт 1.1.1', url: 'http://www.tut.by' },
                            { name: 'Пункт 1.1.2 длинный', url: 'http://www.tut.by' }
                        ]
                },
                { name: 'Пункт 1.2', url: 'http://www.tut.by' },
                {
                    name: 'Пункт 1.3 длинный', submenu:
                        [
                            { name: 'Пункт 1.3.1', url: 'http://www.tut.by' },
                            { name: 'Пункт 1.3.2', url: 'http://www.tut.by' },
                            { name: 'Пункт 1.3.3', url: 'http://www.tut.by' },
                            { name: 'Пункт 1.3.4 длинный', url: 'http://www.tut.by' }
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
        }
        
        divElementMenu.appendChild(spanInner);
        mainDiv.appendChild(divElementMenu);
    });

    document.body.insertAdjacentElement('afterbegin', mainDiv);
}

createMenu(menu);

addEventListener('mouseover', (e) =>{
    if(e.target.getAttribute('action') === 'false'){
        currentId = e.target.getAttribute('id');
        createUnder(menu[currentId]['submenu'], {x: e.pageX, y: e.pageY});
    } else if (e.target.getAttribute('action') === 'true'){

    }
})

function createUnder(array, dataCoord){
    const underMenu = document.createElement('div');
    underMenu.classList.add('underMenu');
    underMenu.setAttribute('style', `top: ${dataCoord.y}px; left: ${dataCoord.x}px;`);

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
        }
        
        divPoint.appendChild(spanDivPoint);
        underMenu.appendChild(divPoint);
    })


    document.body.appendChild(underMenu);
}
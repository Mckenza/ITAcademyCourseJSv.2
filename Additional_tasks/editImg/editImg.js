const mainImg = document.getElementById('main_img');
const mainDiv = document.getElementById('main_div');
const editImg = document.getElementById('edit_img_id');
const allElemetnDivEdit = editImg.childNodes;
mainImg.height = 200;
mainImg.width = 300;
editImg.style.left = mainImg.style.left;
editImg.style.top = mainImg.style.top;

let trigger = false;

/* начальные значения или значения после фиксации картинки */
objCoordImg = {
    x: parseInt(mainImg.style.left),
    y: parseInt(mainImg.style.top),
    widthStart: mainImg.width,
    heightStart: mainImg.height,
    coefficientX: (mainImg.height / mainImg.width).toFixed(2),
    coefficientY: (mainImg.width / mainImg.height).toFixed(2),
    forTopLeft: 0,
}

/* Динамически меняющиеся координаты и значения */
objCurrent = {
    myPageX: 0,
    myPageY: 0,
    xStart: 0,
    yStart: 0,
    currentAction: '',
}

objElements = {
    top_left: 'top: -3px; left: -3px',
    top_center: 'top: -3px; left: calc(50% - 2.5px)',
    top_right: 'top: -3px; right: -3px',
    bottom_left: 'bottom: -3px; left: -3px',
    bottom_center: 'bottom: -3px; left: calc(50% - 2.5px)',
    bottom_right: 'bottom: -3px; right: -3px',
    center_left: 'top: calc(50% - 2.5px); left: -3px',
    center_right: 'top: calc(50% - 2.5px); right: -3px',
}

mainDiv.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (trigger) {
        if (objCurrent.currentAction === 'center_right') {
            mainImg.width = objCoordImg.widthStart + e.pageX - objCurrent.xStart - objCoordImg.x;
        }
        if (objCurrent.currentAction === 'center_left') {
            mainImg.width = objCoordImg.widthStart - e.pageX + objCoordImg.x;
            if (e.pageX < objCoordImg.widthStart + objCoordImg.x) {
                mainImg.style.left = e.pageX + 'px';
            }
        }
        if (objCurrent.currentAction === 'bottom_center') {
            mainImg.height = objCoordImg.heightStart + e.pageY - objCurrent.yStart - objCoordImg.y;
        }
        if (objCurrent.currentAction === 'top_center') {
            mainImg.height = objCoordImg.heightStart - e.pageY + objCoordImg.y;
            if (e.pageY < objCoordImg.heightStart + objCoordImg.y) {
                mainImg.style.top = e.pageY + 'px';
            }
        }
        if (objCurrent.currentAction === 'bottom_right') {
            if (mainImg.height <= mainImg.width) {
                mainImg.width = objCoordImg.widthStart + e.pageX - objCurrent.xStart - objCoordImg.x;
                mainImg.height = objCoordImg.heightStart + ((e.pageX - objCurrent.xStart - objCoordImg.x) * objCoordImg.coefficientX);
            } else {
                mainImg.width = objCoordImg.widthStart + ((e.pageY - objCurrent.yStart - objCoordImg.y) * objCoordImg.coefficientY);
                mainImg.height = objCoordImg.heightStart + e.pageY - objCurrent.yStart - objCoordImg.y;
            }
        }
        if (objCurrent.currentAction === 'bottom_left') {
            mainImg.width = objCoordImg.widthStart - e.pageX + objCoordImg.x;
            mainImg.height = objCoordImg.heightStart - ((e.pageX - objCurrent.xStart - objCoordImg.x) * objCoordImg.coefficientX);
            if (e.pageX <= objCoordImg.widthStart + objCoordImg.x) {
                mainImg.style.left = e.pageX + 'px';
            }
        }
        if (objCurrent.currentAction === 'top_left') {
            mainImg.width = objCoordImg.widthStart - e.pageX + objCoordImg.x;
            mainImg.height = objCoordImg.heightStart - ((e.pageX - objCoordImg.x) * objCoordImg.coefficientX);
            if (e.pageX <= objCoordImg.widthStart + objCoordImg.x) {
                mainImg.style.left = e.pageX + 'px';
                mainImg.style.top = objCoordImg.y + ((e.pageX - objCurrent.xStart - objCoordImg.x) * objCoordImg.coefficientX) + 'px';
            }
        }
        if (objCurrent.currentAction === 'top_right') {
            mainImg.width = objCoordImg.widthStart + e.pageX - objCurrent.xStart - objCoordImg.x;
            mainImg.height = objCoordImg.heightStart + ((e.pageX - objCurrent.xStart - objCoordImg.x) * objCoordImg.coefficientX);
            if (e.pageX > objCoordImg.x) {
                mainImg.style.top = objCoordImg.y - ((e.pageX - objCurrent.xStart - objCoordImg.x) * objCoordImg.coefficientX) + 'px';
            }
        }
        if (objCurrent.currentAction === 'edit_img_id') {
            mainImg.style.top = e.pageY - objCurrent.yStart + 'px';
            mainImg.style.left = e.pageX - objCurrent.xStart + 'px';
        }
        draw();
    }
})

mainDiv.addEventListener('mouseup', (e) => {
    trigger = false;
    objCoordImg.widthStart = mainImg.width;
    objCoordImg.heightStart = mainImg.height;
    objCoordImg.x = parseInt(mainImg.style.left);
    objCoordImg.y = parseInt(mainImg.style.top);
    objCoordImg.coefficientX = (mainImg.height / mainImg.width).toFixed(2);
    objCoordImg.coefficientY = (mainImg.width / mainImg.height).toFixed(2);
})

mainDiv.addEventListener('click', (e) => {
    if (e.target.id !== 'main_img' || e.target.id !== 'edit_img_id' || !(e.target.id in objElements)) {
        editImg.style.display = 'none';
    }
    if (e.target.id === 'main_img' || e.target.id === 'edit_img_id' || (e.target.id in objElements)) {
        draw();
    }
})

function draw() {
    const height = mainImg.height;
    const width = mainImg.width;

    editImg.style.display = 'block';
    editImg.style.position = 'absolute';
    editImg.style.top = mainImg.style.top;
    editImg.style.left = mainImg.style.left;
    editImg.style.height = height - 2 + 'px';
    editImg.style.width = width - 2 + 'px';
    editImg.style.border = 'red 1px solid';

    for (let i = 0; i < allElemetnDivEdit.length; i++) {
        if (allElemetnDivEdit[i].nodeName !== '#text') {
            allElemetnDivEdit[i].setAttribute('style', objElements[allElemetnDivEdit[i].id]);
        }
    }
}

editImg.addEventListener('mousedown', (e) => {
    objCurrent.currentAction = e.target.id;

    if (e.target.id === 'edit_img_id') {
        trigger = true;
        objCurrent.xStart = e.offsetX;
        objCurrent.yStart = e.offsetY;
    }
    if (e.target.id === 'top_left') {
        trigger = true;
        objCurrent.yStart = 0;
        objCurrent.xStart = 0;
    }
    if (e.target.id === 'top_center') {
        trigger = true;
        objCurrent.yStart = 0;
    }
    if (e.target.id === 'top_right') {
        trigger = true;
        objCurrent.yStart = 0;
        objCurrent.xStart = mainImg.width;
    }
    if (e.target.id === 'bottom_left') {
        trigger = true;
        objCurrent.xStart = 0;
        objCurrent.yStart = mainImg.height;
    }
    if (e.target.id === 'bottom_center') {
        trigger = true;
        objCurrent.yStart = mainImg.height;
    }
    if (e.target.id === 'bottom_right') {
        trigger = true;
        objCurrent.xStart = mainImg.width;
        objCurrent.yStart = mainImg.height;
    }
    if (e.target.id === 'center_left') {
        trigger = true;
        objCurrent.xStart = 0;
    }
    if (e.target.id === 'center_right') {
        trigger = true;
        objCurrent.xStart = mainImg.width;
    }
})
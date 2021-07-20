const mainField = document.querySelectorAll('img');
const divContainer = document.querySelector('.cont_image');

const objPosition = {
    top: 0,
    left: 0,
    startTop: 0,
    startLeft: 0,
    link: null,
}

const arrayPosition = [];
for (let value of mainField) {
    value.height = 200;
    value.width = 200;
    const left = value.offsetLeft;
    arrayPosition.push(left);
}

for (let i = 0; i < mainField.length; i++) {
    mainField[i].classList.add('position');
    mainField[i].style.left = arrayPosition[i] + 'px';
    mainField[i].style.top = 0 + 'px';
    mainField[i].style.zIndex = i + 1;
}

divContainer.addEventListener('mousedown', (e) => {
    if (e.target.getAttribute('id') === 'one') {
        if (parseInt(e.target.style.zIndex) !== mainField.length) {
            for (let i = 0; i < mainField.length; i++) {
                if (parseInt(mainField[i].style.zIndex) !== 0) {
                    mainField[i].style.zIndex -= 1;
                }
            }
            e.target.style.zIndex = mainField.length;
        }

        objPosition.top = e.clientY;
        objPosition.left = e.clientX;
        objPosition.link = e.target;
        objPosition.startLeft = parseInt(e.target.style.left);
        objPosition.startTop = parseInt(e.target.style.top);

        divContainer.onmousemove = (e) => {
            e.preventDefault();
            divContainer.classList.add('cursor');
            if (objPosition.link) {
                objPosition.link.style.left = `${e.pageX - objPosition.left + objPosition.startLeft}px`;
                objPosition.link.style.top = `${e.pageY - objPosition.top + objPosition.startTop}px`;
            }
        }

        divContainer.onmouseup = () => {
            divContainer.classList.remove('cursor');
            divContainer.onmousemove = null;
            divContainer.onmouseup = null;
        }
    }
})
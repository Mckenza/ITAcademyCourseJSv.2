class AJAXStorage {
    constructor() {
        this.url = 'https://fe.it-academy.by/AjaxStringStorage2.php';
        this.nameAjax = 'buyak_eugene_drinks_ajax';
        this.pass = '123456Zz';
        this.data = {};
        this.readAjax('just');
    }

    addValue(key, value) {
        if (typeof key === 'string') {
            this.data[key] = value;
            this.readAjax();
        }
    }

    getValue(key) {
        if (!this.data[key]) {
            return undefined;
        } else {
            return this.data[key];
        }
    }

    deleteValue(key) {
        if (key in this.data) {
            delete this.data[key];
            this.readAjax();
            return true;
        } else {
            return false;
        }
    }

    getKey() {
        const arrayKeys = Object.keys(this.data);
        return arrayKeys;
    }

    readAjax(type) {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'READ',
                n: this.nameAjax,
            },
            success: resolve.bind(this),
            error: reject,
        });

        function resolve(data) {
            console.log('READ - ok');
            console.log(data);
            if (type === 'just') {
                this.data = JSON.parse(data.result);
                return;
            }
            if (data.result === '') {
                this.insertAjax();
            } else {
                this.lockgetAjax();
            }
        }

        function reject() {
            console.log('READ - bad');
        }
    }

    insertAjax() {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'INSERT',
                n: this.nameAjax,
                v: JSON.stringify(this.data),
            },
            success: resolve.bind(this),
            error: reject,
        });

        function resolve(data) {
            console.log('INSERT - ok');
            console.log(data);
        }

        function reject() {
            console.log('INSERT - bad');
        }
    }

    lockgetAjax() {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'LOCKGET',
                n: this.nameAjax,
                p: this.pass,
            },
            success: resolve.bind(this),
            error: reject,
        })

        function resolve(data) {
            console.log('LOCKGET - ok');
            console.log(data);
            this.updateAjax();
        }

        function reject() {
            console.log('LOCKGET - bad');
        }
    }

    updateAjax() {
        $.ajax({
            url: this.url,
            type: 'POST',
            data: {
                f: 'UPDATE',
                n: this.nameAjax,
                p: this.pass,
                v: JSON.stringify(this.data),
            },
            success: resolve.bind(this),
            error: reject,
        });

        function resolve(data) {
            console.log('UPDATE - ok');
            console.log(data);
        }

        function reject() {
            console.log('UPDATE - bad');
        }
    }
}

const inputNameDrink = document.getElementById('input_name_id');
const inputRecipe = document.getElementById('input_recipe_id');
const checkAlco = document.getElementById('check_alcohol_id');
const getInfoInput = document.getElementById('get_info_id');
const showInfoDiv = document.getElementById('fullInfo_id');

const logic = new AJAXStorage();

document.getElementById('add_button').onclick = () => {
    if (!inputNameDrink.value) {
        styleBoard(inputNameDrink);
    }
    if (!inputRecipe.value) {
        styleBoard(inputRecipe);
    } else {
        const isAlco = checkAlco.checked;
        logic.addValue(inputNameDrink.value, { recipe: inputRecipe.value, alco: isAlco });
    }
}

document.getElementById('get_button').onclick = () => {
    if (!getInfoInput.value) {
        styleBoard(getInfoInput);
    } else {
        const item = logic.getValue(getInfoInput.value);
        if (!item) {
            styleBoard(getInfoInput);
        } else {
            showInfoDiv.textContent = `Название: ${getInfoInput.value}
            Рецепт: ${item.recipe}
            Алкогольный? - ${item.alco ? 'Да' : 'Нет'}`;
        }
    }
}

document.getElementById('del_button').onclick = () => {
    if (!getInfoInput.value) {
        styleBoard(getInfoInput);
    } else {
        logic.deleteValue(getInfoInput.value);
        showInfoDiv.textContent = '';
    }
}

document.getElementById('all_list_button').onclick = () => {
    const arrayKeys = logic.getKey();
    if (arrayKeys.length === 0) {
        showInfoDiv.textContent = 'нет элементов списка';
    } else {
        let str = '';
        arrayKeys.forEach((value, index) => {
            str += `${(index + 1)}. ${value} `;
        })
        showInfoDiv.textContent = str;
    }
}

function styleBoard(element) {
    setTimeout(() => {
        element.classList.remove('borderred');
    }, 2000);
    element.classList.add('borderred');
}
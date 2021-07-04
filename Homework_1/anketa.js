
let firstName;
let lastName;
let patronymic;
let age;
let sex;
let trigger = true;

const objMessage = {
    firstnameM: 'Какое ваше имя?',
    lastNameM: 'Какая ваша фамилия?',
    patronymicM: 'Какое ваше отчество?',
    ageM: 'Сколько вам лет?',
}

do {
    if (!firstName) {
        firstName = prompt(objMessage.firstnameM);
        objMessage.firstnameM = 'Какое ваше имя? (Введите хотя бы 1 символ)';
        continue;
    }
    if (!lastName) {
        lastName = prompt(objMessage.lastNameM);
        objMessage.lastNameM = 'Какая ваша фамилия? (Введите хотя бы 1 символ)';
        continue;
    }
    if (!patronymic) {
        patronymic = prompt(objMessage.patronymicM);
        objMessage.patronymicM = 'Какое ваше отчество? (Введите хотя бы 1 символ)';
        continue;
    }
    if (!age) {
        age = prompt(objMessage.ageM);
        age = Number(age);
        objMessage.ageM = 'Сколько вам лет? ( Вводить только цифры )';
        continue;
    }

    sex = confirm('Вы мужчина?');

    trigger = false;

} while (trigger);

alert(`Ваше ФИО: ${lastName} ${firstName} ${patronymic}
Ваш возраст в годах: ${age}
Ваш возраст в днях: ${age * 365}
Через 5 лет вам будет: ${age + 5}
Ваш пол: ${sex ? 'Мужской' : 'Женский'}
Вы на пенсии: ${(age < 65 && sex) || (age < 60 && !sex) ? 'нет' : 'да'}                                   
`);
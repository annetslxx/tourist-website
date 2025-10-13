const langBtn = document.getElementById('lang-btn');

const rus = {
    issuing: 'ГУ МВД РОССИИ ПО Г. РОСТОВУ-НА-ДОНУ',
    issueDate: '01.07.2018',
    surname: 'ИВАНОВ',
    name: 'ИВАН',
    birth: '20.02.2002',
    gender: 'МУЖ.',
    city: 'Г. РОСТОВ-НА-ДОНУ'
};

const eng = {
    issuing: 'THE MINISTRY OF INTERNAL AFFAIRS OF RUSSIA IN ROSTOV-ON-DON',
    issueDate: '01.07.2018',
    surname: 'IVANOV',
    name: 'IVAN',
    birth: '20.02.2002',
    gender: 'MALE',
    city: 'ROSTOV-ON-DON'
};

let isRus = true;

langBtn.addEventListener('click', () => {
    const data = isRus ? eng : rus;

    document.getElementById('issuing').innerHTML = data.issuing;
    document.getElementById('issue-date').innerText = data.issueDate;
    document.getElementById('surname').innerText = data.surname;
    document.getElementById('name').innerText = data.name;
    document.getElementById('birth').innerText = data.birth;
    document.getElementById('gender').innerText = data.gender;
    document.getElementById('city').innerText = data.city;

    langBtn.innerText = isRus ? 'Back to russian' : 'Показать английскую версию';
    isRus = !isRus;
});

function goBack() {
    window.location.href = 'index.html';
}
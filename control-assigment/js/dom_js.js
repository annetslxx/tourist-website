function readData() {
    const elem = document.getElementsByTagName('p');
    const lastName = elem[0].childNodes[1].innerText;
    const firstName = elem[1].childNodes[1].innerText;
    const birthYear = elem[2].childNodes[1].innerText;

    const message = `Фамилия: ${lastName}, Имя: ${firstName}, Год рождения: ${birthYear}`;
    document.getElementById('output').innerText = message;
    console.log("Считано при нажатии кнопки: " + message);

}

function goBack() {
    window.location.href = 'index.html';
}
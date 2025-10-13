function calc() {
    let x = parseFloat(document.getElementById('x').value);
    let y = parseFloat(document.getElementById('y').value);

    if (x === 0 || y === 0 || isNaN(x) || isNaN(y)) {
        document.getElementById('result').innerText = "Ошибка: X и Y должны быть ненулевыми числами!";
        return;
    }

    let z = 1 / (x * y);
    document.getElementById('result').innerText = `Z = ${z.toFixed(4)}`;
}

function goBack() {
    window.location.href = 'index.html';
}
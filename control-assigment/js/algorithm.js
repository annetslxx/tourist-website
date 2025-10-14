function calc() {
    const problem = "Определить значение функции Z = 1/(XY) при произвольных X и Y";
    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);

    if (x === 0 || y === 0 || isNaN(x) || isNaN(y)) {
        document.getElementById('result').innerText = "Ошибка: X и Y должны быть ненулевыми числами!";
        return;
    }

    const z = 1 / (x * y);
    document.getElementById('result').innerText = `Z = ${z.toFixed(4)}`;

    const data = {
        problem: problem,
        x: x,
        y: y,
        z: z
    };

    fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

function goBack() {
    window.location.href = 'index.html';
}
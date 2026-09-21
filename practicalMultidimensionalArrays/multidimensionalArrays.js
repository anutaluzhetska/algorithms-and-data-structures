// Метод для генерації двовимірний масиву (матриці) заданої розмірності
function generateMatrix(m, n, min, max) {
    const matrix = [];
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        matrix.push(row);
    }
    return matrix;
}

// Метод для виведення матриці у заданому форматі
function printMatrix(matrix) {
    if (!matrix || matrix.length === 0) {
        console.log("Матриця порожня");
        return;
    }

    const cols = matrix[0].length;
    let header = "        "; 
    for (let c = 0; c < cols; c++) {
        header += ` | стовпець ${c + 1}`;
    }
    console.log(header);
    console.log("");

    for (let r = 0; r < matrix.length; r++) {
        let rowStr = `рядок ${r + 1} `;
        for (let c = 0; c < cols; c++) {
            rowStr += ` | ${String(matrix[r][c]).padEnd(10)}`;
        }
        console.log(rowStr);
        console.log("");
    }
}


// Завдання 1: Відняти від елементів кожного рядка його середнє арифметичне
function subtractRowAverage(matrix) {
    return matrix.map(row => {
        const sum = row.reduce((acc, val) => acc + val, 0);
        const average = sum / row.length;
        return row.map(val => Number((val - average).toFixed(2)));
    });
}

// Завдання 2: Циклічний зсув матриці на k вправо та на k догори
function cyclicShift(matrix, kRight, kUp) {
    if (matrix.length === 0) return [];
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    const shiftedMatrix = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let newR = (r - kUp) % rows;
            if (newR < 0) newR += rows; 
            
            let newC = (c + kRight) % cols;
            
            shiftedMatrix[newR][newC] = matrix[r][c];
        }
    }
    return shiftedMatrix;
}

// Завдання 3: Видалити рядки та стовпці, що містять максимальні елементи
function removeMaxRowsAndCols(matrix) {
    if (matrix.length === 0) return [];
    const rows = matrix.length;
    const cols = matrix[0].length;

    let maxVal = -Infinity;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] > maxVal) maxVal = matrix[r][c];
        }
    }

    const rowsToDelete = new Set();
    const colsToDelete = new Set();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] === maxVal) {
                rowsToDelete.add(r);
                colsToDelete.add(c);
            }
        }
    }

    const newMatrix = [];
    for (let r = 0; r < rows; r++) {
        if (!rowsToDelete.has(r)) {
            const newRow = [];
            for (let c = 0; c < cols; c++) {
                if (!colsToDelete.has(c)) {
                    newRow.push(matrix[r][c]);
                }
            }
            if (newRow.length > 0) newMatrix.push(newRow);
        }
    }
    return newMatrix;
}

// Завдання 4: Обертання на 90 градусів за годинниковою (in-place)
function rotateMatrixInPlace(matrix) {
    const n = matrix.length;
    if (n === 0 || matrix[0].length !== n) {
        console.log("Помилка: In-place обертання можливе лише для квадратної матриці.");
        return matrix;
    }

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
    
    return matrix; 
}

// Приклади для перевірки (вивід у консоль)

console.log("--- ПІДГОТОВКА: ЗГЕНЕРОВАНА МАТРИЦЯ (3х4) ---");
const myMatrix = generateMatrix(3, 4, 1, 20);
printMatrix(myMatrix);

console.log("--- ЗАВДАННЯ 1: ВІДНЯТИ СЕРЕДНЄ АРИФМЕТИЧНЕ РЯДКА ---");
const matrixAvgSubtracted = subtractRowAverage(myMatrix);
printMatrix(matrixAvgSubtracted);

console.log("--- ЗАВДАННЯ 2: ЦИКЛІЧНИЙ ЗСУВ (вправо 1, догори 1) ---");
const shiftedMatrix = cyclicShift(myMatrix, 1, 1);
printMatrix(shiftedMatrix);

console.log("--- ЗАВДАННЯ 3: ВИДАЛЕННЯ РЯДКІВ ТА СТОВПЦІВ З МАКСИМУМОМ ---");
const matrixWithMax = generateMatrix(3, 3, 1, 10);
matrixWithMax[1][1] = 999; 
console.log("До видалення (максимум у рядку 2, стовпці 2):");
printMatrix(matrixWithMax);
console.log("Після видалення:");
const matrixWithoutMax = removeMaxRowsAndCols(matrixWithMax);
printMatrix(matrixWithoutMax);

console.log("--- ЗАВДАННЯ 4: ОБЕРТАННЯ IN-PLACE (на 90 градусів) ---");
const squareMatrix = generateMatrix(3, 3, 1, 9);
console.log("До обертання:");
printMatrix(squareMatrix);

rotateMatrixInPlace(squareMatrix);
console.log("Після обертання за годинниковою стрілкою:");
printMatrix(squareMatrix);
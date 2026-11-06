// Функція генерації масиву випадкових чисел в діапазоні [-10000, 10000]
function generateData(size){
    const arr = new Int32Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(Math.random() * 20001) - 10000;
    }
    return arr;
}

// Спосіб 1: Вбудоване сортування масиву
function method1Sort(arr) {
    const copy = new Int32Array(arr);
    copy.sort(); 
    return copy[copy.length - 6];
}

// Спосіб 2: Масив з 6 найбільших елементів 
function method2Top6(arr) {
    const top = new Int32Array(6).fill(-Infinity);
    const len = arr.length;

    for (let i = 0; i < len; i++) {
        const current = arr[i];

        if (current > top[5]) {
            top[5] = current;

            let j = 5;

            while (j > 0 && top[j] > top[j - 1]) {
                const temp = top[j];
                top[j] = top[j - 1];
                top[j - 1] = temp;
                j--;
            }
        }
    }
    return top[5];
}

// Спосіб 3: 6 разів знайти максимум із заміною
function method3FindMax(arr) {
    const copy = new Int32Array(arr);
    const len = copy.length;
    let max = - Infinity;

    for (let k = 0; k < 6; k++) {
        max = - Infinity;
        let maxIndex = -1;

        for (let i = 0; i < len; i++) {
            if (copy[i] > max) {
                max = copy[i];
                maxIndex = i;
            }
        }
        if (maxIndex !== -1) {
            copy[maxIndex] = -Infinity;
        }
    }
    return max;
}

// Основна функція тестування
function runBenchmark() {
    const sizes = [10000, 100000, 1000000, 10000000, 100000000];
    const runs = 3;

    // Виведення заголовка таблиці
    console.log("Розмір вхідних даних | Спосіб 1 (Сортування) | Спосіб 2 (Масив) | Спосіб 3 (Макс. елементи)");
    console.log("-".repeat(100));

    for (const size of sizes) {
        const times = { m1: [], m2: [], m3: [] };

        for (let run = 0; run < runs; run++) {
            const data = generateData(size);

            let start = performance.now();
            method1Sort(data);
            times.m1.push(Math.round(performance.now() - start));

            start = performance.now();
            method2Top6(data);
            times.m2.push(Math.round(performance.now() - start));

            start = performance.now();
            method3FindMax(data);
            times.m3.push(Math.round(performance.now() - start));
        }

        const formatResult = (arr) => {
            const avg = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
            return `${avg}(${arr.join(' ')})`;
        };

        const str1 = formatResult(times.m1);
        const str2 = formatResult(times.m2);
        const str3 = formatResult(times.m3);

        console.log(
            `${size.toString().padEnd(20)} | ` +
            `${str1.padEnd(21)} | ` +
            `${str2.padEnd(16)} | ` +
            `${str3}`
        );
    }
}

runBenchmark();
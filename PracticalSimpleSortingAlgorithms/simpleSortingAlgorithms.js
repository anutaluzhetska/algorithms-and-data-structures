//  Метод генерації масиву заданої довжини в заданому діапазоні
function generateArray(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min +1)) + min);
}

// Метод виведення елементів масиву у специфічному форматі 
function printArray(arr) {
    const formattedElements = arr.map((value, index) => `[cell - ${index}, value - ${value}]`).join(',');
    console.log(`"{${formattedElements}}"`);
}

// Функція для перевірки, чи відсортований масив 
function isArraySorted(arr, isAscending) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (isAscending && arr[i] > arr[i + 1]) return false;
        if (!isAscending && arr[i] < arr[i + 1]) return false;
    }
    return true;
}

// Алгоритм Bubble sort 
function bubbleSort(arr, isAscending) {
    let sortedArr = [...arr];
    let n = sortedArr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            let condition = isAscending ? sortedArr[j] > sortedArr[j + 1] : sortedArr[j] < sortedArr[j + 1];
            if (condition) {
                let temp = sortedArr[j];
                sortedArr[j] = sortedArr[j + 1];
                sortedArr[j + 1] = temp;
            }
        }
    }
    return sortedArr;
}

// Алгоритм Insertion sort
function insertionSort(arr, isAscending) {
    let sortedArr = [...arr];
    for (let i = 1; i < sortedArr.length; i++) {
        let current = sortedArr[i];
        let j = i - 1;
        while (j >= 0 && (isAscending ? sortedArr[j] > current : sortedArr[j] < current)) {
            sortedArr[j + 1] = sortedArr[j];
            j--;
        }
        sortedArr[j + 1] = current;
    }
    return sortedArr;
}

// Aлгоритм Selection sort
function selectionSort(arr, isAscending) {
    let sortedArr = [...arr];
    let n = sortedArr.length;
    for (let i = 0; i < n - 1; i++) {
        let targetIndex = i;
        for (let j = i + 1; j < n; j++) {
            let condition = isAscending ? sortedArr[j] < sortedArr[targetIndex] : sortedArr[j] > sortedArr[targetIndex];
            if (condition) {
                targetIndex = j;
            }
        }
        if (targetIndex !== i) {
            let temp = sortedArr[i];
            sortedArr[i] = sortedArr[targetIndex];
            sortedArr[targetIndex] = temp;
        }
    }
    return sortedArr;
}

const ARRAY_SIZE = 2500;
const isAscending = true;

// Генеруємо несортований масив 
const unsortedArray = generateArray(ARRAY_SIZE, 1, 10000);

// Перевіряємо початковий масив
if (isArraySorted(unsortedArray, isAscending)) {
    console.log("-> Перевірка: Початковий масив вже відсортовано. Виводжу масив:");
    printArray(unsortedArray);
} else {
    console.log("-> Перевірка: Початковий масив НЕ відсортовано. Початок сортування...");
    
    // Виконуємо сортування масиву методом Insertion Sort
    const sortedArray = insertionSort(unsortedArray, isAscending);
    
    console.log("\n-> Результат сортування:");

    printArray(sortedArray);
}

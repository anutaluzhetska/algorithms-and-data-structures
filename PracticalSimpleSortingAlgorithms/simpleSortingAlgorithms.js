//  Метод генерації масиву заданої довжини в заданому діапазоні
function generateArray(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Метод виведення елементів масиву у специфічному форматі 
function printArray(arr) {
    const formattedElements = arr.map((value, index) => `[cell - ${index}, value - ${value}]`).join(',');
    console.log(`"{${formattedElements}}"`);
}

// Функція для перевірки, чи відсортований масив 
function isArraySorted(arr, isAscending) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (isAscending && arr[i] > arr[i + 1] ||
                !isAscending && arr[i] < arr[i + 1]) 
            return false;
    }
    return true;
}

// Алгоритм Bubble sort 
function bubbleSort(arr, isAscending) {
    let sortedArr = [...arr];
    let n = sortedArr.length;
    let isSwapper = true;
    for (let i = 0; i < n - 1  && isSwapper; i++) {
        isSwapper = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (isAscending ? sortedArr[j] > sortedArr[j + 1] : sortedArr[j] < sortedArr[j + 1]) {
        
                let temp = sortedArr[j];
                sortedArr[j] = sortedArr[j + 1];
                sortedArr[j + 1] = temp;
                isSwapper = true;
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

const ARRAY_SIZE = 100000;
const isAscending = true;

// Генеруємо несортований масив 
const unsortedArray = generateArray(ARRAY_SIZE, -100000, 100000);

// Перевіряємо початковий масив
console.log("-> Перевірка: Початковий масив:");
if (isArraySorted(unsortedArray, isAscending)) {
    
    console.log("Вже відсортовано.");
} else {
    console.log("НЕ відсортовано.");
}
    // Виконуємо сортування масиву методом Insertion Sort

    console.time("bubbleSort");
    const sortedArray = bubbleSort(unsortedArray, isAscending);
    console.timeEnd("bubbleSort");
    console.log("\n-> Результат сортування:");

//    console.time("bubbleSort2");
  //  const sortedArray2 = bubbleSort(sortedArray, isAscending);
    //console.timeEnd("bubbleSort2");

 if (isArraySorted(sortedArray, isAscending)) {
    
    console.log("Вже відсортовано.");
} else {
    console.log("НЕ відсортовано.");
}


// Функція для генерації масиву випадкових цілих чисел у заданому діапазоні
function generateRandomArray(size, min, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Функція для перевірки, чи відсортований масив
function isSorted(arr, isAscending = true) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (isAscending) {
            if (arr[i] > arr[i + 1]) return false;
        } else {
            if(arr[i] < arr[i + 1]) return false;
        }
    }
    return true;
}

// Функція розбиття (Partition)
function partition(arr, isAscending, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        let condition = isAscending ? arr[j] <= pivot : arr[j] >= pivot;
        
        if (condition) {
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}

// Головна функція сортування Quick Sort
function quickSort(arr, isAscending = true, low = 0, high = arr.length -1) {
    if (low < high) {
        let pi = partition(arr, isAscending, low, high);

        quickSort(arr, isAscending, low, pi - 1);
        quickSort(arr, isAscending, pi + 1 , high);
    }
    return arr;
}

const ARRAY_SIZE = 100000;
const arr = generateRandomArray(ARRAY_SIZE, -1000, 1000);
const sortAscending = true;

console.log(`-> Перевірка: Початковий масив (розмір: ${ARRAY_SIZE} елементів):`);
console.log(isSorted(arr, sortAscending) ? "Вже відсортовано." : "НЕ відсортовано.");

console.time("quickSort");
const sortedArray = quickSort(arr, sortAscending);
console.timeEnd("quickSort");

console.log(`-> Результат сортування:`);
console.log(isSorted(arr, sortAscending) ? "Вже відсортовано." : "НЕ відсортовано.");
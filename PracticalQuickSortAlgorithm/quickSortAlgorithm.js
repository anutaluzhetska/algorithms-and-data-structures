// Функція для генерації масиву випадкових цілих чисел у заданому діапазоні
function generateRandomArray(size, min, max) {
    if (size <= 0) return [];
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Функція для перевірки, чи відсортований масив
function isSorted(arr, isAscending = true) {
    if (!Array.isArray(arr) || arr.length <= 1) return true;
    for (let i = 0; i < arr.length - 1; i++) {
        if (isAscending) {
            if (arr[i] > arr[i + 1]) return false;
        } else {
            if(arr[i] < arr[i + 1]) return false;
        }
    }
    return true;
}

// QUICK SORT
// Функція розбиття (Partition)
function partition(arr, isAscending, low, high) {

    let pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;

   // let pivotIndex = Math.floor((low + high) / 2); -- Вибір півота як елемента посередині підмасиву

    let tempPivot = arr[pivotIndex];
    arr[pivotIndex] = arr[high];
    arr[high] = tempPivot;

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
    if(!Array.isArray(arr) || arr.length <= 1) return arr;

    if (low < high) {
        let pi = partition(arr, isAscending, low, high);

        quickSort(arr, isAscending, low, pi - 1);
        quickSort(arr, isAscending, pi + 1 , high);
    }
    return arr;
}

// HEAP SORT
// Функція для підтримки властивості купи (Heapify)
function heapify(arr, n, i, isAscending) {
    let extreme = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n) {
        let condition = isAscending ? arr[left] > arr[extreme] : arr[left] < arr[extreme];
        if (condition) {
            extreme = left;
        }
    }

    if (right < n) {
        let condition = isAscending ? arr[right] > arr[extreme] : arr[right] < arr[extreme];
        if (condition) {
            extreme = right;
        }
    }

    if (extreme !== i) {
        let temp = arr[i];
        arr[i] = arr[extreme];
        arr[extreme] = temp;

        heapify(arr, n, extreme, isAscending);
    }
}

// Головна функція Heap Sort
function heapSort(arr, isAscending = true) {
    if (!Array.isArray(arr) || arr.length <= 1) return arr;

    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, isAscending);
    }

    for (let i = n - 1; i > 0; i--) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        heapify(arr, i, 0, isAscending);
    }
    return arr;
}

const ARRAY_SIZE = 1000000;
const originalArray = generateRandomArray(ARRAY_SIZE, -1000, 1000);
const sortAscending = true;

console.log(`-> Перевірка: Початковий масив (розмір: ${ARRAY_SIZE} елементів):`);
console.log(isSorted(originalArray, sortAscending) ? "Вже відсортовано." : "НЕ відсортовано.");

const arrForQuick = [...originalArray];
const arrForHeap = [...originalArray];

// Тест Quick Sort
console.time("QuickSort");
quickSort(arrForQuick, sortAscending);
console.timeEnd("QuickSort");
console.log(`Результат QuickSort: ${isSorted(arrForQuick, sortAscending) ? "Відсортовано коректно" : "ПОМИЛКА сортування"}\n`);

// Тест Heap Sort
console.time("HeapSort");
heapSort(arrForHeap, sortAscending);
console.timeEnd("HeapSort");
console.log(`Результат HeapSort: ${isSorted(arrForHeap, sortAscending) ? "Відсортовано коректно" : "ПОМИЛКА сортування"}`);


console.time("QuickSort2");
quickSort(arrForQuick, sortAscending);
console.timeEnd("QuickSort2");
console.log(`Результат QuickSort: ${isSorted(arrForQuick, sortAscending) ? "Відсортовано коректно" : "ПОМИЛКА сортування"}\n`);

// Тест Heap Sort
console.time("HeapSort2");
heapSort(arrForHeap, sortAscending);
console.timeEnd("HeapSort2");
console.log(`Результат HeapSort: ${isSorted(arrForHeap, sortAscending) ? "Відсортовано коректно" : "ПОМИЛКА сортування"}`);

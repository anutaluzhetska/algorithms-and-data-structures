// Підготовка: Допоміжний метод для генерації масиву випадкових цілих чисел
function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Завдання 1: Кількість та сума парних елементів у заданому діапазоні індексів
function processEvenElementsInRange(arr, startIndex, endIndex) {
    let count = 0;
    let sum = 0;
    
    const start = Math.max(0, startIndex);
    const end = Math.min(arr.length - 1, endIndex);

    for (let i = start; i <= end; i++) {
        if (arr[i] % 2 === 0) {
            count++;
            sum += arr[i];
        }
    }
    return { count, sum };
}

// Завдання 2: Середнє арифметичне та кількість елементів, більших за нього
function calculateAverageAndGreaterCount(arr) {
    if (arr.length === 0) return { average: 0, countGreater: 0 };

    const sum = arr.reduce((acc, val) => acc + val, 0);
    const average = sum / arr.length;
    const countGreater = arr.filter(val => val > average).length;

    return { average, countGreater };
}

// Завдання 3: Третій масив як попарна сума елементів двох масивів однакової довжини
function pairwiseSum(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error("Масиви повинні бути однакової довжини.");
    }
    return arr1.map((val, index) => val + arr2[index]);
}

// Завдання 4: Третій масив як конкатенація двох масивів різної довжини
function concatenateArrays(arr1, arr2) {
    return [...arr1, ...arr2];
}

// Завдання 5: Поміняти місцями максимум та мінімум (перші входження)
function swapMinMax(arr) {
    if (arr.length === 0) return [];
    
    const result = [...arr]; 
    let minIndex = 0;
    let maxIndex = 0;

    for (let i = 1; i < result.length; i++) {
        if (result[i] < result[minIndex]) minIndex = i;
        if (result[i] > result[maxIndex]) maxIndex = i;
    }

    const temp = result[minIndex];
    result[minIndex] = result[maxIndex];
    result[maxIndex] = temp;

    return result;
}

// Завдання 6: Поділити масив на два: з додатних та від'ємних елементів
function splitPositiveNegative(arr) {
    const positives = [];
    const negatives = [];

    for (const num of arr) {
        if (num >= 0) positives.push(num); 
        else negatives.push(num);
    }

    return { positives, negatives };
}

// Завдання 7: Видалити дублікати максимума та мінімума
function removeMinMaxDuplicates(arr) {
    if (arr.length === 0) return [];

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    
    let minFound = false;
    let maxFound = false;

    return arr.filter(num => {
        if (num === min) {
            if (!minFound) {
                minFound = true;
                return true; 
            }
            return false; 
        }
        if (num === max) {
            if (!maxFound) {
                maxFound = true;
                return true;
            }
            return false;
        }
        return true; 
    });
}

// Завдання 8: Третій масив з елементів обох масивів між їхніми середніми арифметичними
function filterBetweenAverages(arr1, arr2) {
    const avg1 = calculateAverageAndGreaterCount(arr1).average;
    const avg2 = calculateAverageAndGreaterCount(arr2).average;
    
    const lowerBound = Math.min(avg1, avg2);
    const upperBound = Math.max(avg1, avg2);

    const combined = [...arr1, ...arr2];
    return combined.filter(num => num >= lowerBound && num <= upperBound);
}

// Приклади
const baseNumbers = generateRandomArray(12, -30, 30);
console.log("Початковий масив для перевірки:", baseNumbers);

console.log("\n1. Аналіз парних елементів (індекси від 3 до 8):", processEvenElementsInRange(baseNumbers, 3, 8));

console.log("2. Середнє значення та кількість більших за нього:", calculateAverageAndGreaterCount(baseNumbers));

const leftGroup = generateRandomArray(4, 1, 20);
const rightGroup = generateRandomArray(4, 1, 20);
console.log("\nМасиви однакової довжини:", leftGroup, rightGroup);
console.log("3. Сума елементів попарно:", pairwiseSum(leftGroup, rightGroup));

const shortList = generateRandomArray(2, 5, 15);
const longList = generateRandomArray(5, 50, 90);
console.log("\nРізні масиви для злиття:", shortList, longList);
console.log("4. Злитий масив (конкатенація):", concatenateArrays(shortList, longList));

console.log("\n5. Заміна місцями найбільшого і найменшого числа:", swapMinMax(baseNumbers));

console.log("6. Групування на додатні і від'ємні:", splitPositiveNegative(baseNumbers));

const valuesWithDuplicates = [8, -3, 5, 8, -3, -3, 2];
console.log("\nМасив з повторами:", valuesWithDuplicates);
console.log("7. Очищення від дублікатів мін/макс:", removeMinMaxDuplicates(valuesWithDuplicates));

const firstSequence = generateRandomArray(5, 0, 10);
const secondSequence = generateRandomArray(5, 20, 30);
console.log("\nДва нові масиви для 8 завдання:", firstSequence, secondSequence);
console.log("8. Числа, що потрапили між їхніми середніми арифметичними:", filterBetweenAverages(firstSequence, secondSequence));
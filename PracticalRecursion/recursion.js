// від 1  до n
function print1ToN(n) {
    if (n === 0) return;
    print1ToN(n - 1);
    console.log(n);
}

// від A до B 
function printAToB(a, b) {
    console.log(a);
    if (a === b) return;

    if (a < b) {
        printAToB(a + 1, b);
    } else {
        printAToB(a - 1, b);
    }
}

// Точна степінь двійки
function isPowerOfTwo(n) {
    if (n === 1) {
        console.log("Yes");
        return;
    }

    if (n % 2 !== 0 || n === 0) {
        console.log("No");
        return;
    }
    isPowerOfTwo(Math.floor(n / 2));
}

// Сума цифр числа
function sumOfDigits(n) {
    if (n === 0) return 0;
    return (n % 10) + sumOfDigits(Math.floor(n / 10));
}

// Цифри числа справа наліво
function digitsRightToLeft(n) {
    console.log(n % 10);
    if (Math.floor(n / 10) === 0) return;
    digitsRightToLeft(Math.floor(n / 10));
}

// Цифри числа зліва направо
function digitsLeftToRight(n) {
    if (Math.floor(n / 10) !== 0) {
        digitsLeftToRight(Math.floor(n / 10));
    }
    console.log(n % 10);
}

console.log("--- Завдання 1 ---");
print1ToN(5); 

console.log("\n--- Завдання 2 ---");
printAToB(5, 1); 

console.log("\n--- Завдання 3 ---");
isPowerOfTwo(8); 
isPowerOfTwo(3); 

console.log("\n--- Завдання 4 ---");
console.log(sumOfDigits(179)); 

console.log("\n--- Завдання 5 ---");
digitsRightToLeft(179); 

console.log("\n--- Завдання 6 ---");
digitsLeftToRight(179);
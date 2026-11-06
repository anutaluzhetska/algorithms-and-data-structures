const fs = require('fs');

// Клас, що представляє вузол дерева Хаффмана
class HuffmanNode {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }

    // Перевірка чи є вузол листком (кінцевим символом)
    isLeaf() {
        return this.left ===  null && this.right === null;
    }
}

// Професійна реалізація алгоритму Хаффмана
class HuffmanCoder {
    constructor() {
        this.root = null;
        this.codes = new Map();
    }

    // Побудова таблиці частот
    _buildFrequencyTable(text) {
        const freq = new Map();
        for (const char of text) {
            freq.set(char, (freq.get(char) || 0) + 1);
        }
        return freq;
    }

    // Побудова дерева Хаффмана
    _buildTree(freqTable) {
        let nodes = Array.from(freqTable.entries()).map(
            ([char, freq]) => new HuffmanNode(char, freq)
        );

        while (nodes.length > 1) {
            nodes.sort((a, b) => a.freq - b.freq);

            const left = nodes.shift();
            const right = nodes.shift();

            const parent = new HuffmanNode(null, left.freq + right.freq, left, right);

            nodes.push(parent);
        }
        this.root = nodes[0];
    }

    // Генерація кодів на основі маршрутів у дереві
    _generateCodes(node, currentCode = "") {
        if (!node) return;

        if (node.isLeaf()) {
            this.codes.set(node.char, currentCode);
        }

        this._generateCodes(node.left, currentCode + "0");
        this._generateCodes(node.right, currentCode + "1");
    }

    // Головний метод кодування
    encode(text) {
        if (!text || text.length === 0) return {encodedStr: "", uniformLength: 0, huffmanLength: 0};

        const freqTable = this._buildFrequencyTable(text);

        if (freqTable.size === 1) {
            this.root = new HuffmanNode(text[0], text.length);
            this.codes.set(text[0], "0");
            return {
                encodedStr: "0".repeat(text.length), 
                uniformLength: text.length, 
                huffmanLength: text.length
            };
        }

        this._buildTree(freqTable);
        this._generateCodes(this.root);

        const encodedStr = Array.from(text).map(char => this.codes.get(char)).join("");

        const bitsPerSymbol = Math.ceil(Math.log2(freqTable.size));
        const uniformLength = text.length * bitsPerSymbol;

        return {
            encodedStr, 
            uniformLength, 
            huffmanLength: encodedStr.length,
            codes: Object.fromEntries(this.codes) 
        };
    }

    // Декодування закодованого рядка
    decode(encodedText) {
        if (!this.root || !encodedText) return "";

        let decodedStr = "";
        let currentNode = this.root;

        for (const bit of encodedText) {
            if (bit === "0") {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }

            if (currentNode.isLeaf()) {
                decodedStr += currentNode.char;
                currentNode = this.root;
            }
        }
        return decodedStr;
    }
}

// Блок тестування
const coder = new HuffmanCoder();
console.log("--- 1. Текстова фраза з прикладу ---");
const testTextPDF = "абабагаламага";
const resultExample  = coder.encode(testTextPDF);

console.log(`Оригінал: ${testTextPDF}`);
console.log(`Словник:`, resultExample.codes);
console.log(`Закодовано: ${resultExample.encodedStr}`);
console.log(`Довжина (Хаффман): ${resultExample.huffmanLength} біт`);
console.log(`Довжина (Рівномірний): ${resultExample.uniformLength} біт`);
console.log(`Декодовано: ${coder.decode(resultExample.encodedStr)}\n`);


console.log("--- 2. Довільна текстова фраза ---");
const customText = "Я люблю котиків";
const resultCustom = coder.encode(customText);

console.log(`Оригінал: ${customText}`);
console.log(`Словник:`, resultCustom.codes);
console.log(`Закодовано: ${resultCustom.encodedStr}`);
console.log(`Довжина (Хаффман): ${resultCustom.huffmanLength} біт`);
console.log(`Довжина (Рівномірний): ${resultCustom.uniformLength} біт`);
console.log(`Економія пам'яті: ${resultCustom.uniformLength - resultCustom.huffmanLength} біт`);
console.log(`Декодовано: ${coder.decode(resultCustom.encodedStr)}\n`);



// ДОДАТКОВЕ ЗАВДАННЯ 

// Додаткове завдання: Програма-архіватор на основі алгоритму Хаффмана
class HuffmanArchiver {
    constructor(coderInstance) {
        this.coder = coderInstance || new HuffmanCoder();
    }

    compressFile(inputPath, outputPath) {
        console.log(`[Архівування] Читання файлу: ${inputPath}...`)

        const text = fs.readFileSync(inputPath, "utf8");
        if (!text) {
            console.error("Файл порожній або не знайдений.");
            return;
        }

        const { encodedStr, codes } = this.coder.encode(text);

        const archiveData = {
            metadata: codes, 
            data: encodedStr
        };

        fs.writeFileSync(outputPath, JSON.stringify(archiveData));

        const originalSize = Buffer.byteLength(text, "utf8");
        const compressedSize = fs.statSync(outputPath).size;

        console.log(`[Архівування] Успішно! Збережено у: ${outputPath}`);
        console.log(`Розмір до: ~${originalSize} байт`);
        console.log(`Розмір архіву: ~${compressedSize} байт (у форматі JSON)`);
    }

    // Операція розпакування файлу
    decompressFile(inputPath, outputPath) {
        console.log(`[Розпакування] Читання архіву: ${inputPath}...`);

        const archiveContent = fs.readFileSync(inputPath, 'utf8');
        const parsedArchive = JSON.parse(archiveContent);

        const decodedText = this.coder.decode(parsedArchive.data);
        fs.writeFileSync(outputPath, decodedText);
        console.log(`[Розпакування] Успішно! Відновлений текст збережено у: ${outputPath}\n`);
    }
}

// Блок тестування
const archiverCoder = new HuffmanCoder();
const archiver = new HuffmanArchiver(archiverCoder);

const ORIGINAL_FILE = 'input.txt';
const ARCHIVE_FILE = 'archive.huf';
const DECOMPRESSED_FILE = 'output.txt';

// Створюємо тестовий текстовий файл
const dummyText = "Це тестовий файл для перевірки роботи програми-архіватора. ".repeat(50);
fs.writeFileSync(ORIGINAL_FILE, dummyText);
console.log(`--- Створено тестовий файл ${ORIGINAL_FILE} ---\n`);

// Стискаємо файл
archiver.compressFile(ORIGINAL_FILE, ARCHIVE_FILE);
console.log("");

// Розпаковуємо файл
archiver.decompressFile(ARCHIVE_FILE, DECOMPRESSED_FILE);

//  Перевірка цілісності даних
const originalData = fs.readFileSync(ORIGINAL_FILE, 'utf8');
const decompressedData = fs.readFileSync(DECOMPRESSED_FILE, 'utf8');

console.log(`--- Результат перевірки ---`);
if (originalData === decompressedData) {
    console.log("УСПІХ: Розпакований файл абсолютно ідентичний оригіналу!");
} else {
    console.log("ПОМИЛКА: Дані втрачено або пошкоджено.");
}

// Очищення тимчасових файлів після тесту (опціонально)
// fs.unlinkSync(ORIGINAL_FILE);
// fs.unlinkSync(ARCHIVE_FILE);
// fs.unlinkSync(DECOMPRESSED_FILE);
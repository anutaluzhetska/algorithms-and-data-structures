class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this._length = 0;
    }

    // Додає нові елементи в чергу
    enqueue(element) {
        const newNode = new Node(element);

        if (this._length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this._length++;
    }

    // Повертає (видаляє) наявні елементи з черги за правилом FIFO
    dequeue() {
        if (this._length === 0) {
            return "Черга порожня";
        }

        const removedData = this.head.data;
        this.head = this.head.next;

        this._length--;

        if (this._length === 0) {
            this.tail = null;
        }
        return removedData;
    }

    // Повертає кількість елементів черги
    count() {
        return this._length;
    }

    // Виводить всі елементи черги
    toString() {
        if (this._length === 0) {
            return "[]";
        }
        let current = this.head;
        let result = [];
        while (current !== null) {
            result.push(current.data);
            current = current.next;
        }
        return `[Head/Початок] -> ${result.join(" -> ")} -> [Tail/Кінець]`;
    }
}

const myQueue = new Queue();

// Додаємо елементи в чергу
myQueue.enqueue(12);
myQueue.enqueue(25);
myQueue.enqueue(8);

// Вміст черги: [Head/Початок] -> 12 -> 25 -> 8 -> [Tail/Кінець]
console.log("Вміст черги:", myQueue.toString()); 

// Кількість елементів
console.log("Кількість елементів:", myQueue.count());

// Видаляємо(отримуємо) елемент за правилом FIFO
console.log("Видаляємо елемент:", myQueue.dequeue());

// Вміст черги після видалення: [Head/Початок] -> 25 -> 8 -> [Tail/Кінець]
console.log("Вміст черги після видалення:", myQueue.toString());

// Видаляємо наступний елемент
console.log("Видаляємо наступний елемент:", myQueue.dequeue());

// Кількість елементів залишилась
console.log("Кількість елементів залишилась:", myQueue.count());


module.exports = { Node, Queue };
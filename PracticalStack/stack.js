class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Stack {

    #top;
    #length;

    constructor() {
        this.#top = null;
        this.#length = 0;
    }

    // Вставляє об'єкт на вершину стеку
    push(element) {
        const newNode = new Node(element);
        newNode.next = this.#top;
        this.#top = newNode;
        this.#length++;
    }

    // Повертає елемент з вершини стеку та видаляє його
    pop() {
        if (this.#top ===  null) {
            throw new Error("Стек порожній");
        }
        const poppedData = this.#top.data;
        this.#top = this.#top.next;
        this.#length--;
        return poppedData;
    }

    // Повертає елемент з вершини стеку (без видалення)
    peek() {
        if (this.#top ===  null) {
            throw new Error("Стек порожній");
        }
        return this.#top.data;
    }

    // Видаляє всі елементи зі стеку
    clear() {
        this.#top = null;
        this.#length = 0;
    }

    // Повертає кількість елементів стеку
    count() {
        return this.#length;
    }

    // Повертає кількість елементів у стеку 
    size() {
        return this.#length;
    }

    // Виводить всі елементи стеку, але не видаляє їх
    toString() {
        if(this.#top === null) {
            return "[]";
        }
        let current = this.#top;
        let result = [];
        while(current !== null) {
            result.push(current.data);
            current = current.next;
        }
        return `[Вершина] -> ${result.join(" -> ")} -> [Низ]`;
    }
}

const myStack = new Stack();

// Додаємо елементи
myStack.push(11);
myStack.push(22);
myStack.push(33);

// Вміст стеку: [Вершина] -> 33 -> 22 -> 11 -> [Низ]
console.log("Вміст стеку:", myStack.toString()); 

// Кількість елементів (size)
console.log("Кількість елементів (size):", myStack.size()); 

// Елемент на вершині (peek)
console.log("Елемент на вершині (peek):", myStack.peek()); 

// Видаляємо елемент (pop)
console.log("Видаляємо елемент (pop):", myStack.pop()); 

// Вміст після pop: [Вершина] -> 22 -> 11 -> [Низ]
console.log("Вміст після pop:", myStack.toString()); 

// Кількість елементів (count)
console.log("Кількість елементів (count):", myStack.count());

// Очищення стеку -- Вміст після clear: []
myStack.clear();
console.log("Вміст після clear:", myStack.toString());
// Клас вузла двобічно зв'язного списку
class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

// Клас двобічно зв'язного списку
class DoublyLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Додати елемент в початок списку
    addFirst(data) {
        const newNode = new Node(data);
        
        if (this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    // Додати елемент в кінець списку
    addLast(data) {
        const newNode = new Node(data);
        if (this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    } 

    // Видалити перший елемент списку
    removeFirst() {
        if (this.size === 0) return null;
        const removedData = this.head.data;
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.size--;
        return removedData;
    }

    // Видалити останній елемент списку
    removeLast() {
        if (this.size === 0) return null;
        const removedData = this.tail.data;
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.size--;
        return removedData;
    }

    // Перевірити чи існує заданий елемент в списку
    contains(data) {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) return true;
            current = current.next;
        }
        return false;
    }

    // Внутрішній метод для оптимізованого пошуку вузла за індексом
    _getNodeAt(index) {
        if (index < 0 || index >= this.size) return null;

        let current;

        if (index < this.size / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) {
                current = current.next;
            }
        } else {
            current = this.tail;
            for (let i = this.size - 1; i > index; i--) {
                current = current.prev;
            }
        }
        return current;
    }

    // Отримати елемент за індексом
    getAt(index) {
        const node = this._getNodeAt(index);
        return node ? node.data : null;
    }

    // Вставити елемент за індексом
    insertAt(index, data) {
        if (index < 0 || index > this.size) return false;
        
        if (index === 0) {
            this.addFirst(data);
            return true;
        }
        if (index === this.size) {
            this.addLast(data);
            return true;
        }

        const current = this._getNodeAt(index);
        const newNode = new Node(data);

        newNode.prev = current.prev;
        newNode.next = current;
        current.prev.next = newNode;
        current.prev = newNode;
        
        this.size++;
        return true;
    }

    // Видалити елемент за індексом
    removeAt(index) {
        if (index < 0 || index >= this.size) return null;
        
        if (index === 0) return this.removeFirst();
        if (index === this.size - 1) return this.removeLast();

        const current = this._getNodeAt(index);
        current.prev.next = current.next;
        current.next.prev = current.prev;
        
        this.size--;
        return current.data;
    }

    // Повернути найбільший елемент
    findMax() {
        if (this.size === 0) return null;
        let max = this.head.data;
        let current = this.head.next;
        
        while (current !== null) {
            if (current.data > max) max = current.data;
            current = current.next;
        }
        return max;
    }

    // Повернути найменший елемент
    findMin() {
        if (this.size === 0) return null;
        let min = this.head.data;
        let current = this.head.next;
        
        while (current !== null) {
            if (current.data < min) min = current.data;
            current = current.next;
        }
        return min;
    }
    
    // Отримати розмір списку
    getSize() {
        return this.size;
    }

    // Вивести елементи списку у заданому форматі
    print() {
        if (this.size === 0) {
            console.log("{}");
            return;
        }
        
        let result = "{";
        let current = this.head;
        let index = 0;
        
        while (current !== null) {
            result += `[index:${index}; value:${current.data}]`;
            if (current.next !== null) result += " ... ";
            current = current.next;
            index++;
        }
        result += "}";
        console.log(result);
    }

    // Додати множину елементів (масив) у вказане місце
    insertArrayAt(index, array) {
        if (index < 0 || index > this.size || !Array.isArray(array) || array.length === 0) {
            return false;
        }

        let currentIndex = index;
        for (const item of array) {
            this.insertAt(currentIndex, item);
            currentIndex++;
        }
        return true;
    }
}

// Тестування
console.log("--- Ініціалізація та базове додавання ---");
const list = new DoublyLinkedList();
list.addLast(10);
list.addLast(20);
list.addFirst(5);
list.print(); 

console.log("\n--- Вставка елемента та масиву за індексом ---");
list.insertAt(2, 15);
list.print();
list.insertArrayAt(1, [6, 7, 8]);
list.print();

console.log("\n--- Видалення елементів ---");
list.removeFirst();
list.removeLast();
list.removeAt(2);
list.print();

console.log("\n--- Аналіз списку ---");
console.log("Чи є 15 у списку?", list.contains(15));
console.log("Елемент під індексом 3:", list.getAt(3));
console.log("Максимальний елемент:", list.findMax());
console.log("Мінімальний елемент:", list.findMin());
console.log("Розмір списку:", list.getSize());
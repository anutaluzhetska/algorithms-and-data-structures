class PriorityNode {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority; 
        this.next = null;
    }
}

class PriorityQueue {
    constructor() {
        this.head = null;
        this._length = 0;
    }

    enqueue(element, priority) {
        const newNode = new PriorityNode(element, priority);

        if (this.head === null || priority < this.head.priority) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null && current.next.priority <= priority) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
        this._length++;
    }

    dequeue() {
        if (this._length === 0) {
            return "Черга порожня";
        }

        const removedData = this.head.data;
        this.head = this.head.next;
        this._length--;

        return removedData;
    }

    count() {
        return this._length;
    }

    toString() {
        if (this._length === 0) {
            return "[]";
        }
        let current = this.head;
        let result = [];
        while (current !== null) {
            result.push(`${current.data}(пріор:${current.priority})`);
            current = current.next;
        }
        return `[Head/Початок] -> ${result.join(" -> ")} -> [Кінець]`;
    }
}

const myPriorityQueue = new PriorityQueue();

myPriorityQueue.enqueue("Звичайне завдання 1", 3);
myPriorityQueue.enqueue("ТЕРМІНОВЕ ЗАВДАННЯ", 1);
myPriorityQueue.enqueue("Звичайне завдання 2", 3);
myPriorityQueue.enqueue("Важливе завдання", 2);

console.log("Вміст черги після додавання:");
console.log(myPriorityQueue.toString()); 

console.log("\nВидаляємо елемент з найвищим пріоритетом:", myPriorityQueue.dequeue());

console.log("\nВміст черги після видалення:");
console.log(myPriorityQueue.toString());
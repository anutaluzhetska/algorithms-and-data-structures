class PriorityNode {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority; 
    }
}

class PriorityQueue {
    constructor() {
        this.heap = [];
        this._length = 0;
    }

    enqueue(element, priority) {
        const newNode = new PriorityNode(element, priority);
        this.heap.push(newNode);
        this._length++;

        let i = this.heap.length - 1;

        while(i > 0) {
            let parent = Math.floor((i - 1) / 2);

            if(this.heap[i].priority >= this.heap[parent].priority) {
                break;
            }

            let temp = this.heap[i];
            this.heap[i] = this.heap[parent];
            this.heap[parent] = temp;

            i = parent;
        }
    }

    dequeue() {
        if (this._length === 0) {
            return "Черга порожня";
        }

        const removedData = this.heap[0].data;
        const lastNode = this.heap.pop();
        this._length--;

        if (this._length > 0) {
            this.heap[0] = lastNode;
            let i = 0;


            while(true) {
                let left = 2 * i + 1;
                let right = 2 * i + 2;
                let smallest = i;

                if (left < this._length && this.heap[left].priority < this.heap[smallest].priority) {
                    smallest = left;
                }

                if (right < this._length && this.heap[right].priority < this.heap[smallest].priority) {
                    smallest = right;
                }

                if (smallest === i) {
                    break;
                }

                let temp = this.heap[i];
                this.heap[i] = this.heap[smallest];
                this.heap[smallest] = temp;

                i = smallest;
            }
        }
        return removedData;
    }

    count() {
        return this._length;
    }

    toString() {
        if (this._length === 0) {
            return "[]";
        }
        let result = [];
        
        for(let i = 0; i < this.heap.length; i++){
            result.push(`${this.heap[i].data}(пріор:${this.heap[i].priority})`);
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
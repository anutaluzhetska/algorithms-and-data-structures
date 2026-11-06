class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this._size = 0;
    }

    // Додати елемент
    insert(data) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
        this._size++;
    }

    _insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        }   
        
        else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    // Видалити елемент
    remove(data) {
        const initialSize = this._size;
        this.root = this._removeNode(this.root, data);
        if (this._size === initialSize) {
            console.log(`Елемент ${data} не знайдено для видалення.`)
        }
    }

    _removeNode(node, key) {
        if (node === null) return null;

        if (key < node.data) {
            node.left = this._removeNode(node.left, key);
            return node;
        } else if (key > node.data) {
            node.right = this._removeNode(node.right, key);
            return node;
        } else {

            this._size--;

            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.left === null) {
                return node.right
            } else if (node.right === null) {
                return node.left;
            }

            const minNodeRight = this._findMinNode(node.right);
            node.data = minNodeRight.data;
            
            this._size++;

            node.right = this._removeNode(node.right, minNodeRight.data);
            return node;
        }
    }

    _findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // Перевірити наявність елемента (знайти)
    find(data) {
        return this._searchNode(this.root, data);
    }

    _searchNode(node, data) {
        if (node === null) return false;
        if (data < node.data) return this._searchNode(node.left, data);
        if (data > node.data) return this._searchNode(node.right, data);
        return true;
    }
    
    // Вивести всі елементи
    printAll() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }

    _inOrder(node, result) {
        if (node !== null) {
            this._inOrder(node.left, result);
            result.push(node.data);
            this._inOrder(node.right, result);
        }
    }

    // Вивести найменший елемент
    findMin() {
        if (this.root === null) return null;
        return this._findMinNode(this.root).data;
    }

    // Вивести найбільший елемент
    findMax() {
        if (this.root === null) return null;
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }

    // Вивести кількість
    count() {
        return this._size;
    }
}

const tree = new BinaryTree();

// Додаємо елементи
tree.insert(8);
tree.insert(3);
tree.insert(10);
tree.insert(1);
tree.insert(6);
tree.insert(14);
tree.insert(4);
tree.insert(7);
tree.insert(13);

// Всі елементи (відсортовані)
console.log("Всі елементи (відсортовані):", tree.printAll());

// Кількість вузлів:
console.log("Кількість вузлів:", tree.count());

// Чи є елемент якийсь у дереві?
console.log("Чи є елемент 6 у дереві?", tree.find(6));
console.log("Чи є елемент 100 у дереві?", tree.find(100));

// Найменший елемент
console.log("Найменший елемент:", tree.findMin());

// Найбільший елемент
console.log("Найбільший елемент:", tree.findMax());

// Всі елементи після видалення
tree.remove(3);
console.log("Всі елементи після видалення 3:", tree.printAll());

// Кількість вузлів після видалення
console.log("Кількість вузлів після видалення:", tree.count());
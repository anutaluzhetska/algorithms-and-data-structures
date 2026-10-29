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

    push(element) {
        const newNode = new Node(element);
        newNode.next = this.#top;
        this.#top = newNode;
        this.#length++;
    }

    pop() {
        if (this.#top === null) {
            throw new Error("Стек порожній");
        }
        const poppedData = this.#top.data;
        this.#top = this.#top.next;
        this.#length--;
        return poppedData;
    }

    size() {
        return this.#length; 
    }
}

// const palindrome = "А роза упала на лапу Азора";
// const palindrome = "Я несу гусеня"
const palindrome = "Аня молодець"
const stack = new Stack();

const cleanStr = palindrome.toLocaleLowerCase().replaceAll(" ", "");
for (let i = 0; i < cleanStr.length; i++) {
    stack.push(cleanStr[i]);
}

let isPali = true;
for (let i = 0; i < cleanStr.length; i++) {
    if (stack.pop() !== cleanStr[i]) {
        isPali = false;
        break;
}
}

if(isPali){
console.log(`"${palindrome}" -- це паліндром!`);
} else {
    console.log(`"${palindrome}" -- це не паліндром.`)
}



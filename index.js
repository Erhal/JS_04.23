//---------------------------------FIRST TASK---------------------------------
class Stack {
    constructor(limit = 10) {
        if (!Number.isInteger(limit) || limit <= 0) {
            throw new Error('Invalid limit value');
        }
        this.limit = limit;
        this.size = 0;
        this.top = null;
    }

    push(elem) {
        if (this.size === this.limit) {
            throw new Error('Limit exceeded');
        }
        this.top = { value: elem, next: this.top };
        this.size++;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Empty stack');
        }
        const topNode = this.top;
        this.top = topNode.next;
        this.size--;
        return topNode.value;
    }

    peek() {
        return this.top ? this.top.value : null;
    }

    isEmpty() {
        return this.size === 0;
    }

    toArray() {
        const result = [];
        let current = this.top;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result.reverse();
    }

    static fromIterable(iterable) {
        if (iterable === undefined || iterable === null || typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error('Not iterable');
        }
        const stack = new Stack([...iterable].length);
        for (const elem of iterable) {
            stack.push(elem);
        }
        return stack;
    }
}

//---------------------------------SECOND TASK---------------------------------

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(elem) {
        const newNode = { value: elem, next: null };

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }

    prepend(elem) {
        const newNode = { value: elem, next: null };

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
    }

    find(elem) {
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value === elem) {
                return currentNode.value;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    toArray() {
        const elements = [];

        let currentNode = this.head;

        while (currentNode) {
            elements.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return elements;
    }

    static fromIterable(iterable) {
        if (iterable === undefined || iterable === null || typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error('Not iterable');
        }

        const linkedList = new LinkedList();

        for (const element of iterable) {
            linkedList.append(element);
        }

        return linkedList;
    }
}
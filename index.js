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
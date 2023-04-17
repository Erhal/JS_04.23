//---------------------------------FIRST TASK---------------------------------

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function (...newArgs) {
                return curried.apply(this, args.concat(newArgs));
            }
        }
    };
}


//---------------------------------SECOND TASK---------------------------------

class Calculator {
    constructor(x, y) {
        if (arguments.length !== 2 || !isFinite(x) || !isFinite(y)) {
            throw new Error('');
        }
        this.x = x;
        this.y = y;
        this.setX = this.setX.bind(this);
        this.setY = this.setY.bind(this);
        this.getSum = this.getSum.bind(this);
        this.getMul = this.getMul.bind(this);
        this.getSub = this.getSub.bind(this);
        this.getDiv = this.getDiv.bind(this);
    }

    setX(num) {
        if (typeof num !== 'number') {
            throw new Error('');
        }
        this.x = num;
    }

    setY(num) {
        if (typeof num !== 'number') {
            throw new Error('');
        }
        this.y = num;
    }

    getSum() {
        return this.x + this.y;
    }

    getMul() {
        return this.x * this.y;
    }

    getSub() {
        return Math.abs(this.x - this.y);
    }

    getDiv() {
        if (this.y === 0) {
            throw new Error('');
        }
        return this.x / this.y;
    }
}
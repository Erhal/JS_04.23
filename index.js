//---------------------------------FIRST TASK---------------------------------

function makeDeepCopy(obj) {

    if (obj instanceof Map) {
        let copy = new Map();
        for (let [key, value] of obj) {
            let newKey = (typeof key === 'object' && key !== null) ? makeDeepCopy(key) : key;
            let newValue = (typeof value === 'object' && value !== null) ? makeDeepCopy(value) : value;
            copy.set(newKey, newValue);
        }
        return copy;
    }

    if (obj instanceof Set) {
        let copy = new Set();
        for (let value of obj) {
            copy.add((typeof value === 'object' && value !== null) ? makeDeepCopy(value) : value);
        }
        return copy;
    }

    if (typeof obj === 'object' && obj !== null) {
        let copy = Array.isArray(obj) ? [] : {};

        for (let key in obj) {
            let value = obj[key];
            copy[key] = (typeof value === 'object' && value !== null) ? makeDeepCopy(value) : value;
        }

        return copy;
    }

    throw new Error();
}

//---------------------------------SECOND TASK---------------------------------

function selectFromInterval(arr, val1, val2) {

    if (!Array.isArray(arr)) {
        throw new Error();
    }

    if (!arr.every(num => typeof num === 'number' && isFinite(num))) {
        throw new Error();
    }

    if (typeof val1 !== 'number' || typeof val2 !== 'number' || !isFinite(val1) || !isFinite(val2)) {
        throw new Error();
    }

    const [MIN_VAL, MAX_VAL] = val1 < val2 ? [val1, val2] : [val2, val1];


    return arr.filter(num => num >= MIN_VAL && num <= MAX_VAL);
}
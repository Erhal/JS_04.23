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
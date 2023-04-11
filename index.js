//---------------------------------FIRST TASK---------------------------------

Array.prototype.customFilter = function (callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new Error(`${callback} is not a function`);
    }

    let result = [];

    for (let idx = 0; idx < this.length; idx++) {
        const element = this[idx];
        if (callback.call(thisArg, element, idx, this)) {
            result.push(element);
        }
    }


    return result;
};
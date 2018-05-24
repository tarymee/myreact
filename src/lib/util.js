function extend(target, source) {
    // Don't do anything if source isn't an object
    if (source === null || typeof source !== 'object') return target;

    const keys = Object.keys(source);
    let i = keys.length;
    while (i--) {
        target[keys[i]] = source[keys[i]];
    }
    return target;
}

function isFunction(arg) {
    return typeof arg === 'function'
}
export default {
    isFunction,
    extend
}
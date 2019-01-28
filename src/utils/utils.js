export function resetKeyValue(obj) {
    Object.keys(obj).forEach(function(key) {
        obj[key] = "";
    });
}

export function hasNoKey(obj) {
    return Object.keys(obj).length > 0;
}
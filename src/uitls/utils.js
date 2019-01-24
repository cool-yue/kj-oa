export function resetKeyValue(obj) {
    Object.keys(obj).forEach(function(key) {
        obj[key] = "";
    });
}
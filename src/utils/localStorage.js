export function getStorage(key) {
    return parse(window.localStorage.getItem(key));
}

export function setStorage(key, obj) {
    window.localStorage.setItem(key, stringify(obj));
}

function stringify(obj) {
    try {
        return JSON.stringify(obj);
    } catch (error) {
        return null;
    }
}
function parse(obj) {
    try {
        return JSON.parse(obj);
    } catch (error) {
        return null;
    }
}
const setToStorage = (name,data) => {
    localStorage.setItem(name,data);
}

const getFromStorage = (name) => {
    return localStorage.getItem(name);
}

const removeFromStorage = (name) => {
    localStorage.removeItem(name);
}

const removeAllFromStorage = () => {
    localStorage.clear();
}


export {setToStorage,getFromStorage,removeFromStorage,removeAllFromStorage}
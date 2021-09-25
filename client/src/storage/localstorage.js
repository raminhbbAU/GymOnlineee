const set = (name,data) => {
    localStorage.setItem(name, data);
}

const get = (name) => {
    localStorage.getItem(name);
}

const remove = (name) => {
    localStorage.removeItem(name);
}

const removeAll = () => {
    localStorage.clear();
}


export default {set,get,remove,removeAll}
import ls from 'localstorage-slim';

const customTTL = 1 * 60 * 60;

const setToStorage = (name,data) => {
    let complex = {data:data,timestamp: new Date().getTime()}
    localStorage.setItem(name,complex);
   
    if (name === "isAuth" || name === "JWT_Token" || name === "logininfo") 
    {
        ls.set(name, data, { ttl: customTTL });
    }
    else
    {
        ls.set(name, data);
    }

}

const getFromStorage = (name) => {
    return ls.get(name);
}

const removeFromStorage = (name) => {
    ls.remove(name);
}

const removeAllFromStorage = () => {
    ls.clear();
}


export {setToStorage,getFromStorage,removeFromStorage,removeAllFromStorage}
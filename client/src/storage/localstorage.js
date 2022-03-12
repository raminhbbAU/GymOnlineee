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
    let res = ls.get(name);
    
    if (name === "isAuth" || name === "JWT_Token" || name === "logininfo") 
    {
        if (res == null)
        {

            let curPath = window.location.href

            // check Exception
            if (curPath.toLowerCase().endsWith("/login")  || curPath.toLowerCase().endsWith("/signup") || curPath.toLowerCase().endsWith("/gymsignup") || curPath.toLowerCase().endsWith("/confirmationsendmessage") || curPath.toLowerCase().includes("/emailconfirmation"))
            {
                return res;
            }
            else
            {
                curPath = curPath.replace(window.location.pathname,"/login")                
                window.location.href = curPath;
            }
           
        }
    }

    return res
}

const removeFromStorage = (name) => {
    ls.remove(name);
}

const removeAllFromStorage = () => {
    ls.clear();
}


export {setToStorage,getFromStorage,removeFromStorage,removeAllFromStorage}
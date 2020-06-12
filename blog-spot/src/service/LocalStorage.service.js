let LocalStorageService = () => {
    return {        
        alreadyInLocalStorage: (key) => {
            let item = localStorage.getItem(key)
            return !!item;
        },
        setData: (key, value) => {
            localStorage.setItem(key, value);
        },
        getData: (key) => {
            return localStorage.getItem(key);
        }
    }
}

export default LocalStorageService();
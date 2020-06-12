class SessionStorageService {
    setItem = (key, value) => sessionStorage.setItem(key, value);

    getItem = key => sessionStorage.getItem(key);
};

export default new SessionStorageService();
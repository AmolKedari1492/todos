const SESSION_STORAGE_JWT_KEY = 'appjwttoken'; 
const SESSION_STORAGE_ACCONTID_KEY = 'accountId'; 

const USERS_API = {
    LIST: "https://apertum-interview.herokuapp.com/api/users",
    LOGIN: 'https://apertum-interview.herokuapp.com/api/user/login'
};

const API_STATUS_CODE = {
    SUCCESS: 200,
    UNAUTHORISED: 403,
    ERROR: 404
};

const LOGIN_ERRORS = {
    ID_EMPTY: "User id fields is empty",
    PASSWORD_EMPTY: "User password fields is empty",
    FORBIDDEN: "Forbidden"
};

const APP_ROUTES = {
    LOGIN: '/login',
    List: '/'
}

export {
    SESSION_STORAGE_JWT_KEY,
    SESSION_STORAGE_ACCONTID_KEY,
    USERS_API,
    API_STATUS_CODE,
    LOGIN_ERRORS,
    APP_ROUTES
};
const LOGIN_SUCCESS = 'login_success';
const LOGIN_FAILED = 'login_failed';
const LOGOUT = 'logout';

const loginSuccessFn = () => {
    return {
        type: LOGIN_SUCCESS,
        payload: {}
    }
};

const loginFailedFn = () => {
    return {
        type: LOGIN_FAILED,
        payload: {}
    }
};

const logoutFn = () => {
    return {
        type: LOGOUT,
        payload: {}
    }
};

export {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    loginSuccessFn,
    loginFailedFn,
    logoutFn
}
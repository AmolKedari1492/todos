const APP_INIT = 'app_init';

const appInit = () => {
    return {
        type: APP_INIT,
        payload: {}
    }
};

export {
    APP_INIT,
    appInit
}
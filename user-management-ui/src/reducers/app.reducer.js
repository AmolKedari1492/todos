import {
    APP_INIT
} from "../actions/app.actions";

let appReducer = (state = {}, action) => {
    switch (action.type) {
        case APP_INIT:
        default:
            return state;
    }
};

export default appReducer
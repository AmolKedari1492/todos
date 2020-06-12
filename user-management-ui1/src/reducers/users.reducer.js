import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
} from "../actions/users.actions";

let userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case LOGIN_FAILED:
        case LOGOUT:
            return { ...state };
        default:
            return state;
    }
};

export default userReducer;
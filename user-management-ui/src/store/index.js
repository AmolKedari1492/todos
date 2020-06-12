import { createStore, combineReducers } from 'redux';
import AppReducer from '../reducers/app.reducer';
import userReducer from '../reducers/users.reducer';

const rootReducer = combineReducers({
    AppReducer,
    userReducer
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
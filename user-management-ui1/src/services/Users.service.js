import APIService from "./APIService";
import SessionStorage from "./SessionStorage.service";

import {
    USERS_API,
    SESSION_STORAGE_JWT_KEY,
    SESSION_STORAGE_ACCONTID_KEY
} from "../constants";

class UserService {
    getUsers = (successCb, errorCb) => APIService.get({ 
        url: USERS_API.LIST
    }, successCb, errorCb);

    login = (params, data, successCb, errorCb) => APIService.post({ 
        url: USERS_API.LOGIN
    }, data, successCb, errorCb);

    logout = () => {
        SessionStorage.setItem(SESSION_STORAGE_JWT_KEY, undefined);
        SessionStorage.setItem(SESSION_STORAGE_ACCONTID_KEY, undefined);
    }

    getUserFilters = () => {
        return {
            "AGE": "age",
            "NAME": "name",
            "MAX_NAME_LENGTH": "length"
        }
    }

    getUserAgeGroups = () => {
        return [
            {
                label: '0-10',
                min: 0,
                max: 10
            },
            {
                label: '11-20',
                min: 0,
                max: 10
            },
            {
                label: '21-30',
                min: 0,
                max: 10
            },            {
                label: '31-40',
                min: 0,
                max: 10
            },            {
                label: '41-50',
                min: 0,
                max: 10
            },            {
                label: '51-60',
                min: 0,
                max: 10
            },            {
                label: '61-70',
                min: 0,
                max: 10
            },            {
                label: '71-80',
                min: 0,
                max: 10
            },
            {
                label: '81-90',
                min: 0,
                max: 10
            },
            {
                label: '91-100',
                min: 0,
                max: 10
            },
            {
                label: '101-100+',
                min: 100,
                max: 1000
            }
        ]
    }
};

export default new UserService();
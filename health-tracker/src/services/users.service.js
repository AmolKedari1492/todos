import axios from "axios";

class UserService {
    login(query, data, successHandler, errorHandler) {
        axios({
            'method':'POST',
            'url':'/api/login',
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "http://akedari-dummy-api.herokuapp.com/",
            data
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    logout(query, successHandler, errorHandler) {
        axios({
            'method':'GET',
            'url':'/api/logout',
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "http://akedari-dummy-api.herokuapp.com/"
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    register(query, data, successHandler, errorHandler) {
        axios({
            'method':'POST',
            'url':'/api/users/',
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "http://akedari-dummy-api.herokuapp.com/",
            data
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    getUser(query, successHandler, errorHandler) {
        axios({
            'method':'GET',
            'url':'/api/users/' + query._id,
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "http://akedari-dummy-api.herokuapp.com/",
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    updateUser(query, data, successHandler, errorHandler) {
        axios({
            'method':'PUT',
            'url':'/api/users/',
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "http://akedari-dummy-api.herokuapp.com/",
            data
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    resetPassword(query, data, successHandler, errorHandler) {
        axios({
            'method':'PUT',
            'url':'/api/users/change-password',
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "http://akedari-dummy-api.herokuapp.com/",
            data
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    getUsers = (query, successHandler, errorHandler) => {
        axios({
            'method':'GET',
            'url':'/api/users/',
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "http://akedari-dummy-api.herokuapp.com/",
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    deleteUser = (query, successHandler, errorHandler) => {
        axios({
            'method':'DELETE',
            'url':'/api/users/' + query._id,
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "http://akedari-dummy-api.herokuapp.com/",
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

};

export default new UserService();

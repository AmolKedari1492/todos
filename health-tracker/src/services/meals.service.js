import axios from "axios";
import UtilService from "../utils/";

class MealsService {
    getMeals(query, successHandler, errorHandler) {
        axios({
            'method':'GET',
            'url':'/api/meals/all/meals' + UtilService.composeQuerystring(query),
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "https://akedari-dummy-api.herokuapp.com/"
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    getMeal(query, successHandler, errorHandler) {
        axios({
            'method':'GET',
            'url':'/api/meals/' + query._id,
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "https://akedari-dummy-api.herokuapp.com/"
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }
    
    updateMeal(query, data, successHandler, errorHandler) {
        axios({
            'method':'PUT',
            'url':'/api/meals/',
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "https://akedari-dummy-api.herokuapp.com/",
            data,
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    createMeal(query, data, successHandler, errorHandler) {
        axios({
            'method':'POST',
            'url':'/api/meals/',
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "https://akedari-dummy-api.herokuapp.com/",
            data,
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }

    deleteMeal(query, successHandler, errorHandler) {
        axios({
            'method':'DELETE',
            'url':'/api/meals/' + query._id,
            'headers': {
                "Accept": "application/json",
                'content-type':'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            baseURL: "https://akedari-dummy-api.herokuapp.com/"
        }).then(resp => successHandler(resp.data), (err) => errorHandler(err))
    }
};

export default new MealsService();
import axios from "axios";
import SessionStorage from "./SessionStorage.service";
import {
    SESSION_STORAGE_JWT_KEY,
    API_STATUS_CODE
} from "../constants/";

const getJWTToken = () => {
    let jwtToken = SessionStorage.getItem(SESSION_STORAGE_JWT_KEY);
    jwtToken = jwtToken && (jwtToken !== "undefined" || jwtToken !== "null") ? jwtToken : undefined;
    return jwtToken;
};

class APIService {
    get = (params, successCb, errorCb) => {
        let jwtToken = getJWTToken();
        axios.get(params.url, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
                "Access-Control-Allow-Origin": "*"
            },
        }).then((res) => {
            if(res.status === API_STATUS_CODE.SUCCESS) {
                successCb(res.data);
            }
        }).catch((error) => {
            errorCb(error);
        });
    }

    post = (params, data, successCb, errorCb) => {
        let jwtToken = getJWTToken();
        axios({
            method: 'post',
            url: params.url,
            data,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${jwtToken}`,
                "Access-Control-Allow-Origin": "*"
            }
          }).then((res) => {
            if(res.status === API_STATUS_CODE.SUCCESS && !res.data.error_message) {
                successCb( res.data);
            } else {
                errorCb({
                    error_message: res.data.error_message
                });
            }
        }).catch((error) => {
            errorCb(error);
        });
    }
};

export default new APIService();
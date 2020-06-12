import React from 'react';
import { connect } from 'react-redux';

import'./Login.scss';

import {
    loginSuccessFn,
    loginFailedFn,
    logoutFn
} from "../../actions/users.actions";

import {
    SESSION_STORAGE_JWT_KEY,
    SESSION_STORAGE_ACCONTID_KEY,
    APP_ROUTES,
    LOGIN_ERRORS
} from "../../constants/";

import UserService from '../../services/Users.service';
import SessionStorage from '../../services/SessionStorage.service';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accountId: '',
            pswd: '',
            error: '',
            isAPIPending: false
        };

        let data = SessionStorage.getItem(SESSION_STORAGE_JWT_KEY);
        data = data && (data !== "undefined" || data !== "null") ? data : undefined;
        if(data) {
            UserService.logout();
            this.props.logoutFn();
        }
    }

    initState = () => {
        this.setState({
            accountId: '',
            pswd: ''
        });
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    isValidationError = () => {
        if(!this.state.accountId) {
            return LOGIN_ERRORS.ID_EMPTY;
        } else if(!this.state.pswd) {
            return LOGIN_ERRORS.PASSWORD_EMPTY;
        }
    }

    onLogin = () => {
        
        if(this.state.isAPIPending) {
            return ;
        }

        let error = this.isValidationError();
        if(error) {
            this.setState({
                error
            });
            return ;
        }

        let data = {
            accountId: this.state.accountId,
            pswd: this.state.pswd
        };

        this.setState({
            isAPIPending: true,
            error: ''
        });

        UserService.login({}, data, (resp) => {
            let { token } = resp;
            if(token) {
                SessionStorage.setItem(SESSION_STORAGE_JWT_KEY, token);
                SessionStorage.setItem(SESSION_STORAGE_ACCONTID_KEY, data.accountId);
                this.props.history.push(APP_ROUTES.List);
            }
            this.setState({
                isAPIPending: false
            });
            this.props.loginSuccessFn()
        }, error => {
            console.error(error);
            this.props.loginFailedFn()
            this.setState({
                error: error.error_message || LOGIN_ERRORS.FORBIDDEN,
                isAPIPending: false
            });
        });
    }

    render() {
        return (<div className="login card">
            <div className="card-header">Login</div>
            <div className="card-body">
            {
                this.state.error &&
                <div className="login__error">{ this.state.error } </div>
            }
            <div className="login__fields">
                <label htmlFor="userID">Account ID</label>
                <input type="text" name="accountId" value={this.state.accountId} onChange={this.onChangeHandler} />
            </div>
            <div className="login__fields">
                <label htmlFor="pswd">Password</label>
                <input type="password" name="pswd" value={this.state.pswd} onChange={this.onChangeHandler} />
            </div>
            <div className="login__actions">
                <div className="btn btn-primary" onClick={ this.onLogin }>
                    Login
                    {
                        this.state.isAPIPending &&
                        <span className="spinner"></span>
                    }
                </div>
            </div>

            </div>
        </div>)
    }
};

const dispatchStateToProps = (dispatch) => {
    return {
        loginSuccessFn: () => dispatch(loginSuccessFn()),
        loginFailedFn: () => dispatch(loginFailedFn()),
        logoutFn: () => dispatch(logoutFn())
    }
};

export default connect(null, dispatchStateToProps)(Login);
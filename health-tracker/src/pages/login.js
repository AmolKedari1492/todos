import React, { Component } from "react";
import "./login.css"

import UserService from "../services/users.service";
import Cookies from 'universal-cookie';
import utilService from "../utils/index";
import { Link } from 'react-router-dom';

const cookies = new Cookies();


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        })
    }

    onLoginClickHandler = () => {

        if (!this.state.email) {
            this.setState({
                error: 'Please enter Email.'
            });
            return;
        }

        if (!utilService.validateEmail(this.state.email)) {
            this.setState({
                error: 'Email is not valid.'
            });
            return;
        }

        if (!this.state.password) {
            this.setState({
                error: 'Please enter Password.'
            });
            return;
        }

        let data = {
            email: this.state.email,
            password: this.state.password
        }
        UserService.login({}, data, (user) => {
            cookies.set('_id', user._id, { path: '/' });
            cookies.set('name', user.name, { path: '/' });
            cookies.set('admin', user.admin, { path: '/' });
            cookies.set('dailyTarget', user.dailyTarget, { path: '/' });
            cookies.set('email', user.email, { path: '/' });
            this.props.history.push('/?userID='+ user._id, { userID: user._id });
        }, (err) => {
            this.setState({
                error: err.message
            });
        });

    }

    render() {
        return (<div className="login">
            <div className="login__heading">
                <h2>Login</h2>
            </div>
            {
                this.state.error
                    ?
                    <div className="login__error">{this.state.error}</div>
                    :
                    null
            }
            <div className="login__inputs">
                <label>Email</label>
                <input type="email" className="login__control" name="email" value={this.state.email} onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__inputs">
                <label>Password</label>
                <input type="password" className="login__control" name="password" value={this.state.password} onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__actions">
                <input type="button" className="login__actions--direct"  value="Login" onClick={this.onLoginClickHandler} />
            </div>
            <div className="login__links">
                <Link
                    to={{
                        pathname: "/register",
                        label: "register"
                    }}
                >Register</Link>
            </div>
        </div>)
    }
}

export default Login;

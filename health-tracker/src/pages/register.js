import React, { Component } from "react";
import "./login.css";

import UserService from "../services/users.service";
import utilService from "../utils/index";
import { Link } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            cpassword: '',
            error: ''
        };
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        })
    }

    onRegisterClickHandler = () => {

        if (!this.state.name) {
            this.setState({
                error: 'Please enter Name.'
            });
            return;
        }

        if (typeof this.state.name !== "string") {
            this.setState({
                error: 'Name is invalid.'
            });
            return;
        }

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

        if (!this.state.password || !this.state.cpassword) {
            this.setState({
                error: 'Please enter Password.'
            });
            return;
        }

        if (this.state.password && this.state.cpassword && this.state.password !== this.state.cpassword) {
            this.setState({
                error: 'Password not matched.'
            });
            return;
        }

        let data = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            dailyTarget: 100
        };

        UserService.register({}, data, (user) => {
            this.props.history.push('/login')
        }, (err) => {
            this.setState({
                error: err.message
            });
        });

    }

    render() {
        return (<div className="login">
            <div className="login__heading">
                <h2>Register</h2>
            </div>
            {
                this.state.error
                    ?
                    <div className="login__error">{this.state.error}</div>
                    :
                    null
            }
            <div className="login__inputs">
                <label>Name</label>
                <input className="login__control" type="text" name="name" value={ this.state.name } onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__inputs">
                <label>Email</label>
                <input className="login__control" type="email" name="email" value={ this.state.email } onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__inputs">
                <label>Password</label>
                <input className="login__control" type="password" name="password" value={ this.state.password } onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__inputs">
                <label>Confirm password</label>
                <input className="login__control" type="password" name="cpassword" value={ this.state.cpassword } onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__inputs">
                <input className="login__actions--direct" type="button" value="Register" onClick={this.onRegisterClickHandler} />
            </div>
            <div className="login__links">
                <Link
                    to={{
                        pathname: "/login",
                        label: "login"
                    }}
                >Login</Link>
            </div>
        </div>)
    }
}

export default Register;

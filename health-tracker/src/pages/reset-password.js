import React, { Component } from "react";
import "./login.css"

import UserService from "../services/users.service";
import utilService from "../utils/index";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            cpassword: '',
            error: ''
        };
        this._id = this.props.match.params._id;
    }

    componentDidMount() {
        UserService.getUser({ _id: this._id }, (resp) => {
            this.setState({
                email: resp.email
            });            
        }, (err) => {
            console.error(err);
        });
    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            error: ''
        })
    }

    onResetClickHandler = () => {
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
            _id: this._id,
            password: this.state.password
        };

        UserService.resetPassword({}, data, (user) => {
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
                <h2>Reset Password</h2>
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
                <input className="login__control" type="email" name="email" value={ this.state.email } disabled/>
            </div>
            <div className="login__inputs">
                <label>Password</label>
                <input className="login__control" type="password" name="password" onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__inputs">
                <label>Confirm password</label>
                <input className="login__control" type="password" name="cpassword" onChange={(e) => this.onChangeHandler(e)} />
            </div>
            <div className="login__actions">
                <input className="login__actions--direct" type="button" value="Reset" onClick={this.onResetClickHandler} />
            </div>
        </div>)
    }
}

export default ResetPassword;
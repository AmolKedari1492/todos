import React, { Component } from "react";
import Cookies from 'universal-cookie';

import "./account.css";
import Nav from "../components/Nav";
import UserService from "../services/users.service";

const cookies = new Cookies();
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            cpassword: '',
            dailyTarget: ''
        };
        this.userID = cookies.get('_id');

        if(this.props.location && this.props.location.state && this.props.location.state.userID) {
            this.userID = this.props.location.state.userID;
        }

        this.isAdmin = cookies.get('admin');
        this.isAdmin = JSON.parse(this.isAdmin);
    };

    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = () => {
        UserService.getUser({ _id: this.userID }, (resp) => {
            this.setState({
                admin: resp.admin,
                email: resp.email,
                dailyTarget: resp.dailyTarget,
                name: resp.name,
                _id: resp._id
            });
        }, (err) => {
            console.error(err);
        })
    }

    onChangeHandler = (e) => {
        this.setState({
            admin: !this.state.admin
        })
    }

    onInputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateUser = () => {
        let { name, email, admin, dailyTarget, _id } = this.state;
        if (!name || !dailyTarget || (dailyTarget && dailyTarget < 1)) {
            this.setState({
                error: 'Please fill proper details'
            });
            return;
        }

        let data = {
            admin,
            email,
            dailyTarget,
            name,
            _id,
        }
        UserService.updateUser({ _id }, data, () => {
            this.props.history.push('/')
        }, (err) => {
            console.error(err)
        });
    }

    changePassword = () => {
        if (!this.state.password) {
            this.setState({
                error: "Password cannot be empty."
            });
            return;
        }
        let data = {
            _id: this.state._id,
            password: this.state.password
        };

        UserService.resetPassword({}, data, (user) => {
            this.props.history.push('/')
        }, (err) => {
            this.setState({
                error: err.message
            });
        });
    }

    render() {
        let activePath = this.props.location.pathname;
        return (<div className="home">
            <header><Nav activePath={activePath} /></header>
            <section>
                <div className="account">
                    <h2>Update</h2>
                    {
                        this.state.error
                            ?
                            <div className="account__error">
                                {
                                    this.state.error
                                }
                            </div>
                            :
                            null
                    }
                    <div className="account__item">
                        <div className="account__item--lable">Email</div>
                        <div className="account__item--value">
                            <input type="text" value={this.state.email} disabled />
                        </div>
                    </div>
                    {
                        this.isAdmin
                            ?
                            <div className="account__item">
                                <div className="account__item--lable">Admin</div>
                                <input className="" type="checkbox" checked={this.state.admin || false} onChange={(e) => this.onChangeHandler(e)} />
                            </div>
                            :
                            null
                    }

                    <div className="account__item">
                        <div className="account__item--lable">Name</div>
                        <div className="account__item--value">
                            <input type="text" name="name" value={this.state.name} onChange={(e) => this.onInputChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="account__item">
                        <div className="account__item--lable">Calories</div>
                        <div className="account__item--value">
                            <input type="text" name="dailyTarget" value={this.state.dailyTarget} onChange={(e) => this.onInputChangeHandler(e)} />
                        </div>
                    </div>
                    <div className="account__actions--direct">
                        <div onClick={this.updateUser}>Save</div>
                    </div>
                    <div className="account__item">
                        <div className="account__item--lable">password</div>
                        <div className="account__item--value">
                            <input type="password" name="password" value={this.state.password} onChange={this.onInputChangeHandler} />
                        </div>
                    </div>
                    <div className="account__actions--direct">
                        <div onClick={this.changePassword}>Change password</div>
                    </div>
                </div>
            </section>
            <footer></footer>
        </div>);
    }
};

export default Account;

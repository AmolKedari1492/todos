import React, { Component } from "react";
import Nav from "../components/Nav";
import "./admin.css";
import "./Home.css";

import UserService from "../services/users.service";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = () => {
        UserService.getUsers({}, (users) => {
            this.setState({
                users
            })
        }, error => console.error(error));
    };

    deleteUser = (user) => {
        UserService.deleteUser(user, (resp) => {
            this.fetchUsers();
        }, error => console.error(error));
    }

    goToMeals = (user) => {
        this.props.history.push('/', { userID: user._id })
    }

    editUser = (user) => {
        this.props.history.push('/account', { userID: user._id })
    }

    render() {
        let activePath = this.props.location.pathname;
        return (<div className="home">
            <header><Nav activePath={activePath} /></header>
            <section>
                <h3>User Management</h3>
                <div className="user-list">
                    <div className="user-list-header">
                        <div className="user-list-item">Name</div>
                        <div className="user-list-item">Email</div>
                        <div className="user-list-item">Actions</div>
                    </div>
                    {
                        this.state.users.map((user, userIndex) => {
                            return (
                                <div className="user-list-body" key={userIndex}>
                                    <div className="user-list-item">{user.name}</div>
                                    <div className="user-list-item">{user.email}</div>
                                    <div className="user-list-item">
                                        <span className="btn btn-primary" onClick={ () => this.goToMeals(user)}>Meals</span>
                                        <span className="btn btn-primary" onClick={ () => this.editUser(user)}>Edit</span>
                                        <span className="btn btn-danger" onClick={ () => this.deleteUser(user) }>Delete</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <footer></footer>

        </div>);
    }
};

export default Admin;
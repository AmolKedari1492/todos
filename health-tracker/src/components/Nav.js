import React from "react";
import { Link } from 'react-router-dom';
import "./Nav.css";

import Cookies from 'universal-cookie';
import UserService from "../services/users.service";

const cookies = new Cookies();

const Nav = (props) => {

    const logout = () => {
        UserService.logout({}, () => {
            cookies.remove('name', { path: '/' });
            cookies.remove('admin', { path: '/' });
            cookies.remove('email', { path: '/' });
            cookies.remove('_id', { path: '/' });
            cookies.remove('dailyTarget', { path: '/' });
        }, (err) => {
            console.error(err)
        });
    }

    let isAdmin = cookies.get('admin');
    isAdmin = JSON.parse(isAdmin)
    return (<div className="nav-tabs nav">
        <Link className={`logo ${props.activePath === '/' ? 'active' : ''}`}
            to={{
                pathname: "/",
                label: "home"
            }}>
            HealthTrackerApp
                </Link>
            <Link className={`${props.activePath === '/account' ? 'active' : ''}`}
                to={{
                    pathname: "/account",
                    label: "account"
                }}>
                Accout
            </Link>
        {
            isAdmin
                ?
                <Link
                    className={`${props.activePath === '/admin' ? 'active' : ''}`}
                    to={{
                        pathname: "/admin",
                        label: "Admin"
                    }}
                >Admin</Link>
                :
                null
        }

        <Link className={`${props.activePath === '/logout' ? 'active' : ''}`}
            to={{
                pathname: "/login",
                label: "logout"
            }}
            onClick={logout}>
            Logout
                </Link>
    </div>)
}

export default Nav;

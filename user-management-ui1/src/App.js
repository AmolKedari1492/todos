import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';

import Login from "./components/login/Login";
import List from "./components/users/List";
import NoRouteFound from "./components/NoRouteFound";

import SessionStorageService from "./services/SessionStorage.service";
import UserService from "./services/Users.service";

import {
  SESSION_STORAGE_JWT_KEY,
  SESSION_STORAGE_ACCONTID_KEY,
  APP_ROUTES
} from "./constants/";

import {
  appInit,
} from "./actions/app.actions";

import {
  logoutFn,
} from "./actions/users.actions";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    let data = SessionStorageService.getItem(SESSION_STORAGE_JWT_KEY);
    data = data && (data !== "undefined" || data !== "null") ? data : undefined;
    return data ? <Component {...props} /> : <Redirect to='/login' />
  }
  } />
);

class App extends React.Component {
  componentDidMount() {
    this.props.appInitCb();
  }

  componentWillReceiveProps(newPros) {
    this.props = newPros;
  }

  logout = () => {
    UserService.logout();
    this.props.history.push(APP_ROUTES.LOGIN);
    this.props.logoutFn();
  }


  renderPageHeader = () => {
    let userName = SessionStorageService.getItem(SESSION_STORAGE_ACCONTID_KEY);

    if (userName && (userName === "undefined" || userName === "null")) {
      return null;
    }

    return (<div className="user-details">
      <div>{userName}</div>
      <div className="logout" onClick={this.logout}>
        <a href="">Logout</a>
      </div>
    </div>)
  }

  render() {
    return (
      <div className="App">
        <header className="navbar navbar-light bg-light">
          <a className="navbar-brand">User Management</a>
          {this.renderPageHeader()}
        </header>
        <section>
          <Switch>
            <PrivateRoute path="/" exact component={List} />
            <Route path="/login" exact component={Login} />
            <Route component={NoRouteFound} />
          </Switch>
        </section>
        <footer></footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => state;

const dispatchStateToProps = (dispatch) => {
  return {
    appInitCb: () => dispatch(appInit()),
    logoutFn: () => dispatch(logoutFn())
  }
};

export default connect(mapStateToProps, dispatchStateToProps)(App);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cookies from 'universal-cookie';

import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Login from './pages/login';
import Admin from './pages/admin';
import Account from './pages/account';
import Home from './pages/home';
import Register from './pages/register';
import ResetPassword from './pages/reset-password';
import Meal from './pages/Meal';


const cookies = new Cookies();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    cookies.get('_id')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/reset-password/:_id" exact component={ResetPassword} />
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path='/account' exact component={Account} />
        <PrivateRoute path='/admin' exact component={Admin} />
        <PrivateRoute path='/meal' exact component={Meal} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

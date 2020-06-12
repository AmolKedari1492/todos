
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import {
    APP_ROUTES
  } from "../../constant/app.constant";
  
import List from "./list/List";
import Blog from "./blog/Blog";


class Blogs extends React.Component {
    render() {
        return (<Router>
            <Switch>
                <Route exact path={APP_ROUTES.BASE} component={List} />
                <Route path={APP_ROUTES.BLOG} component={Blog} />
                <Route path={APP_ROUTES.LIST} component={List} />
                <Route component={List} />
            </Switch>
        </Router>)
    };
};


export default Blogs;
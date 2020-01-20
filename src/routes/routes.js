import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from '../App';
import Home from '../pages/home';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path= "/" component= { Home }/>
            <Redirect from='*' to='/' />
        </Switch>
    </App>

export default AppRoutes;

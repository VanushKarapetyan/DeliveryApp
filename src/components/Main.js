import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
import Changepassword from './Changepassword';
import Forgotpassword from './Forgotpassword';
import Home from './Home';
import Login from './Login';
import Menu from './Menu';
import NotFound from './NotFound';
import Signup from './SignUp';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route path="/home" component={Home} />
            <Route path="/menu" component={Menu} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotpassword" component={Forgotpassword} />
            <Route path="/changepassword" component={Changepassword} />
            <Route component={NotFound} />

        </Switch>
    );
}


export default Main;
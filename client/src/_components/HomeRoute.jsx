import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const HomeRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/workspace', state: { from: props.location } }} />
    )} />
);


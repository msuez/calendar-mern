import React from 'react';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';


export const PrivateRoute = ({
    isAuthenticated,
    ...rest
}) => {

    return isAuthenticated ?
        rest.children
        :
        <Navigate to="/login" />
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

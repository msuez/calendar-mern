import React from 'react';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';


export const PublicRoute = ({
    isAuthenticated,
    ...rest
}) => {

    return isAuthenticated ?
        <Navigate to="/" />
        :
        rest.children
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

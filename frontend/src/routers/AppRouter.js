
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

import { startChecking } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);

    if ( checking ) {
        return <h5>Wait...</h5>;
    }

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/login" element={ 
                        <PublicRoute isAuthenticated={ !!uid }>
                            <LoginScreen />
                        </PublicRoute> 
                    }/>
                    <Route path="/" element={ 
                        <PrivateRoute isAuthenticated={ !!uid }>
                            <CalendarScreen />
                        </PrivateRoute> 
                    }/>
                    <Route path="*" element={ <Navigate to="/login" /> } />
                </Routes>
            </div>
        </Router>
    )
}

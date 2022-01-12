
import Swal from "sweetalert2";
import { fetchHTTP, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./events";

const login = (user) => ({
    type: types.authLogin,
    payload: user,
});

export const startLogin = (email, password) => {
    
    return async (dispatch) => {

        const result = await fetchHTTP('auth', {email, password}, 'POST');
        const body = await result.json();
        
        if(body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch( login({
                uid: body.uid, 
                name: body.name
            }));

        } else {
            Swal.fire('Error', 'The email or password are invalid.', 'error');
        }

    }

}

const register = (user) => ({
    type: types.authStartRegister,
    payload: user,
})

export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        const result = await fetchHTTP('auth/new', {name, email, password}, 'POST');
        const body = await result.json();

        if(body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch( register({
                uid: body.uid, 
                name: body.name
            }));

        } else {
            Swal.fire('Error', `${body.msg}`, 'error');
        }

    }
}

const finishChecking = () => ({
    type: types.authFinishedChecking,
});

export const startChecking = () => {
    return async (dispatch) => {
        
        const result = await fetchWithToken('auth/renew');
        const body = await result.json();

        if(body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch( login({
                uid: body.uid, 
                name: body.name
            }));
            
        } else {
            dispatch( finishChecking() );
        }

    }
}

const logout = () => ({
    type: types.authLogout,
});

export const startLogout = () => {
    return async (dispatch) => {
        
        localStorage.clear();
        dispatch( eventLogout() );
        dispatch( logout() );
        
    }
}


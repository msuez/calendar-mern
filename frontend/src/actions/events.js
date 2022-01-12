import Swal from "sweetalert2";

import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

import { prepareEvents } from "../helpers/fix-events";

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {

        try {

            const { uid, name } = getState().auth;
            
            const result = await fetchWithToken('events', event, 'POST');
            const body = await result.json();
            
            if( body.ok ) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name,
                };
                console.log(event)
                dispatch(eventAddNew(event))
            }

        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events,
});

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {

            const result = await fetchWithToken('events');
            const body = await result.json();

            const events = prepareEvents(body.events);
            
            dispatch( eventLoaded(events) );
            
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
});

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event,
});

export const eventStartUpdate = (event) => {
    return async(dispatch) => {

        try {

            const result = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await result.json();

            if( body.ok ) {
                dispatch( eventUpdated(event) );
            } else {
                Swal.fire('Error', `${body.msg}`, 'error');
            }
            
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}



const eventDeleted = (event) => ({
    type: types.eventDeleted,
});

export const eventStartDelete = () => {
    return async(dispatch, getState) => {

        try {

            const { id } = getState().calendar.activeEvent;

            const result = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await result.json();

            if( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', `${body.msg}`, 'error');
            }
            
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}
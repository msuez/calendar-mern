import { types } from "../types/types";

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent,
});

export const eventEventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event,
});

export const eventEventDeleted = (event) => ({
    type: types.eventDeleted,
});
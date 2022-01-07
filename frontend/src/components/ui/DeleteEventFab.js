import React from 'react';
import { useDispatch } from 'react-redux';

import { eventEventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {

        dispatch(eventEventDeleted());

    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className="fas fa-trash"></i>
            <span> Delete event</span>
        </button>
    )
}

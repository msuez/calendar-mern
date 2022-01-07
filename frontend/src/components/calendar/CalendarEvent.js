import React from 'react'

export const CalendarEvent = ({event}) => {
    const { title, user } = event;
    return (
        <div>
            <strong>{title}</strong>
            <div>
                <strong>User: {user.name}</strong>
            </div>
        </div>
    )
}

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { Draggable } from '@fullcalendar/interaction';
const Big = () => {
    return (
        <div >
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                events={[
                    { title: 'event 1', date: '2021-04-28' },
                    { title: 'event 2', date: '2021-04-29' }
                ]}
            />
        </div>
    )
}

export default Big

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { Draggable } from '@fullcalendar/interaction';
const Big = ({ projects }) => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={projects.map((s) => {
          return {
            title: s.project,
            date: moment(s.dueDate).format('YYYY-MM-DD')
          };
        })}
      />
    </div>
  );
};

export default Big;

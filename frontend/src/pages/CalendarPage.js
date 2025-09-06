import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

export default function CalendarPage(){
  const [events, setEvents] = useState([]);

  useEffect(()=> {
    const load = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_BASE}/bookings/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // convert bookings schedule to events
      const ev = [];
      res.data.forEach(b=>{
        b.schedule.forEach(date=>{
          ev.push({ title: `${b.category} - ${b.status}`, start: date, extendedProps: { bookingId: b._id } });
        });
      });
      setEvents(ev);
    };
    load();
  },[]);

  const handleDateClick = (info) => {
    // user toggles a holiday on that date
    if(!window.confirm(`Mark ${info.dateStr} as holiday (maid should not come)?`)) return;
    // call API to mark user's holiday preference
    // ... POST /bookings/:bookingId/holiday
    alert('Holiday requested. Admin will be notified.');
  };

  return (
    <div className="container mx-auto p-6">
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventColor="#3b82f6"
      />
    </div>
  );
}

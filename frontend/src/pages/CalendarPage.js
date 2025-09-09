// frontend/src/pages/CalendarPage.js
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../utils/api';

export default function CalendarPage(){
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(()=> {
    const load = async () => {
      const res = await api.get('/bookings/my');
      setBookings(res.data);
      const ev = [];
      res.data.forEach(b => {
        b.schedule.forEach(d => {
          ev.push({
            id: `${b._id}-${d}`,
            title: `${b.category}${b.maid ? ` - ${b.maid.name}` : ''}`,
            start: d,
            extendedProps: { bookingId: b._id, date: d, status: b.status }
          });
        });
        // user holidays appear as red (if any)
        (b.userHolidays || []).forEach(d => {
          ev.push({
            id: `${b._id}-holiday-${d}`,
            title: `Holiday (you requested)`,
            start: d,
            display: 'background',
            backgroundColor: '#fde68a'
          });
        });
      });
      setEvents(ev);
    };
    load();
  }, []);

  const handleDateClick = async (info) => {
    // find booking(s) that have this date
    const date = info.dateStr;
    // show a small selection: mark holiday for any booking containing the date
    const affected = bookings.filter(b => b.schedule.includes(date));
    if (affected.length === 0) {
      alert('No scheduled maid visit on this date.');
      return;
    }
    if (!window.confirm(`Mark ${date} as holiday for your booking? Maid will not come.`)) return;
    // apply to first affected booking (you can extend to ask which booking)
    const bookingId = affected[0]._id;
    try {
      await api.post(`/bookings/${bookingId}/holiday`, { date });
      alert('Holiday saved. Admin will be notified.');
      // refresh
      const res = await api.get('/bookings/my');
      setBookings(res.data);
      // rebuild events
      const ev = [];
      res.data.forEach(b => {
        b.schedule.forEach(d => {
          ev.push({
            id: `${b._id}-${d}`,
            title: `${b.category}${b.maid ? ` - ${b.maid.name}` : ''}`,
            start: d,
            extendedProps: { bookingId: b._id, date: d, status: b.status }
          });
        });
        (b.userHolidays || []).forEach(d => {
          ev.push({
            id: `${b._id}-holiday-${d}`,
            title: `Holiday (you requested)`,
            start: d,
            display: 'background',
            backgroundColor: '#fde68a'
          });
        });
      });
      setEvents(ev);
    } catch (e) {
      console.error(e);
      alert('Could not set holiday.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
      <div className="bg-white rounded shadow p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="auto"
        />
        <div className="mt-3 text-sm text-gray-600">Click a date and mark it as a holiday if you don't want maid to come on that day.</div>
      </div>
    </div>
  );
}

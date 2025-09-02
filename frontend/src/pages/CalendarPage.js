import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalendarPage.css';

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({}); // { '2024-06-01': true, ... }
  const [holidays, setHolidays] = useState([]); // array of date strings 'YYYY-MM-DD'

  // Fetch attendance and holidays from backend (mocked here)
  useEffect(() => {
    // Replace with your backend API call to get attendance and holidays
    const fetchData = async () => {
      try {
        // Example API call (adjust URL and data as per your backend)
        // const res = await axios.get('/api/calendar-data');
        // setAttendanceData(res.data.attendance);
        // setHolidays(res.data.holidays);

        // Mock data for demo:
        setAttendanceData({
          '2024-06-05': true,
          '2024-06-06': false,
          '2024-06-10': true,
          '2024-06-15': true,
          '2024-06-20': false,
        });
        setHolidays(['2024-06-12', '2024-06-25']);
      } catch (error) {
        console.error('Failed to fetch calendar data', error);
      }
    };
    fetchData();
  }, []);

  // Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month (0=Sun, 1=Mon,...)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate array of dates with padding for first day
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // empty slots before first day
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(new Date(year, month, d));
  }

  // Navigation handlers
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={prevMonth} aria-label="Previous Month">&lt;</button>
        <h2 className="month-year">
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button className="nav-btn" onClick={nextMonth} aria-label="Next Month">&gt;</button>
      </div>

      <div className="weekdays-row">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="dates-grid">
        {calendarDays.map((date, idx) => {
          if (!date) {
            return <div key={idx} className="date-box empty"></div>;
          }
          const dateStr = formatDate(date);
          const isHoliday = holidays.includes(dateStr);
          const isPresent = attendanceData[dateStr] === true;
          const isAbsent = attendanceData[dateStr] === false;

          return (
            <div
              key={idx}
              className={`date-box ${
                isHoliday ? 'holiday' : isPresent ? 'present' : isAbsent ? 'absent' : ''
              }`}
              title={
                isHoliday
                  ? 'Holiday'
                  : isPresent
                  ? 'Present'
                  : isAbsent
                  ? 'Absent'
                  : 'No data'
              }
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      <div className="legend">
        <div><span className="legend-box present"></span> Present</div>
        <div><span className="legend-box absent"></span> Absent</div>
        <div><span className="legend-box holiday"></span> Holiday</div>
      </div>
    </div>
  );
};

export default CalendarPage;
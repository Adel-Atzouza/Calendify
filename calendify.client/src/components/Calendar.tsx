import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'; // Import the styles

interface CalendarEvent {
  date: Date;
  title: string;
}

interface Props {
  events?: CalendarEvent[];
}

const MyCalendar: React.FC<Props> = ({ events = [] }) => {
  const [value, setValue] = useState<Date | Date[]>(new Date());

  const handleDateChange = (date: Date | Date[]) => {
    setValue(date);
  };


  
  // Helper to render event labels inside calendar tiles
  const renderEventLabel = (date: Date) => {
    const event = events.find(
      (event) => event.date.toDateString() === date.toDateString()
    );
    return event ? <div className="event-label">{event.title}</div> : null;
  };
  

  return (
    <div className="calendarContainer">
      <Calendar 
      onChange={handleDateChange} 
      value={value}
      tileContent={({ date, view }) =>
        view === 'month' ? renderEventLabel(date) : null
      } />
    </div>
  );
};

export default MyCalendar;

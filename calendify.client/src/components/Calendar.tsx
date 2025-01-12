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

  const renderEventsForDate = (date: Date) => {
    return events
      .filter(event => event.date.toDateString() === date.toDateString())
      .map((event, index) => <li key={index}>{event.title}</li>);
  };

  return (
    <div className="calendarContainer">
      <Calendar onChange={handleDateChange} value={value} />
    </div>
  );
};

export default MyCalendar;

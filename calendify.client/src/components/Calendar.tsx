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

    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      // Replace "1" with the actual userId
      const url = 'https://localhost:5165/api/UserEvents/1';
  
      const fetchData = async () => {
        try {
          const response = await fetch(url);
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const result: Data = await response.json();
          setData(result);
        } catch (err) {
          setError('Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
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

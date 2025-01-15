import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MyCalendar from '../components/Calendar';
import { AttendanceComponent } from '../components/AttendanceComponent';

interface CalendarEvent {
  date: Date;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/Attendance');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();

        const fetchedEvents = data.map((event: any) => ({
          date: new Date(event.date),
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
        }));

        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (date: Date) => {
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(normalizedDate);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedDate(null);
  };

  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter(
        (event) => event.date.toDateString() !== newEvent.date.toDateString()
      );
      return [...updatedEvents, newEvent];
    });
    handleClosePopup();
  };

  const handleDeleteEvent = () => {
    if (selectedDate) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.date.toDateString() !== selectedDate.toDateString())
      );
    }
    handleClosePopup();
  };

  return (
    <div>
      <MyCalendar events={events} onDateClick={handleDateClick} />

      <AttendanceComponent
        open={openPopup}
        handleClose={handleClosePopup}
        handleAddEvent={handleAddEvent}
        handleDelete={handleDeleteEvent}
        selectedDate={selectedDate}
        events={events}
      />
    </div>
  );
};

export default Events;
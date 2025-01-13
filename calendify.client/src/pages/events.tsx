// import Typography from '@mui/material/Typography';
// import React from 'react';
// import MyCalendar from '../components/Calendar';

// const Home: React.FC = () => {
//   const events = [
//     { date: new Date('2025-01-12'), title: 'Meeting with Alex' },
//     { date: new Date('2025-01-15'), title: 'Project Deadline' },
//     { date: new Date('2025-01-20'), title: 'Birthday Party' }
//   ];

//   // EXAMPLE
//   // const sampleEvents = [
//   //   { date: new Date(), title: 'Meeting with Client' },
//   //   { date: new Date('2025-01-10'), title: 'Project Deadline' },
//   // ];

//   return (
//     <div>
//       <h1>Welcome to the Dashboard</h1>
//       <MyCalendar />
//     </div>
//   );
// };

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import MyCalendar from '../components/Calendar';
import { AttendanceComponent } from '../components/AttendanceComponent';

interface CalendarEvent {
  date: Date;
  title: string;
}

const Events: React.FC = () => {
  // Initialize events as an empty array
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const [openPopup, setOpenPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    // Normalize the date to midnight (local time)
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(normalizedDate); // Set the selected date
    setOpenPopup(true); // Open the popup
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedDate(null); // Reset the selected date
  };

  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    handleClosePopup(); // Close the popup after adding the event
  };

  return (
    <div>
      <Typography variant="h4">Events Dashboard</Typography>

      {/* Pass events and handleDateClick to MyCalendar */}
      <MyCalendar events={events} onDateClick={handleDateClick} />

      {/* Popup to add a new event */}
      <AttendanceComponent
        open={openPopup}
        handleClose={handleClosePopup}
        handleAddEvent={handleAddEvent}
        selectedDate={selectedDate} // Pass the selected date to the popup
      />
    </div>
  );
};

export default Events;

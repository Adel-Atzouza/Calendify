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

// import React, { useState } from 'react';
// import Typography from '@mui/material/Typography';
// import MyCalendar from '../components/Calendar';
// import { AttendanceComponent } from '../components/AttendanceComponent';

// interface CalendarEvent {
//   date: Date;
//   title: string;
// }

// const Events: React.FC = () => {
//   const [events, setEvents] = useState<CalendarEvent[]>([]);
//   const [openPopup, setOpenPopup] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const handleDateClick = (date: Date) => {
//     const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//     setSelectedDate(normalizedDate); // Stel de geselecteerde datum in
//     setOpenPopup(true); // Open de popup
//   };

//   const handleClosePopup = () => {
//     setOpenPopup(false);
//     setSelectedDate(null); // Reset de geselecteerde datum
//   };

//   const handleAddEvent = (newEvent: CalendarEvent) => {
//     setEvents((prevEvents) => [...prevEvents, newEvent]);
//     handleClosePopup(); // Sluit de popup na toevoegen van het evenement
//   };

//   const handleDeleteEvent = () => {
//     if (selectedDate) {
//       setEvents((prevEvents) =>
//         prevEvents.filter((event) => event.date.toDateString() !== selectedDate.toDateString())
//       );
//     }
//     handleClosePopup(); // Sluit de popup na verwijderen van het evenement
//   };

//   return (
//     <div>
//       <Typography variant="h4">Events Dashboard</Typography>

//       {/* Geef events en handleDateClick door aan MyCalendar */}
//       <MyCalendar events={events} onDateClick={handleDateClick} />

//       {/* Popup om een nieuw evenement toe te voegen of te verwijderen */}
//       <AttendanceComponent
//         open={openPopup}
//         handleClose={handleClosePopup}
//         handleAddEvent={handleAddEvent}
//         handleDelete={handleDeleteEvent} // Verwijder functionaliteit
//         selectedDate={selectedDate} // Geef de geselecteerde datum door aan de popup
//       />
//     </div>
//   );
// };

// export default Events;

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MyCalendar from '../components/Calendar';
import { AttendanceComponent } from '../components/AttendanceComponent';

interface CalendarEvent {
  date: Date;
  title: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]); // State voor de evenementen
  const [openPopup, setOpenPopup] = useState(false); // State voor het openen van de popup
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Geselecteerde datum

  // Gebruik useEffect om evenementen op te halen bij het laden van de pagina
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/Attendance'); // Het nieuwe backend-endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();

        // Map de opgehaalde data naar het juiste formaat voor de kalender
        const fetchedEvents = data.map((event: any) => ({
          date: new Date(event.date), // Converteer de datum naar een JavaScript Date-object
          title: event.title,
        }));

        setEvents(fetchedEvents); // Sla de opgehaalde evenementen op in de state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // Lege dependency array zorgt ervoor dat de functie alleen bij het laden wordt uitgevoerd

  const handleDateClick = (date: Date) => {
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(normalizedDate); // Stel de geselecteerde datum in
    setOpenPopup(true); // Open de popup
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedDate(null); // Reset de geselecteerde datum
  };

  const handleAddEvent = (newEvent: CalendarEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // Voeg het nieuwe evenement toe aan de state
    handleClosePopup(); // Sluit de popup na toevoegen van het evenement
  };

  const handleDeleteEvent = () => {
    if (selectedDate) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.date.toDateString() !== selectedDate.toDateString())
      );
    }
    handleClosePopup(); // Sluit de popup na verwijderen van het evenement
  };

  return (
    <div>
      <Typography variant="h4">Events Dashboard</Typography>

      {/* Geef de evenementen en de datum klikhandler door aan MyCalendar */}
      <MyCalendar events={events} onDateClick={handleDateClick} />

      {/* Popup om een nieuw evenement toe te voegen */}
      <AttendanceComponent
        open={openPopup}
        handleClose={handleClosePopup}
        handleAddEvent={handleAddEvent}
        handleDelete={handleDeleteEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Events;

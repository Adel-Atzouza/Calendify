import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import MyCalendar from "../components/Calendar";
import { AttendanceComponent } from "../components/AttendanceComponent";

interface CalendarEvent {
  id: number; // Zorg ervoor dat ID aanwezig is
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
        const response = await fetch("/Attendance");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        const fetchedEvents = data.map((event: any) => ({
          id: event.id, // Voeg het ID toe
          date: new Date(event.date),
          title: event.title,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime,
        }));

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
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

  const handleDeleteEvent = async () => {
    if (selectedDate) {
      const eventToDelete = events.find(
        (event) => event.date.toDateString() === selectedDate.toDateString()
      );

      if (eventToDelete) {
        try {
          // Verwijder het evenement via de backend
          const response = await fetch(`/Attendance/${eventToDelete.id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete event");
          }

          // Verwijder het evenement uit de frontend-state
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventToDelete.id)
          );

          console.log(`Event with ID ${eventToDelete.id} deleted.`);
          handleClosePopup(); // Sluit de popup
        } catch (error) {
          console.error("Error deleting event:", error);
          alert("Failed to delete the event.");
        }
      } else {
        alert("No event found to delete.");
      }
    }
  };

  return (
    <div>
      <Typography variant="h4">Events Dashboard</Typography>

      {/* Kalendercomponent met evenementen */}
      <MyCalendar events={events} onDateClick={handleDateClick} />

      {/* AttendanceComponent voor toevoegen/bewerken/verwijderen van evenementen */}
      <AttendanceComponent
        open={openPopup}
        handleClose={handleClosePopup}
        handleAddEvent={handleAddEvent}
        handleDelete={handleDeleteEvent} // Verwijst naar de nieuwe delete-functionaliteit
        selectedDate={selectedDate}
        events={events}
      />
    </div>
  );
};

export default Events;

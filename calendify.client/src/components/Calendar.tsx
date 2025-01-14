import React from "react";
import Calendar from "react-calendar";
import "./Calendar.css"; // Import the styles


interface CalendarEvent {
  date: Date;
  title: string;
}

interface Props {
  events: CalendarEvent[];
  onDateClick: (date: Date) => void; // Prop for handling date click
}

const MyCalendar: React.FC<Props> = ({ events, onDateClick }) => {
  const [value, setValue] = React.useState<Date | Date[]>(new Date());


  const handleDateChange = (date: Date | Date[]) => {
    setValue(date);
    if (date instanceof Date) {
      onDateClick(date); // Call the handler when a date is clicked
    }
  };

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
          view === "month" ? renderEventLabel(date) : null
        }
      />
    </div>
  );
};

export default MyCalendar;

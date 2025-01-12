import type { eventProps, EventModel } from "./Event.state";

import "../EventCard.css";
import React, { useState } from 'react';


export function EventListWithDetails({ events }: { events: EventModel[] }) {
  return (
    <div>
      <ul>
        {events.map((ev, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            <h3>{ev.title}</h3>
            <p>
              <strong>Description:</strong> {ev.description}
            </p>
            <p>
              <strong>Date:</strong> {ev.date}
            </p>
            <p>
              <strong>Time:</strong> {ev.startTime} - {ev.endTime}
            </p>
            <p>
              <strong>Location:</strong> {ev.location}
            </p>
            <p>
              <strong>Max Attendees:</strong> {ev.maxAttendees}
            </p>
            <p>
              <strong>Category:</strong> {ev.category}
            </p>
            <p>
              <strong>Admin Approval:</strong> {ev.adminApproval ? "Yes" : "No"}
            </p>
            <p>
              <strong>Attendances:</strong>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export const EventList = ({ Events }: { Events: EventModel [] }) => {
  return (
    <div>
      <ul>
        {Events.map((ev, index) => {
          return <EventCard key={index} id={index} event={ev} />;
        })}
      </ul>
    </div>
  );
};
const handleClickEventCard = () => {
  alert("You clicked an event");
};

const EventCard : React.FC<eventProps> = ({ id , event }) => {
  const [eventIsOpen, setEventIsOpen] = useState<boolean>(false);

  const openEvent = () => setEventIsOpen(true)
  const closeEvent = () => setEventIsOpen(false)

  return (<li onClick={handleClickEventCard} className="EventCard" key={id}>
    <strong>{event.title}</strong> {event.category} {event.date}
  </li>)


}
  
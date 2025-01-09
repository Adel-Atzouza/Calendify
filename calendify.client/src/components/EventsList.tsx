import { event, eventWithoutDeatails } from "./Event.state";
import '../EventCard.css'

export function EventListWithDetails({ events }: { events: event[] }) {
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
export const EventList = ({ Events }: { Events: event[] }) => {
  return (
    <div>
      <ul>
        {Events.map((ev, index) => {
          const eventWithoutDetails: eventWithoutDeatails = {
            title: ev.title,
            category: ev.category,
            date: ev.date,
          };

          return <EventCard key={index} id={index} ev={eventWithoutDetails} />;
        })}
      </ul>
    </div>
  );
};
const EventCard = ({ id, ev }: { id: number; ev: eventWithoutDeatails }) => (
  <li className="EventCard" key={id}>
    <strong>{ev.title}</strong> {ev.category} {ev.date}
  </li>
);

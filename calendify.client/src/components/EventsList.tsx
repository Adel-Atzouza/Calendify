import type { EventModel } from "./Event.state";
import "../EventCard.css";
import { List } from "@mui/material";
import { EventCard } from "./EventCard";

export const EventList = ({ Events }: { Events: EventModel[] }) => {
  return (
    <div>
      <List>
        {Events.map((ev) => {
          return <EventCard key={ev.id} Event={ev} />;
        })}
      </List>
    </div>
  );
};

// ✅ EventCard component

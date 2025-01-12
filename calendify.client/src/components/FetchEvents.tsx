import { useEffect, useState } from "react";
import { EventModel } from "./Event.state";
import { EventList } from "./EventsList";

const BASE_URL = "/Events/Events";

export function GetAllEvents() {
  const [Events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(BASE_URL);
        const text = await response.text();
        const result = text ? JSON.parse(text) : [];
        setEvents(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <EventList Events={Events} />
    </div>
  );
}

import Typography from "@mui/material/Typography";
import { EventList, EventListWithDetails } from "../components/EventsList";
import { events } from "../components/Event.state";

export default function DashboardPage() {
  return (
    <Typography>
      Welcome to Toolpad!
      <div>
        <EventList Events={events} />
      </div>
    </Typography>
  );
}

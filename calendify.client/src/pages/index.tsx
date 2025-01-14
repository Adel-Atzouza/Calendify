import Typography from "@mui/material/Typography";
import { GetAllEvents } from "../components/FetchEvents";
import { AddEventButton } from "../components/AddEventButton";

export default function DashboardPage() {
  return (
    <Typography>
      <AddEventButton />
      <div>
        <GetAllEvents />
      </div>
    </Typography>
  );
}

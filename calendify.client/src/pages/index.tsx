import Typography from "@mui/material/Typography";
import { GetAllEvents } from "../components/FetchEvents";

export default function DashboardPage() {
  return (
    <Typography>
      Welcome to Toolpad!
      <div>
        <GetAllEvents />
      </div>
    </Typography>
  );
}

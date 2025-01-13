import Typography from "@mui/material/Typography";
import { GetAllEvents } from "../components/FetchEvents";
import Loading from "../components/Loading";

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

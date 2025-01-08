import Typography from "@mui/material/Typography";
import { ShowPostEvent } from "../components/EventsList";

export default function DashboardPage() {
  return (
    <Typography>
      Welcome to Toolpad!
      <ShowPostEvent />
    </Typography>
  );
}

import Typography from "@mui/material/Typography";
import { GetAllEvents } from "../components/FetchEvents";
import { AddEventButton } from "../components/AddEventButton";
import { useSession } from "../SessionContext";

export default function DashboardPage() {
  const { session } = useSession();
  return (
    <Typography>
      {session?.user?.roles?.includes("Admin") && <AddEventButton />}
      <div>
        <GetAllEvents />
      </div>
    </Typography>
  );
}

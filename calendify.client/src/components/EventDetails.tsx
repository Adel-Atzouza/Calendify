import {
  CircularProgress,
  Typography,
  Button,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { ApproveEvent } from "./ApproveEvent";
import { EventDetailsProps } from "./Event.state";
import { useSession } from "../SessionContext";

const EventDetails = ({ id, event, closeEvent }: EventDetailsProps) => {
  const [message, setMessage] = useState<string>("");
  const { session } = useSession();
  const date = new Date(event.date);

  async function handlApproveEvent() {
    setMessage("Processing approval...");
    try {
      await ApproveEvent(id);
      setMessage("Event has been approved!");
    } catch {
      setMessage("Failed to approve event. Please try again.");
    }
  }

  return (
    <div key={id} className="EventDetails">
      <Typography variant="h4" sx={{ color: "black" }}>
        {event.title}
      </Typography>
      <Typography>Description: {event.description}</Typography>
      <Typography>
        Date: {date.getDay()}-{date.getMonth()}-{date.getFullYear()}
      </Typography>
      <Typography>Start time: {event.startTime}</Typography>
      <Typography>End time: {event.endTime}</Typography>
      <Typography>Max attendees: {event.maxAttendees}</Typography>
      <Typography>Category: {event.category}</Typography>
      <Typography>
        Approved:{" "}
        {event.adminApproval ? (
          <Typography>Yes</Typography>
        ) : (
          <Typography>No</Typography>
        )}
      </Typography>

      <Typography>Attendances:</Typography>
      <List>
        {event.attendances?.map((attendance, index) => (
          <ListItem key={index}>
            <ListItemText>
              {attendance.user.firstName} {attendance.user.lastName}
            </ListItemText>
          </ListItem>
        ))}
      </List>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={closeEvent}
          className="EventDetailButton"
          sx={{ border: "1px solid", justifyContent: "center" }}
        >
          Show less
        </Button>
        <Button sx={{ border: "1px solid", justifyContent: "center" }}>
          Attend Event
        </Button>
        {session?.user?.roles?.includes("Admin") && (
          <Button
            onClick={handlApproveEvent}
            sx={{ border: "1px solid", justifyContent: "center" }}
          >
            Approve Event
          </Button>
        )}
      </CardActions>

      {message && <Typography>{message}</Typography>}
    </div>
  );
};

export default EventDetails;

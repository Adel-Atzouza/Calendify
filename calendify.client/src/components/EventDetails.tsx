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
import EventAttendanceForm from "./EventattendanceForm"; // Voeg deze import toe

const EventDetails = ({ id, event, closeEvent }: EventDetailsProps) => {
  const [message, setMessage] = useState<string>("");
  const { session } = useSession();
  const date = new Date(event.date);

  async function handleApproveEvent() {
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
        Date: {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
      </Typography>
      <Typography>Start time: {event.startTime}</Typography>
      <Typography>End time: {event.endTime}</Typography>
      <Typography>Max attendees: {event.maxAttendees}</Typography>
      <Typography>Category: {event.category}</Typography>
      <Typography>
        Approved: {event.adminApproval ? "Yes" : "No"}
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

      {/* EventAttendanceForm voor het bijwonen/annuleren van deelname */}
      <EventAttendanceForm eventId={id} />

      <CardActions sx={{ justifyContent: "center", marginTop: "16px" }}>
        <Button
          onClick={closeEvent}
          className="EventDetailButton"
          sx={{ border: "1px solid", justifyContent: "center" }}
        >
          Show less
        </Button>
        {session?.user?.roles?.includes("Admin") && (
          <Button
            onClick={handleApproveEvent}
            sx={{ border: "1px solid", justifyContent: "center" }}
          >
            Approve Event
          </Button>
        )}
      </CardActions>

      {message && (
        <Typography
          sx={{
            fontSize: "12px",
            marginTop: "8px",
            color: "red",
            textAlign: "center",
          }}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};

export default EventDetails;

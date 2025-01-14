import {
  Typography,
  Button,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { ApproveEvent } from "./ApproveEvent";
import { EventDetailsProps } from "./Event.state";
import { useSession } from "../SessionContext";
import EventAttendanceForm from "./EventattendanceForm";
import EventReviewForm from "./EventReviewForm";
import { requestDeleteEvent } from "./DeleteEvent";

const EventDetails = ({ id, event, closeEvent }: EventDetailsProps) => {
  const [message, setMessage] = useState<string>("");
  const [attendances, setAttendances] = useState<
    { userId: string; firstName: string; lastName: string }[]
  >([]);
  const [averageRating, setAverageRating] = useState<number>(0); // ✅ Nieuw: gemiddelde beoordeling
  const { session } = useSession();
  const date = new Date(event.date);

  async function handleDeleteEvent() {
    await requestDeleteEvent(id);
  }

  // ✅ Haal de lijst met attendees op
  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await fetch(`/EventAttendance/${id}/Attendees`);
        if (response.ok) {
          const data = await response.json();
          setAttendances(data);
        } else {
          setMessage("Failed to fetch attendees.");
        }
      } catch (error) {
        setMessage("An error occurred: " + (error as Error).message);
      }
    };

    fetchAttendances();
  }, [id]);

  // ✅ Haal de gemiddelde beoordeling op
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(`/EventAttendance/${id}/AverageRating`);
        if (response.ok) {
          const data = await response.json();
          setAverageRating(data);
        }
      } catch (error) {
        console.error("Failed to fetch average rating:", error);
      }
    };

    fetchAverageRating();
  }, [id]);

  // ✅ Handle approve event
  async function handleApproveEvent() {
    if (Date.parse(event.date) < Date.now()) {
      setMessage("This event has already started");
      return;
    }
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
      <Typography>Approved: {event.adminApproval ? "Yes" : "No"}</Typography>
      <Typography>
        Average Rating:{" "}
        {averageRating > 0 ? averageRating.toFixed(1) : "No ratings yet"} / 5
      </Typography>

      <Typography>Attendances:</Typography>
      <List>
        {attendances.map((attendance, index) => (
          <ListItem key={index}>
            <ListItemText>
              {attendance.firstName} {attendance.lastName}
            </ListItemText>
          </ListItem>
        ))}
      </List>

      {/* ✅ EventReviewForm voor het plaatsen van beoordelingen */}
      <EventReviewForm eventId={id} />

      {/* EventAttendanceForm voor het bijwonen/annuleren van deelname */}
      <EventAttendanceForm eventId={id} eventAttendances={attendances} />

      <CardActions sx={{ justifyContent: "center", marginTop: "16px" }}>
        <Button
          onClick={closeEvent}
          className="EventDetailButton"
          sx={{ border: "1px solid", justifyContent: "center" }}
        >
          Show less
        </Button>
        {session?.user?.roles?.includes("Admin") && (
          <>
            <Button
              onClick={handleApproveEvent}
              sx={{ border: "1px solid", justifyContent: "center" }}
            >
              Approve Event
            </Button>
            <DeleteIcon onClick={handleDeleteEvent} />
          </>
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

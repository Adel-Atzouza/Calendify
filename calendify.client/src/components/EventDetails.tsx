import {
  Typography,
  Button,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ApproveEvent } from "./ApproveEvent";
import { EventDetailsProps } from "./Event.state";
import { useSession } from "../SessionContext";
import EventAttendanceForm from "./EventattendanceForm";
import EventReviewForm from "./EventReviewForm";
import { requestDeleteEvent } from "./DeleteEvent";

// Interface voor de reviews
interface ReviewDto {
  userId: string;
  firstName: string;
  lastName: string;
  feedback: string | null;
}

const EventDetails = ({ id, event, closeEvent }: EventDetailsProps) => {
  const [message, setMessage] = useState<string>("");
  const [attendances, setAttendances] = useState<
    { userId: string; firstName: string; lastName: string }[]
  >([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0); // Verwijderen als je geen average rating meer wilt
  const { session } = useSession();

  const eventEndTime = new Date(event.date);
  const [endHour, endMinute] = event.endTime.split(":");
  eventEndTime.setHours(parseInt(endHour, 10));
  eventEndTime.setMinutes(parseInt(endMinute, 10));
  const isEventOver = eventEndTime < new Date();

  async function handleDeleteEvent() {
    await requestDeleteEvent(id);
  }
  
  // Attendances ophalen
  const fetchAttendances = useCallback(async () => {
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
  }, [id]);


  // Reviews ophalen
  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(`/Events/Reviews/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Reviews from server:", data);
        setReviews(data);
      } else {
        setMessage("No reviews.");
      }
    } catch (error) {
      setMessage("An error occurred: " + (error as Error).message);
    }
  }, [id]);

  // rating ophalen
  const fetchAverageRating = useCallback(async () => {
    try {
      const response = await fetch(`/Events/Rating/${id}`);
      if (response.ok) {
        const data = await response.json();
        setAverageRating(data);
      }
    } catch (error) {
      console.error("Failed to fetch average rating:", error);
    }
  }, [id]);

  // Bij mounten alles ophalen
  useEffect(() => {
    fetchAttendances();
    fetchReviews();
    fetchAverageRating();
  }, [fetchAttendances, fetchReviews, fetchAverageRating]);

  // Callback als review is geüpload
  const handleReviewSubmitted = () => {
    fetchReviews();
    fetchAverageRating();
  };

  // Admin: Approve event
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

  // Datum leesbaar maken
  const date = new Date(event.date);

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

      {}
      <Typography>
        Average Rating: {averageRating > 0 ? averageRating.toFixed(1) : "No ratings"} / 5
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

      {/* Reviews tonen */}
      {reviews.length > 0 && (
        <>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Reviews
          </Typography>
          <List>
            {reviews.map((review, i) => (
              <ListItem key={i} alignItems="flex-start">
                <ListItemText
                  primary={review.feedback || "No feedback"}

                />
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Alleen ReviewForm tonen als event voorbij is */}
      {isEventOver && (
        <EventReviewForm eventId={id} onReviewSubmitted={handleReviewSubmitted} />
      )}

      {/* Attend/Cancel Form */}
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
            <IconButton onClick={handleDeleteEvent}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>

      {/* Eventuele fout-/succesberichten */}
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

import type { EventModel, eventDetailsProps } from "./Event.state";
import "../EventCard.css";
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Button,
} from "@mui/material";
import { useSession } from "../SessionContext"; // Gebruik de sessie om ingelogde gebruiker op te halen

export const EventList = ({ Events }: { Events: EventModel[] }) => {
  console.log(Events);
  return (
    <div>
      <List>
        {Events.map((ev) => {
          return <EventCard key={ev.id} Event={ev} />;
        })}
      </List>
    </div>
  );
};

// ✅ EventCard component
const EventCard = ({ Event }: { Event: EventModel }) => {
  const [eventIsOpen, setEventIsOpen] = useState<boolean>(false);

  const handleClickEventCard = () => {
    openEvent();
  };

  const date = Event.date.split("-");
  const openEvent = () => setEventIsOpen(true);
  const closeEvent = () => setEventIsOpen(false);

  if (!eventIsOpen) {
    return (
      <Card className="EventCard" key={Event.id}>
        <CardContent>
          <Typography variant={"h5"}>{Event.title}</Typography>
          <Typography>Category: {Event.category}</Typography>
          <Typography>
            Date: {date[2]}-{date[1]}-{date[0]}
          </Typography>
          <br />
          <CardActions
            onClick={handleClickEventCard}
            sx={{
              justifyContent: "center",
              border: "1px solid",
            }}
          >
            <Button>Show details</Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
  return <EventDetails id={Event.id} event={Event} closeEvent={closeEvent} />;
};

// ✅ EventDetails component
const EventDetails = ({ id, event, closeEvent }: eventDetailsProps) => {
  const { session } = useSession();
  const [message, setMessage] = useState<string>("");

  // Functie om een event bij te wonen
  // const handleSubmitAttendance = async () => {
  //   console.log("Session data:", session);
  //   if (!session?.user) {
  //     setMessage("You need to be logged in to attend this event.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/EventAttendance/Attend", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: session.user.id,
  //         eventId: event.id,
  //       }),
  //     });

  //     if (response.ok) {
  //       setMessage("Successfully attended the event!");
  //     } else {
  //       setMessage("Failed to attend the event.");
  //     }
  //   } catch (error) {
  //     setMessage("An error occurred: " + (error as Error).message);
  //   }
  // };

  return (
    <div key={id} className="EventDetails">
      <Typography variant="h4" sx={{ color: "black" }}>
        {event.title}
      </Typography>
      <Typography>Description: {event.description}</Typography>
      <Typography>Date: {event.date.split("-").reverse().join("-")}</Typography>
      <Typography>Start time: {event.startTime}</Typography>
      <Typography>End time: {event.endTime}</Typography>
      <Typography>Max attendees: {event.maxAttendees}</Typography>
      <Typography>Category: {event.category}</Typography>

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
      </CardActions>

      {message && <Typography>{message}</Typography>}
    </div>
  );
};

export default EventDetails;

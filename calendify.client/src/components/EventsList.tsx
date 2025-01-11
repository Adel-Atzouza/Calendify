import type { eventProps, EventModel } from "./Event.state";
import "../EventCard.css";
import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";

export const EventList = ({ Events }: { Events: EventModel[] }) => {
  return (
    <div>
      <List>
        {Events.map((ev, index) => {
          return <EventCard key={index} id={index} event={ev} />;
        })}
      </List>
    </div>
  );
};

const EventCard = ({ id, event }: eventProps) => {
  const [eventIsOpen, setEventIsOpen] = useState<boolean>(false);
  const handleClickEventCard = () => {
    openEvent();
  };

  const date = event.date.split("-");
  const openEvent = () => setEventIsOpen(true);
  const closeEvent = () => setEventIsOpen(false);
  if (!eventIsOpen) {
    return (
      <Card className="EventCard" key={id}>
        <CardContent>
          <Typography variant={"h5"}>{event.title}</Typography>
          <Typography>Caregory: {event.category}</Typography>
          {}
          <Typography>
            Date: {date[2]}-{date[1]}-{date[0]}
          </Typography>
          <br></br>
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
  return <EventDetails id={id} event={event} />;
};

const EventDetails = ({ id, event }: eventProps) => {
  // const [Submitted, setIsSubmitted] = useState(false);
  const date = event.date.split("-");
  return (
    <div key={id} className="EventDetails">
      <Typography>{event.title}</Typography>
      <Typography>Description: {event.description}</Typography>
      <Typography>
        Date: {date[2]}-{date[1]}-{date[0]}
      </Typography>
      <Typography>Start time: {event.startTime}</Typography>
      <Typography>End time: {event.endTime}</Typography>
      <Typography>Max attendees: {event.maxAttendees}</Typography>
      <Typography>Category: {event.category}</Typography>
      <Typography>
        Attendances:
        {event.attendances.map((attendance, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText>
              {attendance.user.firstName} {attendance.user.lastName}
            </ListItemText>
          </ListItem>
        ))}
      </Typography>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          className="EventDetailButton"
          sx={{ border: "1px solid", color: "dark", justifyContent: "center" }}
        >
          Show less
        </Button>
        <Button
          sx={{ border: "1px solid", color: "dark", justifyContent: "center" }}
        >
          Submit
        </Button>
      </CardActions>
    </div>
  );
};

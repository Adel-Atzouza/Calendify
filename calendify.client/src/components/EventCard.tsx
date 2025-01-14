import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { EventModel } from "./Event.state";
import EventDetails from "./EventDetails";
import { useState } from "react";

export const EventCard = ({ Event }: { Event: EventModel }) => {
  const [eventIsOpen, setEventIsOpen] = useState<boolean>(false);

  const handleClickEventCard = () => {
    openEvent();
  };

  const date = new Date(Event.date).toDateString();
  const openEvent = () => setEventIsOpen(true);
  const closeEvent = () => setEventIsOpen(false);

  if (!eventIsOpen) {
    return (
      <Card className="EventCard" key={Event.id}>
        <CardContent>
          <Typography variant={"h5"}>{Event.title}</Typography>
          <Typography>Category: {Event.category}</Typography>
          <Typography>Date: {date}</Typography>
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

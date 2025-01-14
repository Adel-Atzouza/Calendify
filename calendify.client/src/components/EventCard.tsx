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
      <Card sx={{ marginY: 3 }} key={Event.id}>
        <CardContent>
          <Typography variant={"h5"}>{Event.title}</Typography>
          <Typography>Category: {Event.category}</Typography>
          <Typography>Date: {date}</Typography>
          <br />
          <CardActions
            onClick={handleClickEventCard}
            sx={{
              justifyContent: "center",
              border: "2px solid #FFFFFF", // Thicker border for visibility
              borderRadius: "8px", // Rounded corners
              padding: "10px", // Add some padding for spacing
              backgroundColor: "#2A3E59", // Dark blue background
              transition: "all 0.3s ease", // Smooth hover animation
              "&:hover": {
                backgroundColor: "#3A6EA5", // Lighter blue on hover
                transform: "scale(1.05)", // Slightly increase size on hover
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Add shadow on hover
              },
            }}
          >
            <Button
              sx={{
                color: "#FFFFFF", // White text
                fontWeight: "bold", // Emphasized text
                fontSize: "16px", // Slightly larger font
                textTransform: "uppercase", // Make text uppercase
                padding: "10px 20px", // Add padding to the button
              }}
            >
              Show details
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
  return <EventDetails id={Event.id} event={Event} closeEvent={closeEvent} />;
};

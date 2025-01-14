import { TextField, Box } from "@mui/material";
import { postEventProps } from "./PostEvent";

export default function AddEvent(props: postEventProps): JSX.Element {
  return (
    <Box className="AddEvent">
      <TextField
        className="input"
        label="Title"
        defaultValue={props.title}
        fullWidth
      />
      <TextField
        className="input"
        label="Description"
        defaultValue={props.description}
        fullWidth
      />
      <TextField
        className="input"
        label="Date"
        defaultValue={props.date}
        fullWidth
      />
      <TextField
        className="input"
        label="Start Time"
        defaultValue={props.startTime}
        fullWidth
      />
      <TextField
        className="input"
        label="End Time"
        defaultValue={props.endTime}
        fullWidth
      />
      <TextField
        className="input"
        label="Location"
        defaultValue={props.location}
        fullWidth
      />
      <TextField
        className="input"
        label="Max Attendees"
        defaultValue={props.maxAttendees}
        type="number"
        fullWidth
      />
      <TextField
        className="input"
        label="Category"
        defaultValue={props.category}
        fullWidth
      />
    </Box>
  );
}

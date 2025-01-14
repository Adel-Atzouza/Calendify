import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { postEventProps } from "./PostEvent";

export default function AddEvent(props: postEventProps): JSX.Element {
  const [currentState, setState] = useState<postEventProps>({
    title: props.title,
    description: props.description,
    date: props.date,
    startTime: props.startTime,
    endTime: props.endTime,
    location: props.location,
    maxAttendees: props.maxAttendees,
    category: props.category,
    adminApproval: props.adminApproval,
  });

  const handleChange =
    (key: keyof postEventProps) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...currentState,
        [key]: event.target.value,
      });
    };

  const handleSubmit = () => {
    console.log("Submitted Data:", currentState);
  };

  return (
    <Box className="AddEvent">
      <TextField
        className="input"
        label="Title"
        value={currentState.title}
        onChange={handleChange("title")}
        fullWidth
      />
      <TextField
        className="input"
        label="Description"
        value={currentState.description}
        onChange={handleChange("description")}
        fullWidth
      />
      <TextField
        className="input"
        type="date"
        value={currentState.date}
        onChange={handleChange("date")}
        fullWidth
      />
      <TextField
        className="input"
        type="time"
        value={currentState.startTime}
        onChange={handleChange("startTime")}
        fullWidth
      />
      <TextField
        className="input"
        type="time"
        value={currentState.endTime}
        onChange={handleChange("endTime")}
        fullWidth
      />
      <TextField
        className="input"
        label="Location"
        value={currentState.location}
        onChange={handleChange("location")}
        fullWidth
      />
      <TextField
        className="input"
        label="Max Attendees"
        value={currentState.maxAttendees}
        type="number"
        onChange={handleChange("maxAttendees")}
        fullWidth
      />
      <TextField
        className="input"
        label="Category"
        value={currentState.category}
        onChange={handleChange("category")}
        fullWidth
      />
      <Button sx={{ justifyContent: "center" }} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}

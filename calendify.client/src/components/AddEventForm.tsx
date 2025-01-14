import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { postEventProps } from "./PostEvent";

export default function AddEventwFrom(): JSX.Element {
  const [currentState, setState] = useState<postEventProps>({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    maxAttendees: 0,
    category: "",
    adminApproval: false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: id === "maxAttendees" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await fetch("/Events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      });

      if (response.status == 201) {
        alert("Event added successfully!");
        setState({
          title: "",
          description: "",
          date: "",
          startTime: "",
          endTime: "",
          location: "",
          maxAttendees: 0,
          category: "",
          adminApproval: false,
        });
      } else if (response.status === 400) {
        const errorData = await response.json();
        setError(errorData.message || "Invalid input. Please check your data.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <Box className="AddEvent">
      <TextField
        id="title"
        className="input"
        label="Title"
        value={currentState.title}
        onChange={(e) => handleChange(e)}
        fullWidth
      />
      <TextField
        id="description"
        className="input"
        label="Description"
        value={currentState.description}
        onChange={(e) => handleChange(e)}
        fullWidth
      />
      <TextField
        id="date"
        className="input"
        type="date"
        value={currentState.date}
        onChange={(e) => handleChange(e)}
        fullWidth
      />
      <TextField
        id="startTime"
        className="input"
        type="time"
        value={currentState.startTime}
        onChange={(e) => handleChange(e)}
        fullWidth
      />
      <TextField
        id="endTime"
        className="input"
        type="time"
        value={currentState.endTime}
        onChange={(e) => handleChange(e)}
        fullWidth
      />
      <TextField
        id="location"
        className="input"
        label="Location"
        value={currentState.location}
        onChange={(e) => handleChange(e)}
        fullWidth
      />
      <TextField
        id="maxAttendees"
        className="input"
        label="Max Attendees"
        value={currentState.maxAttendees}
        type="number"
        onChange={(e) => handleChange(e)}
        fullWidth
      />
      <TextField
        id="category"
        className="input"
        label="Category"
        value={currentState.category}
        onChange={(e) => handleChange(e)}
        fullWidth
      />
      <Button sx={{ justifyContent: "center" }} onClick={handleSubmit}>
        Add
      </Button>
    </Box>
  );
}

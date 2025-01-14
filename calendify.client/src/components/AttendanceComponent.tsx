import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

interface CalendarEvent {
    date: Date;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
}

interface AttendanceComponentProps {
    open: boolean;
    handleClose: () => void;
    handleAddEvent: (event: CalendarEvent) => void;
    handleDelete?: () => void; // Optional delete function
    selectedDate: Date | null;
    events: CalendarEvent[]; // Array of existing events
}

export const AttendanceComponent: React.FC<AttendanceComponentProps> = ({
    open,
    handleClose,
    handleAddEvent,
    handleDelete,
    selectedDate,
    events,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        if (selectedDate) {
            const normalizedDate = new Date(selectedDate);
            normalizedDate.setHours(0, 0, 0, 0);
            setDate(normalizedDate.toLocaleDateString("en-CA"));

            // Check if an event exists for the selected date
            const existingEvent = events.find(
                (event) => event.date.toDateString() === normalizedDate.toDateString()
            );

            if (existingEvent) {
                // Populate the form with existing event data
                setTitle(existingEvent.title);
                setDescription(existingEvent.description);
                setStartTime(existingEvent.startTime);
                setEndTime(existingEvent.endTime);
            } else {
                // Clear the form if no event exists
                setTitle("");
                setDescription("");
                setStartTime("");
                setEndTime("");
            }
        }
    }, [selectedDate, events]);

    const handleSubmit = async () => {
        if (endTime <= startTime) {
            alert("End time must be after start time.");
            return;
        }

        const newEvent = {
            userId: "",
            title: title,
            description: description,
            date: new Date(date),
            startTime: startTime,
            endTime: endTime,
        };

        try {
            const response = await fetch("/Attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent),
            });

            if (!response.ok) {
                throw new Error("Er is iets misgegaan bij het versturen van het verzoek.");
            }

            const data = await response.json();
            console.log("Attendance succesvol toegevoegd:", data);
            handleAddEvent(newEvent);
            handleClose();
        } catch (error) {
            console.error("Er is een fout opgetreden bij het toevoegen van attendance:", error);
            alert("Er is een fout opgetreden bij het versturen van het evenement.");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Add Event"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                    label="Start Time"
                    type="time"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <TextField
                    label="End Time"
                    type="time"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                {handleDelete && (
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                )}
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

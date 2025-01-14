// import React, { useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

// // Props voor de AttendanceComponent
// interface AttendanceComponentProps {
//     open: boolean;
//     handleClose: () => void;
// }

// export const AttendanceComponent: React.FC<AttendanceComponentProps> = ({ open, handleClose }) => {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");

//     const handleSubmit = () => {
//         if (endTime <= startTime) {
//             alert("End time must be after start time.");
//             return;
//         }
//         console.log("Title:", title);
//         console.log("Description:", description);
//         console.log("Start Time:", startTime);
//         console.log("End Time:", endTime);
//         handleClose(); // Close the popup after submission
//     };

//     return (
//         <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Details</DialogTitle>
//             <DialogContent>
//                 <TextField
//                     label="Title"
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <TextField
//                     label="Description"
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                     multiline
//                     rows={4}
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                 />
//                 <TextField
//                     label="Start Time"
//                     type="time"
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                     InputLabelProps={{ shrink: true }}
//                     value={startTime}
//                     onChange={(e) => setStartTime(e.target.value)}
//                 />
//                 <TextField
//                     label="End Time"
//                     type="time"
//                     fullWidth
//                     variant="outlined"
//                     margin="normal"
//                     InputLabelProps={{ shrink: true }}
//                     value={endTime}
//                     onChange={(e) => setEndTime(e.target.value)}
//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose} color="primary">
//                     Cancel
//                 </Button>
//                 <Button onClick={handleSubmit} color="primary">
//                     Submit
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };


import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

interface CalendarEvent {
    date: Date;
    title: string;
}

interface AttendanceComponentProps {
    open: boolean;
    handleClose: () => void;
    handleAddEvent: (event: CalendarEvent) => void; // New prop to handle adding events
    selectedDate: Date | null; // The date clicked on the calendar
}

export const AttendanceComponent: React.FC<AttendanceComponentProps> = ({ open, handleClose, handleAddEvent, selectedDate }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        if (selectedDate) {
            // Normaliseer de datum naar middernacht, maar houd rekening met de tijdzone
            const normalizedDate = new Date(selectedDate);
            normalizedDate.setHours(0, 0, 0, 0); // Zet het tijdstip naar middernacht in lokale tijd
            setDate(normalizedDate.toLocaleDateString("en-CA")); // Gebruik een lokaal geformatteerde datum (yyyy-mm-dd)
        }
    }, [selectedDate]);

    const handleSubmit = async () => {
        if (endTime <= startTime) {
            alert("End time must be after start time.");
            return;
        }

        const newEvent = {
            userId: "", // Je zou hier de juiste gebruiker moeten toevoegen (bijvoorbeeld via een context of via login)
            title: title,
            description: description,
            date: new Date(date), // Zet de string date om naar een Date object
            startTime: startTime,
            endTime: endTime,
        };


        try {
            const response = await fetch('/Attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            if (!response.ok) {
                throw new Error('Er is iets misgegaan bij het versturen van het verzoek.');
            }

            const data = await response.json();
            console.log("Attendance succesvol toegevoegd:", data);
            handleAddEvent(newEvent); // Voeg het event toe aan de kalender
            handleClose(); // Sluit het popup
        } catch (error) {
            console.error('Er is een fout opgetreden bij het toevoegen van attendance:', error);
            alert("Er is een fout opgetreden bij het versturen van het evenement.");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Event</DialogTitle>
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
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

// Props voor de AttendanceComponent
interface AttendanceComponentProps {
    open: boolean;
    handleClose: () => void;
}

export const AttendanceComponent: React.FC<AttendanceComponentProps> = ({ open, handleClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = () => {
        if (endTime <= startTime) {
            alert("End time must be after start time.");
            return;
        }
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Start Time:", startTime);
        console.log("End Time:", endTime);
        handleClose(); // Close the popup after submission
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Details</DialogTitle>
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
                    label="Description"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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

// import React, { useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

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

//         const newAttendance = {
//             userId: "some-user-id", // Replace this with actual user ID from session/context
//             title,
//             description,
//             startTime,
//             endTime,
//         };

//         fetch('/Attendance/add', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newAttendance),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     return response.json().then((data) => {
//                         throw new Error(data.message || 'Failed to add attendance');
//                     });
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log('Attendance created:', data);
//                 handleClose();
//             })
//             .catch((error) => {
//                 alert('Error: ' + error.message);
//             });
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


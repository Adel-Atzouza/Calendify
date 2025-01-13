// import Typography from '@mui/material/Typography';

// export default function AttendancePage() {
//     return <Typography>Selamunaleykum!</Typography>;
// }

// src/pages/AttendancePage.tsx

import React, { useState } from 'react';
import { AttendanceComponent } from '../components/AttendanceComponent'; // Correct import

const AttendancePage: React.FC = () => {
    const [openPopup, setOpenPopup] = useState(false);

    const handleOpenPopup = () => setOpenPopup(true);
    const handleClosePopup = () => setOpenPopup(false);

    return (
        <div className="container">
            <div className="form">
                <button onClick={handleOpenPopup}>Click for surprise</button>
            </div>

            {/* AttendanceComponent displayed when the popup is open */}
            <AttendanceComponent open={openPopup} handleClose={handleClosePopup} />
        </div>
    );
};

export default AttendancePage;

// import React, { useState, useEffect } from 'react';
// import { AttendanceComponent } from '../components/AttendanceComponent';

// interface Attendance {
//     id: number;
//     title: string;
//     description: string;
//     startTime: string;
//     endTime: string;
// }

// const AttendancePage: React.FC = () => {
//     const [openPopup, setOpenPopup] = useState(false);
//     const [attendances, setAttendances] = useState<Attendance[]>([]);

//     const handleOpenPopup = () => setOpenPopup(true);
//     const handleClosePopup = () => setOpenPopup(false);

//     const fetchAttendances = () => {
//         fetch('/Attendance')
//             .then((response) => response.json())
//             .then((data) => setAttendances(data))
//             .catch((error) => console.error('Error fetching attendances:', error));
//     };

//     const handleDelete = (id: number) => {
//         fetch(`/Attendance/${id}`, {
//             method: 'DELETE',
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     setAttendances(attendances.filter((attendance) => attendance.id !== id));
//                 } else {
//                     throw new Error('Failed to delete attendance');
//                 }
//             })
//             .catch((error) => console.error('Error deleting attendance:', error));
//     };

//     useEffect(() => {
//         fetchAttendances();
//     }, []);

//     return (
//         <div className="container">
//             <div className="form">
//                 <button onClick={handleOpenPopup}>Click for surprise</button>
//             </div>

//             {/* AttendanceComponent displayed when the popup is open */}
//             <AttendanceComponent open={openPopup} handleClose={handleClosePopup} />

//             <div className="attendance-list">
//                 <h2>Attendance List</h2>
//                 {attendances.map((attendance) => (
//                     <div key={attendance.id} className="attendance-item">
//                         <h3>{attendance.title}</h3>
//                         <p>{attendance.description}</p>
//                         <p>
//                             {attendance.startTime} - {attendance.endTime}
//                         </p>
//                         <button onClick={() => handleDelete(attendance.id)}>Delete</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AttendancePage;


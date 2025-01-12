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


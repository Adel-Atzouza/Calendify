import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useSession } from '../SessionContext';

interface EventAttendanceFormProps {
  eventId: number;
}

const EventAttendanceForm: React.FC<EventAttendanceFormProps> = ({ eventId }) => {
  const { session } = useSession();
  const [message, setMessage] = useState<string>('');
  const [attending, setAttending] = useState<boolean>(false);

  // Check if the user is already attending the event
  useEffect(() => {
    const checkAttendance = async () => {
    console.log("Session data:", session);

      if (!session?.user) return;

      try {
        const response = await fetch(`/api/EventAttendance/${session.user.id}/${eventId}`);
        if (response.ok) {
          setAttending(true);
        }
      } catch (error) {
        console.error('Error checking attendance:', error);
      }
    };

    checkAttendance();
  }, [eventId, session]);

  // Handle the event attendance
  const handleAttendEvent = async () => {
    console.log("Session data:", session);
    if (!session?.user) {
      setMessage('You need to be logged in to attend this event.');
      return;
    }

    try {
        const response = await fetch("/EventAttendance/Attend", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: session.user.id,
              eventId: eventId,
            }),
          });
          

      if (response.ok) {
        setMessage("Successfully attended the event!");
        setAttending(true);
      } else {
        // Wacht tot de JSON response binnen is
        const errorData = await response.json();
        setMessage(`Failed to attend the event: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      setMessage("An error occurred: " + (error as Error).message);
    }
  };

  // Handle cancel attendance
  const handleCancelAttendance = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/EventAttendance/${session.user.id}/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Successfully canceled the attendance.');
        setAttending(false);
      } else {
        setMessage('Failed to cancel attendance.');
      }
    } catch (error) {
      setMessage('An error occurred: ' + (error as Error).message);
    }
  };

  return (
    <div>
      {attending ? (
        <Button variant="outlined" color="secondary" onClick={handleCancelAttendance}>
          Cancel Attendance
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAttendEvent}>
          Attend Event
        </Button>
      )}
      {message && <Typography>{message}</Typography>}
    </div>
  );
};

export default EventAttendanceForm;

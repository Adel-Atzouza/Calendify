import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useSession } from "../SessionContext";

interface EventAttendanceFormProps {
  eventId: number;
  eventAttendances: { userId: string }[];
}

const EventAttendanceForm: React.FC<EventAttendanceFormProps> = ({
  eventId,
  eventAttendances,
}) => {
  const { session } = useSession();
  const [message, setMessage] = useState<string>("");

  // Check of de huidige gebruiker al ingeschreven is
  const isAttending = eventAttendances.some(
    (attendance) => attendance.userId === session?.user?.id
  );

  const handleAttendEvent = async () => {
    if (!session?.user) {
      setMessage("You need to be logged in to attend this event.");
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

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Successfully attended the event!");
      } else {
        setMessage(data.message || "Failed to attend the event.");
      }
    } catch (error) {
      setMessage("An error occurred: " + (error as Error).message);
    }
  };

  const handleCancelAttendance = async () => {
    if (!session?.user) return;

    try {
      const response = await fetch("/EventAttendance/Cancel", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          eventId: eventId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Successfully canceled the attendance.");
      } else {
        setMessage(data.message || "Failed to cancel attendance.");
      }
    } catch (error) {
      setMessage("An error occurred: " + (error as Error).message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "8px",
        marginTop: "8px",
      }}
    >
      {!isAttending ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAttendEvent}
          sx={{ fontSize: "12px", padding: "4px 10px" }}
        >
          Attend Event
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancelAttendance}
          sx={{ fontSize: "12px", padding: "4px 10px" }}
        >
          Cancel Attendance
        </Button>
      )}
      {message && (
        <Typography
          sx={{
            fontSize: "12px",
            marginTop: "4px",
            color: "red",
            textAlign: "center",
            width: "100%",
          }}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};

export default EventAttendanceForm;

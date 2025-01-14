import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useSession } from "../SessionContext";

interface EventAttendanceFormProps {
  eventId: number;
  eventAttendances: { userId: string }[];
}

const EventAttendanceForm: React.FC<EventAttendanceFormProps> = ({ eventId, eventAttendances }) => {
  const { session } = useSession();
  const [message, setMessage] = useState<string>("");

  // ✅ Controleer of de gebruiker al aanwezig is
  const isAttending = eventAttendances.some(
    (attendance) => attendance.userId === session?.user?.id
  );

  // ✅ Handle the event attendance
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
        // Check op de precieze message-tekst
        if (data.message === "You are already attending this event.")
          setMessage("You are already attending this event.");
        else
          setMessage("Successfully attended the event!");
      } else {
        // Anders (status niet OK), toon de fout
        setMessage(data.message || "Failed to attend the event.");
      }
    } catch (error) {
      setMessage("An error occurred: " + (error as Error).message);
    }
  };

  // ✅ Handle cancel attendance
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

      if (response.ok) {
        setMessage("Successfully canceled the attendance.");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to cancel attendance.");
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

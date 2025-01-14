import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useSession } from "../SessionContext";

interface EventAttendanceFormProps {
  eventId: number;
}

const EventAttendanceForm: React.FC<EventAttendanceFormProps> = ({ eventId }) => {
  const { session } = useSession();
  const [message, setMessage] = useState<string>("");

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

      if (response.ok) {
        setMessage("Successfully attended the event!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to attend the event.");
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
        display: "flex", // Plaatst knoppen en tekst op een rij
        justifyContent: "center", // Centreert alles horizontaal
        alignItems: "center", // Centreert alles verticaal
        flexWrap: "wrap", // Laat tekst naar de volgende regel gaan indien nodig
        gap: "8px", // Ruimte tussen knoppen
        marginTop: "8px", // Ruimte boven de knoppen
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleAttendEvent}
        sx={{
          fontSize: "12px", // Kleinere tekst
          padding: "4px 10px", // Compactere padding
        }}
      >
        Attend Event
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleCancelAttendance}
        sx={{
          fontSize: "12px", // Kleinere tekst
          padding: "4px 10px", // Compactere padding
        }}
      >
        Cancel Attendance
      </Button>
      {message && (
        <Typography
          sx={{
            fontSize: "12px", // Klein lettertype voor consistentie
            marginTop: "4px", // Ruimte boven de foutmelding
            color: "red", // Laat foutmeldingen duidelijk opvallen
            textAlign: "center", // Centreer de tekst
            width: "100%", // Laat de tekst breken indien nodig
          }}
        >
          {message}
        </Typography>
      )}
    </div>
  );
};

export default EventAttendanceForm;
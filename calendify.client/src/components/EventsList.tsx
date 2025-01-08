import React from "react";
import TextField from "@mui/material/TextField";
let baseUrl: string = "https://localhost:5165";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  attendances: EventAttendanceModel[];
}

export interface EventAttendanceModel {
  id: number;
  userId: number;
  eventId: number;
  attendedAt: string;
  rating: number;
  feedback?: string;
  user: User;
  event: Event;
}

export interface event {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxAttendees: number;
  category: string;
  adminApproval: boolean;
  attendances: EventAttendanceModel[];
}

let event: event = {
  title: "Team Meeting",
  description: "Monthly team alignment meeting.",
  date: "2025-01-08",
  startTime: "09:00:00",
  endTime: "11:00:00",
  location: "Conference Room 1",
  maxAttendees: 20,
  category: "Work",
  adminApproval: true,
  attendances: [],
};
export const ShowPostEvent = () => {
  return (
    <div>
      <div>
        <TextField label="Title" value={""} fullWidth variant="outlined" />
      </div>
      <div>
        <TextField
          label="Description"
          value={""}
          fullWidth
          variant="outlined"
        />
      </div>
      <div>
        <TextField label="Date" value={""} fullWidth variant="outlined" />
      </div>
      <div>
        <TextField label="Start Time" value={""} fullWidth variant="outlined" />
      </div>
      <div>
        <TextField label="End Time" value={""} fullWidth variant="outlined" />
      </div>
      <div>
        <TextField label="Location" value={""} fullWidth variant="outlined" />
      </div>
      <div>
        <TextField
          label="Max Attendees"
          type="number"
          fullWidth
          variant="outlined"
        />
      </div>
      <div>
        <TextField label="Category" value={""} fullWidth variant="outlined" />
      </div>
      <div>
        <TextField
          label="Admin Approval"
          value={""}
          type="number"
          fullWidth
          variant="outlined"
        />
      </div>
    </div>
  );
};
export const postEvent = async (event: event): Promise<void> => {
  await fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(event),
  });
};

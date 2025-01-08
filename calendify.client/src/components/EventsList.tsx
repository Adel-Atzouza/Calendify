import React from "react";
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
export const ShowPostEvent = (): JSX.Element => {
  return (
    <div>
      <div>
        Title:
        <input value={""}></input>
      </div>
      <div>
        Description:
        <input value={""}></input>
      </div>
      <div>
        Date:
        <input value={""}></input>
      </div>
      <div>
        StartTime:
        <input value={""}></input>
      </div>
      <div>
        EndTime:
        <input value={""}></input>
      </div>
      <div>
        Location:
        <input value={""}></input>
      </div>
      <div>
        MaxAttendees:
        <input type={"number"}></input>
      </div>
      <div>
        Category:
        <input value={""}></input>
      </div>
      <div>
        AdminApproval:
        <input value={""} type={"number"}></input>
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

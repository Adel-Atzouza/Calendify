import { EventAttendanceModel } from "./EventAttendence.state";

export type event = {
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
};

export type eventWithoutDeatails = {
  title : string,
  date : string,
  category : string
}

export type eventProps = { event: event };

export const events: event[] = [
  {
    title: "Annual Company Meeting",
    description: "A meeting to discuss company goals and achievements.",
    date: "2025-02-15",
    startTime: "10:00",
    endTime: "12:00",
    location: "Main Conference Room, HQ",
    maxAttendees: 100,
    category: "Business",
    adminApproval: true,
    attendances: [],
  },
  {
    title: "Team Building Workshop",
    description: "Interactive sessions to enhance teamwork and collaboration.",
    date: "2025-03-10",
    startTime: "09:00",
    endTime: "17:00",
    location: "Sunset Beach Resort",
    maxAttendees: 50,
    category: "Workshop",
    adminApproval: true,
    attendances: [],
  },
  {
    title: "AI in Healthcare Seminar",
    description: "Exploring the impact of AI on modern healthcare practices.",
    date: "2025-04-05",
    startTime: "14:00",
    endTime: "16:30",
    location: "Grand Auditorium, City Center",
    maxAttendees: 200,
    category: "Technology",
    adminApproval: false,
    attendances: [],
  },
  {
    title: "Art & Music Festival",
    description: "A celebration of local art and live music performances.",
    date: "2025-05-20",
    startTime: "12:00",
    endTime: "22:00",
    location: "Riverbank Park",
    maxAttendees: 500,
    category: "Entertainment",
    adminApproval: false,
    attendances: [],
  },
  {
    title: "Charity Fun Run",
    description: "A 5K run to raise funds for community welfare projects.",
    date: "2025-06-18",
    startTime: "08:00",
    endTime: "12:00",
    location: "Central Park",
    maxAttendees: 300,
    category: "Sports",
    adminApproval: true,
    attendances: [],
  },
];
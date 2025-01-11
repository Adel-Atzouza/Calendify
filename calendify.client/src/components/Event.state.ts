import { EventAttendanceModel } from "./EventAttendence.state";
import { User } from "./User.state";

export interface EventModel {
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

export type eventProps = {
  id: number;
  event: EventModel;
};

export type eventDetailsProps = {
  id: number;
  event: EventModel;
  closeEvent: () => void;
};

export const users: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Attendee",
    attendances: [],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "Organizer",
    attendances: [],
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@example.com",
    role: "Attendee",
    attendances: [],
  },
];

export const events: EventModel[] = [
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
    attendances: [
      {
        id: 1,
        userId: 1,
        eventId: 1,
        attendedAt: "2025-02-15T10:00:00",
        rating: 5,
        feedback: "Very informative and well-organized.",
        user: users[0],
        event: null, // Will be linked programmatically if needed.
      },
      {
        id: 2,
        userId: 3,
        eventId: 1,
        attendedAt: "2025-02-15T10:15:00",
        rating: 4,
        feedback: "Great event, but could have started on time.",
        user: users[2],
        event: null,
      },
    ],
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
    attendances: [
      {
        id: 3,
        userId: 2,
        eventId: 2,
        attendedAt: "2025-03-10T09:30:00",
        rating: 5,
        feedback: "The workshop exceeded my expectations!",
        user: users[1],
        event: null,
      },
    ],
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
    attendances: [
      {
        id: 4,
        userId: 3,
        eventId: 3,
        attendedAt: "2025-04-05T14:10:00",
        rating: 4,
        feedback: "Very insightful, but could have included more examples.",
        user: users[2],
        event: null,
      },
    ],
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

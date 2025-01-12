import { User } from "./User.state";

export type EventAttendanceModel = {
  id: number;
  userId: number;
  eventId: number;
  attendedAt: string;
  rating: number;
  feedback?: string;
  user: User;
  event: Event;
};

export type eventAttendenceProps = { eventAttendence: EventAttendanceModel };

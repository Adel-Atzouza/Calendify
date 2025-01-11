import { User } from "./User.state";

export interface EventAttendanceModel {
  id: number;
  userId: string;
  eventId: number;
  attendedAt: string;
  rating: number;
  feedback?: string;
  user: User;
  event: Event | null;
}

export type eventAttendenceProps = { eventAttendence: EventAttendanceModel };

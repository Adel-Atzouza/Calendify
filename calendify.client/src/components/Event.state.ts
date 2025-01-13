import { EventAttendanceModel } from "./EventAttendence.state";
import { User } from "./User.state";

export interface EventModel {
  id: number;
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

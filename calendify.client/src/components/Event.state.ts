import { EventAttendanceModel } from "./EventAttendence.state";

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

export interface ApproveEventProps {
  id: number;
  event: Event;
}

export interface EventPage {
  events: EventModel[];
  isLastPage: boolean;
}

export type EventDetailsProps = {
  id: number;
  event: EventModel;
  closeEvent: () => void;
};

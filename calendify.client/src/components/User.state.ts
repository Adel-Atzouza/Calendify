import { EventAttendanceModel } from "./EventAttendence.state";
export type User  = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  attendances: EventAttendanceModel[];
}

export type userProps = {user : User}


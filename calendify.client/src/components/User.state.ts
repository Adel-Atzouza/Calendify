import { EventAttendanceModel } from "./EventAttendence.state";
<<<<<<< HEAD
export type User  = {
=======
export type User = {
>>>>>>> origin/Mark
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  attendances: EventAttendanceModel[];
};

export type userProps = { user: User };

export interface postEventProps {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxAttendees: number;
  category: string;
  adminApproval: boolean;
}
const POSTURL = "Events/";

export default async function PostEvent(props: postEventProps): Promise<void> {
  try {
    await fetch(POSTURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    });
  } catch (e) {
    console.log(e);
  }
}

import { useState } from "react";

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
  const [] = useState();

  const postOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  };
  try {
    const response = await fetch(POSTURL, postOptions);
    if (response?.status == 400) {
      return;
    }
  } catch (e) {
    console.log(e);
  };
}

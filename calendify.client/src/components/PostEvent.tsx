// import { useEffect, useState } from "react";
// import { EventModel } from "./Event.state";
// import { stringify } from "querystring";

// export default function postEvent(Event: EventModel): JSX.Element {
//   // call the post method and wait for the response

//   return <div>Event {Event.title} has been added succesfully</div>;
// }

// function addEventToDatabase(Event: EventModel) {
//   const url = "/Events";

//   useEffect(() => {
//     const tryPostEvents = async () => {
//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ Event }),
//         });
//         const responseJson = response.json();
//         if (responseJson.)
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     tryPostEvents();
//   }, []);
// }

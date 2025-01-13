export const attendEvent = async (userId: string, eventId: number): Promise<string> => {
    try {
      const response = await fetch("/EventAttendance/Attend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, eventId }),
      });
  
      if (response.ok) {
        return "Successfully attended the event!";
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }
    } catch (error) {
      throw new Error("An error occurred: " + (error as Error).message);
    }
  };
  
  export const cancelAttendance = async (userId: string, eventId: number): Promise<string> => {
    try {
      const response = await fetch(`/api/EventAttendance/${userId}/${eventId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        return "Successfully canceled the attendance.";
      } else {
        throw new Error("Failed to cancel attendance.");
      }
    } catch (error) {
      throw new Error("An error occurred: " + (error as Error).message);
    }
  };
  
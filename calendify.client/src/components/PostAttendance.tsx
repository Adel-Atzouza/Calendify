interface CalendarEvent {
    title: string;
    description: string;
    date: Date;
    startTime: string;
    endTime: string;
}

const postAttendance = async (event: CalendarEvent): Promise<any> => {
    try {
        const response = await fetch("/Attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...event, userId: "0" }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Attendance succesvol toegevoegd:", data);
        return data; // De server stuurt het nieuw gemaakte event terug
    } catch (error) {
        console.error("Error bij het toevoegen van attendance:", error);
        throw error;
    }
};

export default postAttendance;

// src/services/PostAttendance.ts

export interface PostAttendanceProps {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    userId: string; // Get this userId from context or session (depending on your auth setup)
}

const POST_URL = "http://localhost:5165/attendance"; // Replace with your backend URL

export default async function PostAttendance(props: PostAttendanceProps): Promise<void> {
    try {
        const response = await fetch(POST_URL, {
            method: "POST", // Use POST method to create a new record
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(props), // Send the props object as JSON
        });

        if (!response.ok) {
            throw new Error("Failed to create attendance.");
        }

        console.log("Attendance created successfully!");
    } catch (e) {
        console.error("Error creating attendance:", e);
    }
}

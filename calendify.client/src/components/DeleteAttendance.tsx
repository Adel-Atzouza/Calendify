// export const deleteAttendance = async (id: number): Promise<void> => {
//     try {
//         const response = await fetch(`/Attendance/${id}`, {
//             method: "DELETE",
//         });

//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(`Failed to delete attendance: ${errorMessage}`);
//         }

//         console.log(`Attendance with ID ${id} successfully deleted.`);
//     } catch (error) {
//         console.error("Error deleting attendance:", error);
//         throw error;
//     }
// };


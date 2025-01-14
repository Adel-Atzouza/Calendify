export async function requestDeleteEvent(id: number): Promise<void> {
  try {
    await fetch(`Events?id=${id}`, {
      method: "DELETE",
    });
  } catch (e) {
    console.error("Failed to approve event:", e);
  }
}

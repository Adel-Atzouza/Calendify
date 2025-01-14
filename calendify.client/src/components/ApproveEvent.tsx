const ApproveUrl = "/Events/Approve";
export async function ApproveEvent(id: number): Promise<void> {
  try {
    await fetch(`${ApproveUrl}?EventId=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Failed to approve event:", e);
  }
}

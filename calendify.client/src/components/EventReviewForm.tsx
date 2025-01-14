import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useSession } from "../SessionContext";

interface EventReviewFormProps {
  eventId: number;
  onReviewSubmitted: () => void; // Callback om de parent te informeren
}

const EventReviewForm: React.FC<EventReviewFormProps> = ({
  eventId,
  onReviewSubmitted,
}) => {
  const { session } = useSession();
  
  // Gebruik hier een lokale state voor de rating:
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmitReview = async () => {
    if (!session?.user) {
      setMessage("You need to be logged in to submit a review.");
      return;
    }

    try {
      const response = await fetch("/EventAttendance/SubmitReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          eventId: eventId,
          rating: rating,
          feedback: feedback,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Review submitted successfully!");
        // velden clearen
        setRating(0);
        setFeedback("");

        // parent laten weten dat we succesvol hebben gepost
        onReviewSubmitted();
      } else {
        setMessage(data.message || "Failed to submit review.");
      }
    } catch (error) {
      setMessage("An error occurred: " + (error as Error).message);
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ color: "black" }}>
        Leave a Review
      </Typography>
      <TextField
        sx={{ color: "black", border: "1px solid" }}
        label="Rating (1-5)"
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        inputProps={{ min: 1, max: 5 }}
        fullWidth
        margin="normal"
      />
      <TextField
        sx={{ color: "black", border: "1px solid" }}
        className="EventDetails"
        label="Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <Button sx={{ justifyContent: "center" }} onClick={handleSubmitReview}>
        Submit review
      </Button>
      {message && <Typography color="error">{message}</Typography>}
    </div>
  );
};

export default EventReviewForm;

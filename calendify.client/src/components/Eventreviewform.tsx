import React, { useState } from 'react';
import { Button, TextField, Typography, Rating, Box } from '@mui/material';
import { useSession } from '../SessionContext';

const EventReviewForm = ({ eventId }: { eventId: number }) => {
  const { session } = useSession();
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/EventReview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id,
          eventId: eventId,
          rating: rating,
          feedback: comment,
        }),
      });

      if (response.ok) {
        setMessage('Review submitted successfully!');
        setRating(0);
        setComment('');
      } else {
        const errorData = await response.json();
        setMessage(`Error submitting review: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6">Post a Review</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        sx={{ mt: 1 }}
      />
      <TextField
        label="Comment"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit Review
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default EventReviewForm;

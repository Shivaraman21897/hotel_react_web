import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import BookingSummary from '../components/BookingSummary';
import { useLocation } from 'react-router-dom';

export default function BookingSummaryPage() {
  const location = useLocation();
  const rowData = location.state;
  console.log(rowData, "rowData");

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Booking Summary
      </Typography>
      <Box mt={2}>
          <BookingSummary bookingDetails={rowData} />
      </Box>
    </Container>
  );
}

// components/BookingSummary.jsx
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  Chip,
  Divider,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  PayPalScriptProvider,
  PayPalButtons
} from "@paypal/react-paypal-js";

export default function BookingSummary({ bookingDetails }) {
  const {
    hotel,
    searchDetails,
  } = bookingDetails || {};

  if (!hotel || !searchDetails) return null;

  const {
    name,
    location,
    images = [],
    amenities = [],
    price,
  } = hotel;

  const checkInDate = new Date(searchDetails.checkIn);
  const checkOutDate = new Date(searchDetails.checkOut);
  const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

  const formattedCheckIn = checkInDate.toDateString();
  const formattedCheckOut = checkOutDate.toDateString();
  const guestSummary = `${searchDetails.adults} Adults, ${searchDetails.children} Children`;

  const roomType = "Deluxe Room";
  const inclusions = [
    'Room Only',
    'Free WiFi',
    'Access to Pool and Gym',
    'Late Checkout (subject to availability)',
  ];

  const subtotal = price * nights;
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;
  const usdTotal = (total / 83).toFixed(2); // Approx conversion INR → USD

  return (
    <PayPalScriptProvider options={{ clientId: "test", currency: "USD" }}>
      <Grid container spacing={2}>
        {/* LEFT SIDE */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Typography variant="h6" fontWeight="bold">{name}</Typography>
                <Chip label="Couple Friendly" size="small" sx={{ mt: 1, mb: 1 }} />
                <Typography variant="body2" color="text.secondary">{location}</Typography>
              </Grid>
              <Grid item xs={2}>
                <CardMedia
                  component="img"
                  height="80"
                  image={images[0]}
                  alt={name}
                  sx={{ borderRadius: 1 }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="caption">CHECK IN</Typography>
                <Typography fontWeight="bold">{formattedCheckIn}</Typography>
                <Typography variant="body2">3 PM</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="caption">CHECK OUT</Typography>
                <Typography fontWeight="bold">{formattedCheckOut}</Typography>
                <Typography variant="body2">12 PM</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight="bold">
                  {nights} Night{nights > 1 ? 's' : ''} | {guestSummary}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight="bold">{roomType}</Typography>
            <Typography variant="body2" color="text.secondary">{guestSummary}</Typography>
            <ul style={{ paddingLeft: '20px' }}>
              {inclusions.map((item, index) => (
                <li key={index}>
                  <Typography variant="body2">{item}</Typography>
                </li>
              ))}
            </ul>

            <Typography variant="subtitle2" color="error" mt={2}>
              Non-Refundable
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Refund is not applicable for this booking
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, color: '#0077cc', fontWeight: 500, cursor: 'pointer' }}
            >
              Cancellation policy details
            </Typography>
          </Card>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom>Price Breakup</Typography>

            <Box display="flex" justifyContent="space-between">
              <Typography>Hotel x {nights} Night{nights > 1 ? 's' : ''}</Typography>
              <Typography>₹{subtotal}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={1}>
              <Box display="flex" alignItems="center">
                <Typography>Hotel Taxes</Typography>
                <InfoOutlinedIcon sx={{ fontSize: 16, ml: 1 }} />
              </Box>
              <Typography>₹{taxes.toFixed(0)}</Typography>
            </Box>

            <Divider sx={{ my: 1.5 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6">₹{total.toLocaleString()}</Typography>
            </Box>

            {/* PayPal Button */}
            <PayPalButtons
              style={{ layout: "vertical", color: "blue" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: usdTotal,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert("Payment completed by " + details.payer.name.given_name);
                });
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </PayPalScriptProvider>
  );
}

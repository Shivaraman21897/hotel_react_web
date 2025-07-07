import { Card, CardMedia, CardContent, Typography, Box, Button, Chip } from '@mui/material';

export default function HotelCard({ hotel }) {
  return (
    <Card sx={{ display: 'flex', mb: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image={hotel.image}
        alt={hotel.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent>
          <Typography variant="h6">{hotel.name}</Typography>
          <Typography variant="body2" color="text.secondary">{hotel.location}</Typography>
          <Box sx={{ mt: 1 }}>
            {hotel.amenities.map((amenity, idx) => (
              <Chip label={amenity} size="small" sx={{ mr: 1, mb: 1 }} key={idx} />
            ))}
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>Rating: ⭐ {hotel.rating}</Typography>
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>₹{hotel.price}/night</Typography>
        </CardContent>
        <Box sx={{ p: 2 }}>
          <Button variant="contained">Book Now</Button>
        </Box>
      </Box>
    </Card>
  );
}

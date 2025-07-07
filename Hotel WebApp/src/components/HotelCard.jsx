import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Stack,
  Divider,
} from '@mui/material';
import {useNavigate } from "react-router-dom";

export default function HotelCard({ hotel, searchDetails }) {
  const navigate = useNavigate();
  const {
    name,
    location,
    rating,
    price,
    originalPrice,
    images = [],
    amenities = [],
    guestRatingText,
    roomType = 'Deluxe Room',
    cancellation = 'Free cancellation available',
    breakfastIncluded = true,
    distance = '1.2 km from city center',
  } = hotel;

  const mainImage =
    images[0] ||
    'https://images.pexels.com/photos/2363808/pexels-photo-2363808.jpeg';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 2,
        mb: 3,
        borderRadius: 4,
        boxShadow: 3,
        gap: 2,
      }}
    >
      {/* Hotel Image */}
      <Box sx={{ width: 300, position: 'relative' }}>
        <CardMedia
          component="img"
          image={mainImage}
          alt={name}
          sx={{ width: '100%', height: 200, borderRadius: 2, objectFit: 'cover' }}
        />

        {/* Thumbnail Images */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ position: 'absolute', bottom: 8, left: 8, bgcolor: '#ffffffcc', p: 0.5, borderRadius: 1 }}
        >
          {images.slice(1, 4).map((img, idx) => (
            <Box
              key={idx}
              component="img"
              src={img}
              sx={{
                width: 50,
                height: 35,
                borderRadius: 1,
                border: '1px solid #ddd',
                objectFit: 'cover',
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Info Section */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {location} • {distance}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Rating name="read-only" value={Number(rating)} readOnly size="small" />
            <Typography variant="body2" fontWeight={500}>
              {rating} • {guestRatingText || 'Very Good'}
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {roomType} • {cancellation}
          </Typography>
          {breakfastIncluded && (
            <Typography variant="body2" color="success.main">
              Includes breakfast
            </Typography>
          )}

          {/* Amenities */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
            {amenities.slice(0, 5).map((amenity, idx) => (
              <Chip key={idx} label={amenity} size="small" />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Pricing + CTA */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            {originalPrice && originalPrice > price && (
              <Typography
                variant="body2"
                sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
              >
                ₹{originalPrice.toLocaleString()}
              </Typography>
            )}
            <Typography variant="h6" fontWeight={700} color="primary">
              ₹{price.toLocaleString()} <Typography variant="caption">/night</Typography>
            </Typography>
          </Box>

          <Button onClick={() => navigate(`/summary`, { state: { searchDetails, hotel } })} variant="contained" color="primary" size="medium">
            Book Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

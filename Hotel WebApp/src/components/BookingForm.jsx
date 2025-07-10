import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Popover,
  Box,
  Typography,
  Container
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HotelCard from '../components/HotelCard';

// Example hotel data
const hotels = [
  {
    name: 'Sea View Hotel',
    location: 'Goa Beach, Goa',
    images: [
      'https://images.pexels.com/photos/2363808/pexels-photo-2363808.jpeg',
      'https://images.pexels.com/photos/6127330/pexels-photo-6127330.jpeg',
      'https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg',
      'https://images.pexels.com/photos/6127022/pexels-photo-6127022.jpeg',
    ],
    amenities: ['Free WiFi', 'Pool', 'Breakfast'],
    rating: 4.5,
    price: 3500,
    id: 1
  },
  {
    name: 'Mountain Retreat',
    location: 'Manali, Himachal Pradesh',
    images: [
      'https://images.pexels.com/photos/2227787/pexels-photo-2227787.jpeg',
      'https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg',
      'https://images.pexels.com/photos/2907196/pexels-photo-2907196.jpeg',
      'https://images.pexels.com/photos/2952663/pexels-photo-2952663.jpeg',
    ],
    amenities: ['Spa', 'Balcony View', 'Free Parking'],
    rating: 4.8,
    price: 4200,
    id: 2
  },
  {
    name: 'ITC',
    location: 'Chennai',
    images: [
      'https://images.pexels.com/photos/2907196/pexels-photo-2907196.jpeg',
      'https://images.pexels.com/photos/2227787/pexels-photo-2227787.jpeg',
      'https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg',
      'https://images.pexels.com/photos/2952663/pexels-photo-2952663.jpeg',
    ],
    amenities: ['Spa', 'Balcony View', 'Free Parking', 'Free WiFi', 'Pool', 'Breakfast'],
    rating: 5,
    price: 9200,
    id: 3
  },
  {
    name: 'Ags Holiday Resorts',
    location: 'Chennai',
    images: [
      'https://images.pexels.com/photos/6127330/pexels-photo-6127330.jpeg',
      'https://images.pexels.com/photos/2907196/pexels-photo-2907196.jpeg',
      'https://images.pexels.com/photos/2227787/pexels-photo-2227787.jpeg',
      'https://images.pexels.com/photos/2952663/pexels-photo-2952663.jpeg',
    ],
    amenities: ['Spa', 'Balcony View', 'Free WiFi', 'Pool'],
    rating: 4.5,
    price: 7000,
    id: 4
  },
];

//SearchResults component

const SearchResults = ({ hotels, searchDetails }) => {
  console.log(hotels, 'Filtered Hotels');
  console.log(searchDetails, 'Search Details');

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        {hotels.length === 0 ? (
          <Typography variant="h6">No hotels found</Typography>
        ) : (
          hotels.map((hotel, index) => (
            <HotelCard
              hotel={hotel}
              searchDetails={searchDetails}
              key={index}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

const BookingForm = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = location.trim().toLowerCase();

    if (searchTerm === '') {
      setFilteredHotels(hotels);
    } else {
      const results = hotels.filter(
        (hotel) =>
          hotel.location.toLowerCase().includes(searchTerm) ||
          hotel.name.toLowerCase().includes(searchTerm)
      );
      setFilteredHotels(results);
    }
  };

  const handleChildCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setChildren(count);
    const updatedAges = [...childrenAges].slice(0, count);
    while (updatedAges.length < count) {
      updatedAges.push(1);
    }
    setChildrenAges(updatedAges);
  };

  const handleChildAgeChange = (index, value) => {
    const updatedAges = [...childrenAges];
    updatedAges[index] = value;
    setChildrenAges(updatedAges);
  };

  const openGuestsPopover = (event) => setAnchorEl(event.currentTarget);
  const closeGuestsPopover = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const searchDetails = {
    location,
    checkIn,
    checkOut,
    rooms,
    adults,
    children,
    childrenAges,
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="City, Area or Property"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                size="small"
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <DatePicker
                label="Check-in"
                value={checkIn}
                onChange={(newValue) => {
                  setCheckIn(newValue);
                  if (checkOut && newValue > checkOut) {
                    setCheckOut(null);
                  }
                }}
                disablePast
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </Grid>

            <Grid item xs={6} md={2}>
              <DatePicker
                label="Check-out"
                value={checkOut}
                onChange={(newValue) => setCheckOut(newValue)}
                disablePast
                minDate={checkIn}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                onClick={openGuestsPopover}
                fullWidth
                variant="outlined"
                endIcon={<ExpandMoreIcon />}
                sx={{
                  height: '40px',
                  justifyContent: 'space-between',
                  textTransform: 'none'
                }}
              >
                {rooms} Room, {adults} Adults{children > 0 ? `, ${children} Child` : ''}
              </Button>

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={closeGuestsPopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              >
                <Box sx={{ p: 2, width: 300 }}>
                  <Typography variant="subtitle1">Rooms</Typography>
                  <TextField
                    select
                    fullWidth
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                  </TextField>

                  <Typography variant="subtitle1">Adults</Typography>
                  <TextField
                    select
                    fullWidth
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                  </TextField>

                  <Typography variant="subtitle1">Children (0–17 yrs)</Typography>
                  <TextField
                    select
                    fullWidth
                    value={children}
                    onChange={handleChildCountChange}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                  </TextField>

                  {children > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Age of Children</Typography>
                      {childrenAges.map((age, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Typography variant="body2">Child {index + 1}</Typography>
                          <TextField
                            select
                            fullWidth
                            size="small"
                            value={age}
                            onChange={(e) => handleChildAgeChange(index, Number(e.target.value))}
                          >
                            {Array.from({ length: 18 }, (_, i) => (
                              <MenuItem key={i} value={i}>{String(i).padStart(2, '0')}</MenuItem>
                            ))}
                          </TextField>
                        </Box>
                      ))}
                    </>
                  )}

                  <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={closeGuestsPopover}>
                    Apply
                  </Button>
                </Box>
              </Popover>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                size="large"
                sx={{ height: '40px' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>

      <SearchResults hotels={filteredHotels} searchDetails={searchDetails} />
    </>
  );
};

export default BookingForm;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    if (source === 'clickhouse') {
      setDestination('flatfile');
    } else if (source === 'flatfile') {
      setDestination('clickhouse');
    }
  }, [source]);

  useEffect(() => {
    // If destination changes, automatically update source if needed
    if (destination === 'clickhouse' && source !== 'flatfile') {
      setSource('flatfile');
    } else if (destination === 'flatfile' && source !== 'clickhouse') {
      setSource('clickhouse');
    }
  }, [destination]);

  function handleSubmit(e) {
    e.preventDefault();
    if (source === '' || destination === '') alert("Please Select Something");
    else if (source === destination) alert("You have selected wrong things");
    else if (source === 'clickhouse' && destination === 'flatfile') navigate('/Import');
    else if (source === 'flatfile' && destination === 'clickhouse') navigate('/Export');
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      sx={{
        background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.8), rgba(255, 87, 34, 0.8))',
        padding: 3,
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Typography variant="h3" color="white" gutterBottom sx={{ fontWeight: 600 }}>
        Select the Operations You Want to Perform
      </Typography>

      <Box
        component="form"
        sx={{
          mt: 5,
          height: '45vh',
          width: '50vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          background: 'white',
          borderRadius: 8,
          padding: 3,
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
        }}
        onSubmit={handleSubmit}
      >
        {/* Source Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel id="source-label">Source</InputLabel>
          <Select
            labelId="source-label"
            id="source"
            value={source}
            label="Source"
            onChange={(e) => setSource(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#1976d2',
                },
                '&:hover fieldset': {
                  borderColor: '#1565c0',
                },
              },
            }}
          >
            <MenuItem value="clickhouse">ClickHouse</MenuItem>
            <MenuItem value="flatfile">FlatFile</MenuItem>
          </Select>
        </FormControl>

        {/* Destination Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel id="destination-label">Destination</InputLabel>
          <Select
            labelId="destination-label"
            id="destination"
            value={destination}
            label="Destination"
            onChange={(e) => setDestination(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#1976d2',
                },
                '&:hover fieldset': {
                  borderColor: '#1565c0',
                },
              },
            }}
          >
            <MenuItem value="clickhouse">ClickHouse</MenuItem>
            <MenuItem value="flatfile">FlatFile</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            width: '100%',
            padding: '12px',
            fontSize: '1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#1565c0',
              transform: 'translateY(-2px)',
            },
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          {source === 'clickhouse' && destination === 'flatfile' ? 'Import Data' : 'Export Data'}
        </Button>
      </Box>
    </Box>
  );
}

export default Home;

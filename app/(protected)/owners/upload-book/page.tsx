"use client";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';

const UploadNewBook = () => {
  const [bookName, setBookName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rentPrice, setRentPrice] = useState('');

  const [options, setOptions] = useState([
    'Option 1',
    'Option 2',
    'Option 3',
    'custom-button',
  ]);


  const StyledOption = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      padding: theme.spacing(2),
    },
  }));

  const CustomOption = (props: any) => {
    const { option, onSelect } = props;

    const handleOpen = () => { };
    const handleClose = () => { };

    if (option === 'custom-button') {
      return (
        <StyledOption onClick={handleOpen}>
          <Button>Open Modal</Button>
        </StyledOption>
      );
    }

    return (
      <StyledOption onClick={() => onSelect(option)}>
        {option}
      </StyledOption>
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
        Upload New Book
      </Typography>

      <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2, mb: 2 }}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <CustomOption {...props} option={option} onSelect={props.onClick} />
          )}
          renderInput={(params) => (
            <TextField {...params} label="Search by title or author" variant="outlined" />
          )}
          style={{
            maxWidth: "320px",
            maxHeight: '198px',
            overflow: 'auto',
            padding: "5px"
          }}

        />

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            displayEmpty
            fullWidth
            variant="outlined"
            sx={{ flex: 1 }}
          >
            <MenuItem value="" disabled>
              Book Quantity
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>

          <TextField
            placeholder="Rant price for 2 weeks"
            variant="outlined"
            fullWidth
            sx={{ flex: 1 }}
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
          />
        </Box>

        <Button
          variant="text"
          startIcon={<CloudUploadIcon />}
          sx={{ color: '#2196f3', mt: 2, textTransform: 'none' }}
        >
          Upload Book Cover
        </Button>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 50,
          backgroundColor: '#2196f3',
          '&:hover': {
            backgroundColor: '#1e88e5',
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UploadNewBook;

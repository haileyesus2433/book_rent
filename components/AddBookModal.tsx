"use client"
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const AddBook = () => {
  const [openModal, setOpenModal] = useState(false);
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 2, bgcolor: 'white', borderRadius: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
        Add Book
      </Typography>

      <TextField
        fullWidth
        label="Book Name"
        variant="filled"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        sx={{ mb: 2, bgcolor: '#f5f5f5', '& .MuiFilledInput-underline:before': { borderBottomColor: '#2196f3' } }}
        InputLabelProps={{ sx: { color: '#2196f3' } }}
      />

      <TextField
        fullWidth
        label="Author Name"
        variant="filled"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        sx={{ mb: 2, bgcolor: '#f5f5f5', '& .MuiFilledInput-underline:before': { borderBottomColor: 'transparent' } }}
      />

      <Select
        fullWidth
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        displayEmpty
        variant="filled"
        sx={{ mb: 2, bgcolor: '#f5f5f5', '& .MuiFilledInput-underline:before': { borderBottomColor: 'transparent' } }}
      >
        <MenuItem value="" disabled>
          Category
        </MenuItem>
        <MenuItem value="fiction">Fiction</MenuItem>
        <MenuItem value="non-fiction">Non-Fiction</MenuItem>
        {/* Add more categories as needed */}
      </Select>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 2,
          backgroundColor: '#2196f3',
          '&:hover': {
            backgroundColor: '#1e88e5',
          },
        }}
      >
        Add
      </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-book-modal"
        aria-describedby="modal-to-add-new-book"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h6" component="h2">
            Add New Book
          </Typography>
          {/* Add form fields for new book here */}
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddBook;

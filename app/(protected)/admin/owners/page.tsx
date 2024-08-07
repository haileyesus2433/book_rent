"use client"
import CheckIcon from '@mui/icons-material/Check';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import {
  Avatar,
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  styled,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

const ownerData = [
  { no: '01', author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: true },
  { no: '01', author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: true },
  { no: '01', author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: true },
  { no: '01', author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: true },
  { no: '01', author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: true },
  // Add more rows as needed
];

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 90,
  height: 26,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      transform: 'translateX(60px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#90ee90',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 24,
    height: 24,
    color: "#008000",
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));



const ListOfOwner = () => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          List of Owner
        </Typography>
        <Box>
          <IconButton size="small"><SearchIcon /></IconButton>
          <IconButton size="small"><ViewWeekIcon /></IconButton>
          <IconButton size="small"><ViewStreamIcon /></IconButton>
          <IconButton size="small"><FilterListIcon /></IconButton>
        </Box>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Author</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Owner</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Book Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ownerData.map((row, index) => (
              <TableRow hover key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src="/path-to-nardos-image.jpg" sx={{ width: 24, height: 24, mr: 1 }} />
                    {row.owner}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{row.category}</TableCell>
                <TableCell>{row.bookName}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", backgroundColor: "#90ff9066", height: "38px", width: "187px" }}>
                    <CheckIcon sx={{ color: '#008000' }} />
                    <FormControlLabel
                      control={<CustomSwitch defaultChecked />}
                      label="Active"
                      labelPlacement="start"
                      color='#008000'
                      sx={{ color: '#008000' }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ListOfOwner;

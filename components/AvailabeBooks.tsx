import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 54, label: 'Fiction', color: '#4285F4' },
  { id: 1, value: 20, label: 'Self Help', color: '#34A853' },
  { id: 2, value: 26, label: 'Business', color: '#EA4335' },
];

const AvailableBooksCard = () => {
  return (
    <Card sx={{ maxWidth: 400, boxShadow: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            Available Books
          </Typography>
          <Chip label="Today" size="small" sx={{ backgroundColor: '#F3F4F6', color: '#6B7280' }} />
        </Box>

        <Box height={200}>
          <PieChart
            series={[{ data, innerRadius: 80 }]}
            width={300}
            height={200}
            legend={{ hidden: true }}
          />
        </Box>

        <Grid container spacing={2} mt={2}>
          {data.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Box display="flex" alignItems="center">
                <Box
                  width={12}
                  height={12}
                  borderRadius="50%"
                  bgcolor={item.color}
                  mr={1}
                />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {item.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AvailableBooksCard;

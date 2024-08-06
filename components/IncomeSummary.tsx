import { Button, Card, CardContent, Typography } from '@mui/material';

const IncomeSummary = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          This Month Statistics
          <Typography variant="subtitle2" color="textSecondary" ml={1}>
            Tue, 14 Nov, 2024, 11:30 AM
          </Typography>
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Typography variant="subtitle1" mr={1}>
            Income
          </Typography>
          <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
            This Month
          </Button>
        </div>

        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          ETB 9460.00
          <span style={{ color: 'red', fontSize: '1.5rem', marginLeft: '0.5rem' }}>
            {' '}
            &darr; 1.5%
          </span>
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Compared to ETB99940 last month
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last Month Income{' '}
          <span style={{ fontWeight: 'bold' }}>ETB 25658.00</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IncomeSummary;

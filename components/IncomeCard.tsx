import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';

const IncomeCard = () => {
  return (
    <Card sx={{ maxWidth: 400, boxShadow: 1 }}>
      <CardContent sx={{
        display: "flex", flexDirection: "column", gap: 1,
        p: ["24px", "24px", "20px", "24px"]
      }}>
        <Box sx={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: 1, borderColor: "#A3A3A3",
          paddingBottom: 1
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Income
          </Typography>
          <Chip label="This Month" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mr: 1 }}>
            ETB 9460.00
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
            <ArrowDownwardIcon fontSize="small" />
            <Typography variant="body2">1.5%</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Compared to ETB9940 last month
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Last Month Income
          </Typography>
          <Typography variant="h6" component="div">
            ETB 25658.00
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default IncomeCard;

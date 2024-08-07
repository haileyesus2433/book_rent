import { Box, Card, CardContent, MenuItem, Select, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useState } from 'react';

const data = [
  { month: 'May', current: 140000, previous: 150000 },
  { month: 'Jun', current: 260000, previous: 180000 },
  { month: 'Jul', current: 170000, previous: 200000 },
  { month: 'Aug', current: 240000, previous: 140000 },
  { month: 'Sep', current: 220000, previous: 160000 },
  { month: 'Oct', current: 240000, previous: 180000 },
];

const EarningSummary = () => {
  const [dateRange, setDateRange] = useState('Mar 2022 - Oct 2024');

  return (
    <Card sx={{ maxWidth: 800, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Earning Summary</Typography>
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            size="small"
          >
            <MenuItem value="Mar 2022 - Oct 2024">Mar 2022 - Oct 2024</MenuItem>
            {/* Add more date range options as needed */}
          </Select>
        </Box>
        <Box sx={{ height: 300 }}>
          <LineChart
            xAxis={[{
              data: data.map(item => item.month),
              scaleType: 'band',
            }]}
            series={[
              {
                data: data.map(item => item.current),
                label: 'Last 6 months',
                area: true,
                color: '#1976d2',
                showMark: false,
              },
              {
                data: data.map(item => item.previous),
                label: 'Same period last year',
                color: '#9e9e9e',
                showMark: false,
                lineStyle: { strokeDasharray: '5 5' },
              },
            ]}
            yAxis={[{
              label: 'Birr',
              labelStyle: { fontSize: 12 },
              tickMinStep: 100000,
              max: 300000,
              tickValues: [0, 100000, 200000, 300000],
              valueFormatter: (value) => `${value / 1000}k Birr`,
            }]}
            sx={{
              '.MuiLineElement-root': {
                strokeWidth: 2,
              },
              '.MuiAreaElement-series-current': {
                fill: 'url(#gradient)',
                opacity: 0.2,
              },
            }}
            width={750}
            height={300}
          >
            <defs>
              <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
              </linearGradient>
            </defs>
          </LineChart>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EarningSummary;

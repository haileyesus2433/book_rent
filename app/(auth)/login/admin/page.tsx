// // import Login from "@/components/Login";
// // import Sidebar from "@/components/Sidebar";

// import Header from "@/components/Header";

// export default function UserLogin() {
//   return <Header />
//   // return <Sidebar />
//   // return <Login role="admin" />;

// }

// pages/dashboard.tsx

import Statistics from '@/components/Stats';
import Card from '@/components/StatsCard';
import Header from '@/components/StatsHeader';
import { Box, Chip, Container } from '@mui/material';
import React from 'react';

const Dashboard: React.FC = () => {
  const income = {
    amount: 9460.00,
    currency: 'ETB',
    percentage: -1.5,
    lastMonth: 25658.00,
  };

  const bookCategories = [
    { label: 'Fiction', value: 54, color: '#1976d2' },
    { label: 'Self Help', value: 20, color: '#4caf50' },
    { label: 'Business', value: 26, color: '#f44336' },
  ];

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Header
          title="This Month Statistics"
          subtitle="Tue, 14 Nov, 2024, 11.30 AM"
        />
        <Card
          title="Income"
          action={
            <Chip label="This Month" variant="outlined" size="small" />
          }
        >
          <Statistics income={income} bookCategories={bookCategories} />
        </Card>
      </Box>
    </Container>
  );
};

export default Dashboard;

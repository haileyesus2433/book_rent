// components/Card.tsx
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, action }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {action}
      </Box>
      {children}
    </Paper>
  );
};

export default Card;

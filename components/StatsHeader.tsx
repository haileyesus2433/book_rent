import { Box, Typography } from '@mui/material';
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom color="#525256">
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;

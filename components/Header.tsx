"use client"
import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const pathname = usePathname();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    borderRadius: 13,
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  const getHeaderTitle = () => {
    const paths = pathname.split('/').filter(Boolean);
    if (paths.length === 0) return 'Admin';

    const basePath = paths[0].charAt(0).toUpperCase() + paths[0].slice(1);
    const subPath = paths.length > 1 ? '/' + paths[1].charAt(0).toUpperCase() + paths[1].slice(1) : '';

    return `${basePath}${subPath}`;
  };

  const headerTitle = getHeaderTitle();

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
          {headerTitle.split('/').map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Box component="span" sx={{ color: 'grey.600', mx: 0.5 }}>
                  /
                </Box>
              )}
              <Box component="span" sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                {part}
              </Box>
            </React.Fragment>
          ))}
        </Typography>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;

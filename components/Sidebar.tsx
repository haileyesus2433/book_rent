'use client';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import BookIcon from './BookIcon';

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerContent = (
    <>
      <Box sx={{
        p: 2,
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "15px"
      }
      }>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Box component="span" sx={{ color: '#0088cc', m: 0, p: 0 }}>
          <BookIcon width={37} height={30} color='#00ABFF' />
        </Box>
        <Typography variant="h6" component="div" sx={{
          color: '#00ABFF',

        }}>
          Book Rent
        </Typography>
      </Box>
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, href: '/admin' },
          { text: 'Books', icon: <MenuBookIcon />, href: '/admin/books' },
          { text: 'Owners', icon: <PeopleIcon />, href: '/admin/owners' },
          { text: 'Other', icon: <AddBoxIcon />, href: '/admin/other1' },
          { text: 'Other', icon: <AddBoxIcon />, href: '/admin/other2' },
        ].map((item) => (
          <ListItem

            key={item.text}
            component={Link}
            href={item.href}
            sx={{
              backgroundColor: item.text === 'Dashboard' ? '#0088cc' : 'transparent',
              '&:hover': {
                backgroundColor: item.text === 'Dashboard' ? '#0088cc' : 'rgba(255, 255, 255, 0.08)',
              },
              borderRadius: '4px',
              mx: 1,
              my: 0.5,
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', mt: 2, pt: 2 }}>
        <List>
          {[
            { text: 'Notification', icon: <NotificationsIcon />, href: '/admin/notifications' },
            { text: 'Setting', icon: <SettingsIcon />, href: '/admin/settings' },
            { text: 'Login as Book Owner', icon: <PersonIcon />, href: '/login/owner' },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              href={item.href}
              sx={{
                borderRadius: '4px',
                mx: 1,
                my: 0.5,
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2, mt: 'auto' }}>
        <Button
          variant="contained"
          startIcon={<ExitToAppIcon />}
          fullWidth
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: 279,
            boxSizing: 'border-box',
            backgroundColor: '#171B36',
            color: 'white',
            borderRadius: "15px",
            overflowX: 'hidden',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={isMobile}
        onClose={() => {/* Add close handler */ }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#171B36',
            color: 'white',
            borderRadius: "15px",
            overflow: 'hidden',
          },
        }}
      >
        {drawerContent}
      </Drawer >
    </>
  );
};

export default Sidebar;

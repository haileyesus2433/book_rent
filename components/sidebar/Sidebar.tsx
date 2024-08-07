"use client";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import {
  Box, Button, Drawer, IconButton, List,
  ListItem,
  ListItemIcon,
  ListItemText, Typography, useMediaQuery, useTheme
} from "@mui/material";
import Link from "next/link";
import BookIcon from "../BookIcon";


interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarMenuClick?: any;
  isSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
}


const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarMenuClick,
  isSidebarOpen,
  onSidebarClose
}: ItemType) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const sidebarWidth = "270px";

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          borderRadius: "15px",
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxShadow: "0 9px 17.5px rgb(0,0,0,0.05)",
              width: sidebarWidth,
              boxSizing: "border-box",
              borderRight: 0,
              top: 20,
              left: 20,
              bottom: 20,
              borderRadius: "15px",
              height: "calc(100% - 40px)",
              backgroundColor: '#171B36',
              color: 'white',
              overflowX: "hidden"
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
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
                onClick={() => onSidebarMenuClick((previous: any) => !previous)}
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
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


            </Box>
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
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
          backgroundColor: '#171B36',
          color: 'white',
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
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
          onClick={() => onSidebarMenuClick((prev: any) => !prev)}
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
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
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
    </Drawer>
  );
};

export default Sidebar;

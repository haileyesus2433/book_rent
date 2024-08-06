'use client'

import { Box, CircularProgress } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
  },
})

const Spinner: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    </ThemeProvider>
  )
}

export default Spinner

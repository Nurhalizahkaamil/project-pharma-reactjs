import React from 'react';
import { Box, Button, Typography, Container, Link } from '@mui/material';
import welcomeinventory from 'assets/welcomeinv.png';

const WelcomePage: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh',
        backgroundColor: '#f9fafc',
        padding: 0, // Removed padding to make it full width
        margin: 0, // Ensure no margin
      }}
    >
      {/* Text Section */}
      <Box
        sx={{
          padding: { xs: '1rem', md: '2rem' },
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#0277BD',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          INVENTORY SYSTEM APPLICATIONS
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/authentication/sign-in"
          color="success"
          size="large"
          sx={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
        >
          Get Started
        </Button>
      </Box>

      {/* Illustration Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          marginTop: { xs: '2rem', md: '0' },
        }}
      >
        <img src={welcomeinventory} alt="icon-key" style={{ width: '70%', marginBottom: '30px' }} />
      </Box>
    </Container>
  );
};

export default WelcomePage;

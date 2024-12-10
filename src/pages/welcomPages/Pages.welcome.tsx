import React from 'react';
import { Box, Button, Typography, Container, Link } from '@mui/material';
import welcomeinventory from 'assets/welcomeinv.png';
import Rectangle from 'assets/Rectangle.png';
import Rectangle1 from 'assets/Rectangle1.png';

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
        padding: 0,
        margin: 0,
        position: 'relative',
      }}
    >
      {/* Background Triangles behind welcomeinventory */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-70%', // Posisi di bagian bawah
          right: '-35%', // Posisi di bagian kanan
          zIndex: 0, // Pastikan berada di belakang
          transform: 'translate(-50%, -50%)', // Mengatur posisi ke tengah
        }}
      >
        <img src={Rectangle} alt="Background triangle" style={{ width: '950px', height: 'auto' }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%', // Posisi di bagian bawah
          right: '-2%', // Posisi di bagian kanan
          zIndex: 1, // Pastikan berada di belakang
        }}
      >
        <img
          src={Rectangle1}
          alt="Background triangle"
          style={{ width: '800px', height: 'auto' }}
        />
      </Box>

      {/* Text Section */}
      <Box
        sx={{
          padding: { xs: '1rem', md: '6rem' },
          flexBasis: '50%',
          zIndex: 1, // Pastikan elemen ini berada di atas
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: '#0277BD',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          MEDICAL PHARMACY INVENTORY APPLICATIONS
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/authentication/sign-in"
          color="success"
          size="large"
          sx={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '20px', // Membuat sudut melengkung
            backgroundColor: '#76C893', // Warna hijau (bisa disesuaikan)
            color: '#fff', // Mengubah warna teks menjadi putih
            '&:hover': {
              backgroundColor: '#45a049', // Warna hijau lebih gelap saat di-hover
            },
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Illustration Section */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-7%', // Posisi di bagian bawah
          right: '-15%', // Posisi di bagian kanan
          zIndex: 2, // Pastikan elemen ini berada di atas
        }}
      >
        <img
          src={welcomeinventory}
          alt="Welcome Illustration"
          style={{ width: '73%', height: 'auto' }}
        />
      </Box>
    </Container>
  );
};

export default WelcomePage;

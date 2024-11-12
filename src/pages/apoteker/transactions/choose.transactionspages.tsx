import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import CommonTransactionsImage from '/src/assets/general.png';
import PrescriptionTransactionsImage from '/src/assets/prescription.png';
import paths from 'routes/paths';

const ChooseTransactionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '20px',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
        Choose Transactions
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#888', mb: 4, textAlign: 'center' }}>
        Select the transaction you want
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* General Transactions Card */}
        <Card
          sx={{
            width: { xs: '100%', md: '350px' },
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(180deg, #A0E7FF 0%, #B5EAEA 100%)',
            borderRadius: '15px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'visible',
            mx: { xs: 0, md: 2 },
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Generic Transactions
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#007bff',
                borderRadius: '20px',
                textTransform: 'none',
                px: 4,
              }}
              onClick={() => handleNavigate(paths.generictransaction)}
            >
              Choose
            </Button>
          </CardContent>
          <Box
            component="img"
            src={CommonTransactionsImage}
            alt="Common Transactions Illustration"
            sx={{
              position: 'absolute',
              top: '85%',
              left: '-130px',
              transform: 'translateY(-50%)',
              width: { xs: '100px', md: '120px', lg: '300px' },
              height: 'auto',
              opacity: 0.9,
            }}
          />
        </Card>

        {/* Doctor's Prescription Transactions Card */}
        <Card
          sx={{
            width: { xs: '100%', md: '350px' },
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(180deg, #A0E7FF 0%, #B5EAEA 100%)',
            borderRadius: '15px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            position: 'relative',
            overflow: 'visible',
            mx: { xs: 0, md: 2 },
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Doctor's Prescription Transactions
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#007bff',
                borderRadius: '20px',
                textTransform: 'none',
                px: 4,
              }}
              onClick={() => handleNavigate(paths.prescription)}
            >
              Choose
            </Button>
          </CardContent>
          <Box
            component="img"
            src={PrescriptionTransactionsImage}
            alt="Prescription Transactions Illustration"
            sx={{
              position: 'absolute',
              top: '90%',
              right: '-130px',
              transform: 'translateY(-50%)',
              width: { xs: '100px', md: '120px', lg: '300px' },
              height: 'auto',
              opacity: 0.9,
            }}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default ChooseTransactionPage;

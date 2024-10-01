import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import paths, { rootPaths } from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PasswordTextField from 'components/common/PasswordTextField';
import IconKey from 'assets/iconkey.png'; // Contoh image yang digunakan

const checkBoxLabel = { inputProps: { 'aria-label': 'Checkbox' } };

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    navigate(rootPaths.root);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #9AFEE0 50%, #042BF9 100%)', // Gradien sama dengan Sign In
        padding: 12,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* Left Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'left',
              padding: 5,
              textAlign: 'left',
            }}
          >
            <Typography variant="h1" fontWeight="bold" gutterBottom>
              Sign up for
            </Typography>
            <Typography variant="h3" color="#263238">
              Inventory Applications
            </Typography>
            <Typography mt={4} variant="body1" color="#263238">
              Already have an account?
            </Typography>
            <Typography>
              You can{' '}
              <Link href={paths.signin} underline="hover">
                Sign In here!
              </Link>
            </Typography>
            <img
              src={IconKey}
              alt="icon-key"
              style={{ width: '70%', marginBottom: '30px' }} // Ukuran gambar sesuai dengan yang digunakan
            />
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                borderRadius: '40px',
                boxShadow: 4,
                backgroundColor: 'white', // Warna background sama dengan Sign In
                maxWidth: '400px',
                margin: '0 auto',
                minHeight: '400px',
              }}
            >
              <Typography variant="body1" gutterBottom>
                Welcome to Inventory Applications
              </Typography>
              <Typography variant="h1" gutterBottom>
                Sign Up
              </Typography>

              <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                    fullWidth
                    required
                    label="Enter your name"
                    InputLabelProps={{
                      style: { fontSize: '12px' }, // Ukuran font untuk label
                    }}
                    InputProps={{
                      style: { fontSize: '12px' }, // Ukuran font untuk input
                    }}
                  />

                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    fullWidth
                    required
                    label="Enter your email"
                    InputLabelProps={{
                      style: { fontSize: '12px' }, // Ukuran font untuk label
                    }}
                    InputProps={{
                      style: { fontSize: '12px' }, // Ukuran font untuk input
                    }}
                  />

                  <PasswordTextField
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    fullWidth
                    required
                    label="Enter your password"
                    InputLabelProps={{
                      style: { fontSize: '12px' }, // Ukuran font untuk label
                    }}
                    InputProps={{
                      style: { fontSize: '12px' }, // Ukuran font untuk input
                    }}
                  />
                </Stack>

                <FormControlLabel
                  control={<Checkbox {...checkBoxLabel} color="primary" />}
                  label={
                    <Typography variant="subtitle2" whiteSpace="nowrap">
                      Accept{' '}
                      <Link href="#!" underline="hover" sx={{ fontWeight: 'fontWeightBold' }}>
                        terms
                      </Link>{' '}
                      &{' '}
                      <Link href="#!" underline="hover" sx={{ fontWeight: 'fontWeightBold' }}>
                        privacy policy
                      </Link>
                    </Typography>
                  }
                  sx={{ mt: 2 }}
                />

                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: '8px',
                    backgroundColor: '#76C893', // Warna tombol sama dengan Sign In
                    '&:hover': { backgroundColor: '#45a049' },
                  }}
                  fullWidth
                >
                  Sign Up
                </Button>

                <Divider sx={{ my: 2 }}>OR</Divider>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<IconifyIcon icon="flat-color-icons:google" />}
                  fullWidth
                  sx={{
                    color: '#db4437', // Warna Google merah
                    borderColor: '#db4437',
                    mb: 2,
                  }}
                >
                  Sign up with Google
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUp;

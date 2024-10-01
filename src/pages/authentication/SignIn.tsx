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
import IconKey from 'assets/iconkey.png';

const checkBoxLabel = { inputProps: { 'aria-label': 'Checkbox' } };

const SignIn = () => {
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
        background: 'linear-gradient(to bottom, #9AFEE0 50%, #042BF9 100%)', // Match gradient with reference
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
              Sign in to
            </Typography>
            <Typography variant="h3" color="#263238">
              Inventory Applications
            </Typography>
            <Typography mt={4} variant="body1" color="#263238">
              If you don't have an account register
            </Typography>
            <Typography>
              You can.{' '}
              <Link href={paths.signup} underline="hover">
                Sign Up here!
              </Link>
            </Typography>
            <img
              src={IconKey}
              alt="icon-key"
              style={{ width: '70%', marginBottom: '30px' }} // Image size adjusted
            />
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                borderRadius: '40px',
                boxShadow: 4,
                backgroundColor: 'white', // Matches card background
                maxWidth: '400px',
                margin: '0 auto',
                minHeight: '300px',
              }}
            >
              <Typography variant="body1" gutterBottom>
                Welcome to Inventory Applications
              </Typography>
              <Typography variant="h1" gutterBottom>
                Sign In
              </Typography>

              <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    id="email"
                    name="email&username"
                    type="text"
                    placeholder="Username or email"
                    autoComplete="email"
                    fullWidth
                    required
                    label="Enter your username or email address" // Match placeholder text from reference
                    InputLabelProps={{
                      style: { fontSize: '14px' }, // Ukuran font untuk label
                    }}
                    InputProps={{
                      style: { fontSize: '14px' }, // Ukuran font untuk input text
                    }}
                  />

                  <PasswordTextField
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    fullWidth
                    required
                    label="Enter your password" // Label added for clarity
                    InputLabelProps={{
                      style: { fontSize: '14px' }, // Ukuran font untuk label
                    }}
                    InputProps={{
                      style: { fontSize: '14px' }, // Ukuran font untuk input text
                    }}
                  />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                  <FormControlLabel
                    control={<Checkbox {...checkBoxLabel} color="primary" />}
                    label={<Typography variant="subtitle1">Remember me</Typography>}
                  />
                  <Link href="#!" underline="hover">
                    Forgot Password
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: '8px',
                    backgroundColor: '#76C893', // Match button color
                    '&:hover': { backgroundColor: '#45a049' },
                  }}
                  fullWidth
                >
                  Sign In
                </Button>

                <Divider sx={{ my: 2 }}>OR</Divider>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<IconifyIcon icon="flat-color-icons:google" />}
                  fullWidth
                  sx={{
                    color: '#db4437', // Google red
                    borderColor: '#db4437',
                    mb: 2,
                  }}
                >
                  Sign in with Google
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignIn;

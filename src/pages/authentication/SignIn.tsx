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
  Alert, // Import Alert component for error messages
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths, { rootPaths } from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PasswordTextField from 'components/common/PasswordTextField';
import IconKey from 'assets/iconkey.png';
import { loginUser } from 'service/auth.service';

const checkBoxLabel = { inputProps: { 'aria-label': 'Checkbox' } };

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for storing error message
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password); // Call login service

      if (data.accessToken) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('accessToken', data.accessToken);
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('Incorrect username or password'); // Display error message
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #9AFEE0 50%, #042BF9 100%)',
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
            <img src={IconKey} alt="icon-key" style={{ width: '70%', marginBottom: '30px' }} />
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                borderRadius: '40px',
                boxShadow: 4,
                backgroundColor: 'white',
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

              {/* Display error message */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" sx={{ mt: 3 }} onSubmit={handleLogin}>
                <Stack spacing={2}>
                  <TextField
                    id="email"
                    name="email&username"
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username or email"
                    autoComplete="email"
                    fullWidth
                    required
                    label="Enter your username or email address"
                    InputLabelProps={{ style: { fontSize: '14px' } }}
                    InputProps={{ style: { fontSize: '14px' } }}
                  />

                  <PasswordTextField
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    fullWidth
                    required
                    label="Enter your password"
                    InputLabelProps={{ style: { fontSize: '14px' } }}
                    InputProps={{ style: { fontSize: '14px' } }}
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
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: '8px',
                    backgroundColor: '#76C893',
                    '&:hover': { backgroundColor: '#45a049' },
                    color: 'white',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 'bold',
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
                    color: '#db4437',
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

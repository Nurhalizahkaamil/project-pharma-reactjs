import { Typography } from '@mui/material';

const Footer = () => {
  return (
    <Typography
      variant="body2"
      component="footer"
      sx={{ pt: 3.75, textAlign: { xs: 'center', md: 'center' } }}
    >
      © Copyright by MedPia {new Date().getFullYear()}{' '}
    </Typography>
  );
};

export default Footer;

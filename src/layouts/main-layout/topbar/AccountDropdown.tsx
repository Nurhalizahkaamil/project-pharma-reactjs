import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import Profile from 'assets/image.png'; // Example profile image
import IconifyIcon from 'components/base/IconifyIcon';

const menuItems = [
  {
    id: 0,
    label: 'My Account',
    icon: 'material-symbols:account-box-sharp',
  },
];

const AccountDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ px: { xs: 1, sm: 2 }, minWidth: 'auto' }}
      >
        <Avatar
          sx={{
            width: { xs: 45, sm: 50 },
            height: { xs: 45, sm: 50 },
            borderRadius: '50%',
            objectFit: 'cover',
            mr: { xs: 0, xl: 2.5 },
          }}
          alt="User Profile"
          src={Profile}
          variant="circular"
        />
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          '& .MuiMenu-paper': {
            width: 280,
            bgcolor: 'common.white',
          },
        }}
      >
        <Box p={3}>
          <Typography variant="subtitle1" color="text.primary">
            User Profile
          </Typography>
          <Stack direction="row" py={2.5} spacing={1.5} alignItems="center">
            <Avatar src={Profile} alt="Profile Image" sx={{ width: 65, height: 65 }} />
            <Box>
              <Typography variant="subtitle2" color="text.primary" fontWeight={600}>
                Musfiq
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Admin
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <IconifyIcon icon="majesticons:mail-line" />
                info@example.com
              </Typography>
            </Box>
          </Stack>
          <Divider />
        </Box>

        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem.id} onClick={handleClose}>
            <ListItemIcon>
              <IconifyIcon icon={menuItem.icon} sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <Typography variant="body1">{menuItem.label}</Typography>
          </MenuItem>
        ))}

        <Box mt={1.25} p={2}>
          <Button onClick={handleClose} variant="outlined" color="error" fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default AccountDropdown;

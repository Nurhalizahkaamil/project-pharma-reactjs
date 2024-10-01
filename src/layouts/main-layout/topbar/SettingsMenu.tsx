import { Button, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import { useState, MouseEvent } from 'react';
import IconifyIcon from 'components/base/IconifyIcon';

const SettingsMenu = () => {
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
        aria-controls={open ? 'settings-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ p: 1, minWidth: 'auto', borderRadius: '50%' }}
      >
        <IconifyIcon icon="ph:gear-six" fontSize={24} color="text.primary" />
      </Button>

      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="fluent:settings-20-regular" />
          </ListItemIcon>
          <Typography variant="body1">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="ic:twotone-help-outline" />
          </ListItemIcon>
          <Typography variant="body1">Help</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SettingsMenu;

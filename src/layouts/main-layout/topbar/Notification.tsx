import { Badge, Button } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const Notification = () => {
  return (
    <Button
      aria-label="notifications"
      sx={{
        bgcolor: 'background.paper',
        p: 1,
        minWidth: 'auto',
        borderRadius: '50%',
        boxShadow: 1,
      }}
    >
      <Badge
        badgeContent=" "
        variant="dot"
        color="error"
        sx={{
          '& .MuiBadge-dot': {
            width: 10,
            height: 10,
            bgcolor: 'error.main',
          },
        }}
      >
        <IconifyIcon
          icon="clarity:notification-line"
          sx={{ fontSize: 24, color: 'text.primary' }}
        />
      </Badge>
    </Button>
  );
};

export default Notification;

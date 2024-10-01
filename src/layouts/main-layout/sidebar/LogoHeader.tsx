import { Link, Stack, SxProps, Typography } from '@mui/material';
import { rootPaths } from 'routes/paths';

interface LogoHeaderProps {
  sx?: SxProps;
}
const LogoHeader = (props: LogoHeaderProps) => {
  return (
    <Stack
      direction="row"
      alignItems="left"
      columnGap={2}
      component={Link}
      href={rootPaths.root}
      {...props}
    >
      <Typography variant="h3" color="primary.darker">
        Inventory System
      </Typography>
    </Stack>
  );
};

export default LogoHeader;

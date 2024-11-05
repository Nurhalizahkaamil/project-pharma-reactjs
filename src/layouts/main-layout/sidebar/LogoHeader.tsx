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
      columnGap={1}
      component={Link}
      href={rootPaths.root}
      sx={{ mt: 5, ...props.sx }} // mt: 5 untuk margin top, lebih bawah
    >
      <Typography variant="h4" color="#FFFFFF">
        INVENTORY SYSTEM
      </Typography>
    </Stack>
  );
};

export default LogoHeader;

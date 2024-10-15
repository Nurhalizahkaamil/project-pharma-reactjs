import { Box, BoxProps } from '@mui/material';
import { Icon, IconProps } from '@iconify/react';

interface IconifyProps extends Omit<BoxProps, 'component'> {
  icon: IconProps['icon'];
}

const IconifyIcon = ({ icon, ...rest }: IconifyProps) => {
  return (
    <Box {...rest}>
      <Icon icon={icon} />
    </Box>
  );
};

export default IconifyIcon;

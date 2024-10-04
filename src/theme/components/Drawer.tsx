import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const Drawer: Components<Omit<Theme, 'components'>>['MuiDrawer'] = {
  styleOverrides: {
    paper: {
      borderRadius: 10,
      borderRight: 0,
      backgroundColor: '#0077B6', // Set the background color here
    },
  },
};

export default Drawer;

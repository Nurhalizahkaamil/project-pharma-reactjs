import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const ListItemIcon: Components<Omit<Theme, 'components'>>['MuiListItemIcon'] = {
  styleOverrides: {
    root: {
      minWidth: 'auto',
      color: '#FFFFFF !important', // Warna default putih

      '&:hover': {
        color: '#B8BDD7 !important', // Warna biru saat hover
      },

      '&.Mui-selected': {
        color: '#2196F3 !important', // Warna biru saat selected
      },
    },
  },
};

export default ListItemIcon;

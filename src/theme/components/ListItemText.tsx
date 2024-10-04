import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const ListItemText: Components<Omit<Theme, 'components'>>['MuiListItemText'] = {
  defaultProps: { disableTypography: true },
  styleOverrides: {
    root: ({ theme }) => ({
      margin: 0,
      fontSize: theme.typography.fontSize - 1.5,
      fontWeight: theme.typography.fontWeightBold,
      fontFamily: 'Poppins, sans-serif',
      color: '#FFFFFF !important',

      // Change color on hover
      '&:hover': {
        color: '#2196F3 !important',
      },

      // Change color when selected
      '&.Mui-selected': {
        color: '#2196F3 !important',
      },
    }),
  },
};

export default ListItemText;

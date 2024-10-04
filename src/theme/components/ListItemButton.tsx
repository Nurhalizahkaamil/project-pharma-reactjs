import { Components, Theme } from '@mui/material';

const ListItemButton: Components<Omit<Theme, 'components'>>['MuiListItemButton'] = {
  styleOverrides: {
    gutters: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 2,

      // Default state (non-selected)
      backgroundColor: 'transparent', // No background color for unselected
      color: theme.palette.text.primary, // Default text color

      // Make the button stretch to the full width of the sidebar
      width: '100%', // Full width of the sidebar

      // Hover state for all items
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // White with 70% opacity on hover
        color: '#2196F3 !important', // Change text color to blue on hover
      },

      // Selected state
      '&.Mui-selected': {
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // White with 70% opacity when selected
        color: '#2196F3 !important', // Change text color to blue when selected

        // Hover state when selected
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Maintain the same background color on hover when selected
          color: '#2196F3 !important', // Maintain blue text color on hover when selected
        },
      },
    }),
  },
};

export default ListItemButton;

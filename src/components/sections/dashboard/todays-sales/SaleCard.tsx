import { Card, CardContent, Typography, Box } from '@mui/material';
import { SaleItem } from 'data/sales';

const SaleCard = ({ item }: { item: SaleItem }) => {
  const { value, label } = item;

  return (
    <Card
      sx={{
        borderRadius: 2,
        backgroundColor: '#E8F4FD', // Light blue background for the card
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)', // Softer shadow
        width: '250px', // Adjusted width for the card
        height: '150px',
        position: 'relative', // Allow absolute positioning of child elements
        padding: 2,
      }}
    >
      <CardContent sx={{ textAlign: 'left', padding: '16px' }}>
        {/* Use flex for label and "Today" position */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" color="primary.main" fontWeight={600}>
            {label}
          </Typography>

          {/* Positioning the "Today" label */}
          <Box
            sx={{
              backgroundColor: '#F3F8FD', // Lighter background for "Today"
              padding: '4px 8px', // Padding for the box
              borderRadius: 1, // Rounded corners
              boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', // Subtle shadow for the box
              color: 'primary.main', // Blue color for the "Today" label
              fontSize: '0.75rem', // Smaller font size for "Today"
              fontWeight: 500, // Medium font weight
              marginLeft: '16px', // Space between label and "Today"
            }}
          >
            Today
          </Box>
        </Box>

        {/* Center the value below the label */}
        <Typography variant="h4" color="primary.dark" textAlign="center" marginTop={2}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SaleCard;

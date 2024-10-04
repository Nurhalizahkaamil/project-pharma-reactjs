import { Card, CardContent, Typography, Box } from '@mui/material';
import { SaleItem } from 'data/sales';

const SaleCard = ({ item }: { item: SaleItem }) => {
  const { value, label } = item;

  return (
    <Card
      sx={{
        borderRadius: 2,
        backgroundColor: '#A0CCD6', // Light blue background for the card
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)', // Softer shadow
        width: '100%', // Use full width for responsiveness
        height: '120px', // Keep the same height
        padding: 1.5, // Reduced padding
        margin: '12px', // Reduced margin
      }}
    >
      <CardContent sx={{ textAlign: 'left', padding: '12px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h6" color="#656575" fontWeight={600} sx={{ fontSize: '14px' }}>
            {label}
          </Typography>
          {/* Ensure Today label is visible */}
          <Box
            sx={{
              backgroundColor: '#F3F8FD', // Lighter background for "Today"
              padding: '2px 6px', // Reduced padding for the box
              borderRadius: 1, // Rounded corners
              boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)', // Subtle shadow for the box
              color: 'primary.main', // Blue color for the "Today" label
              fontSize: '0.6rem', // Smaller font size for "Today"
              fontWeight: 300, // Medium font weight
              marginLeft: '12px', // Space between label and "Today"
              alignSelf: 'flex-start', // Align "Today" label to the top
            }}
          >
            Today
          </Box>
        </Box>
        {/* Center the value below the label */}
        <Typography variant="h3" color="primary.dark" textAlign="center" marginTop={2}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SaleCard;

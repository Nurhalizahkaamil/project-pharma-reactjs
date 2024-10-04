import { Typography, Grid, Paper, Stack, Button } from '@mui/material';
import { sales } from 'data/sales';
import SaleCard from './SaleCard';

const Sales = () => {
  return (
    <Paper
      sx={{
        pt: 4,
        pb: 6,
        px: 4,
        backgroundColor: '#F9F9F9',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <div>
          <Typography variant="h5" mb={0.5} color="primary.dark">
            Overview
          </Typography>
        </div>
        <Button variant="outlined">Export</Button>
      </Stack>

      <Grid
        container
        spacing={2} // Jarak antar grid item (cards)
        columns={12.5} // Adjust grid to have 12 columns for better control
      >
        {sales.map((item) => (
          <Grid
            item
            xs={12} // Full width on extra small screens
            sm={6} // Two items per row on small screens
            md={4} // Three items per row on medium screens
            key={item.label}
          >
            <SaleCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Sales;

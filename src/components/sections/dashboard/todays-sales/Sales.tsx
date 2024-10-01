import { Typography, Grid, Paper, Stack, Button } from '@mui/material';
import { sales } from 'data/sales';
import SaleCard from './SaleCard';

const Sales = () => {
  return (
    <Paper sx={{ pt: 4, pb: 6, px: 4, backgroundColor: '#F8FBFF' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <div>
          <Typography variant="h5" mb={0.5} color="primary.dark">
            Overview
          </Typography>
        </div>
        <Button variant="outlined">Export</Button>
      </Stack>

      <Grid container spacing={2} columns={10}>
        {sales.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.label}>
            <SaleCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Sales;

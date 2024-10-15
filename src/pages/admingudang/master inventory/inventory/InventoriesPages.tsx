import React from 'react';
import { Box } from '@mui/material';
import CreateInventoriesButton from './CreateInventory';
import InventoriesTable from './TableInventory';
//import Search from 'components/common/Search'; // Sesuaikan import sesuai struktur proyekmu

const InventoriesPage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        {/* <Search size="small" sx={{ maxWidth: 400 }} /> */}
        <CreateInventoriesButton />
      </Box>
      <InventoriesTable />
    </Box>
  );
};

export default InventoriesPage;

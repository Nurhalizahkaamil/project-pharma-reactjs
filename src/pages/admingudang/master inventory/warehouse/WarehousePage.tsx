import React from 'react';
import { Box } from '@mui/material';
import CreateWarehouseButton from './CreateWarehouse';
import WarehouseTable from './TableWarehouse';
//import Search from 'components/common/Search'; // Sesuaikan import sesuai struktur proyekmu

const WarehousePage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        {/* <Search size="small" sx={{ maxWidth: 400 }} /> */}
        <CreateWarehouseButton />
      </Box>
      <WarehouseTable />
    </Box>
  );
};

export default WarehousePage;

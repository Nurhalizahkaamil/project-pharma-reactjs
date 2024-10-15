import React from 'react';
import { Box } from '@mui/material';
import UnitsTable from './TableUnits';
import CreateUnitButton from './CreateUnits';
//import Search from 'components/common/Search'; // Sesuaikan import sesuai struktur proyekmu

const UnitsPage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        {/* <Search size="small" sx={{ maxWidth: 400 }} /> */}
        <CreateUnitButton />
      </Box>
      <UnitsTable />
    </Box>
  );
};

export default UnitsPage;

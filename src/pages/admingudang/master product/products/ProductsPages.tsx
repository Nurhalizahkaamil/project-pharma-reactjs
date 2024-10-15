import React from 'react';
import { Box } from '@mui/material';
import CreateProductButton from './CreateProduct';
import ProductTable from './TableProduct';
//import Search from 'components/common/Search'; // Sesuaikan import sesuai struktur proyekmu

const ProductsPage = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        {/* <Search size="small" sx={{ maxWidth: 400 }} /> */}
        <CreateProductButton />
      </Box>
      <ProductTable />
    </Box>
  );
};

export default ProductsPage;

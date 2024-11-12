import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CreateProductButton from './CreateProduct';
import ProductsTable from './TableProduct';
import { ProductDtoOut } from 'Dto/product/product.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { deleteProduct, getProducts } from 'service/product.service';
import { toast } from 'react-hot-toast';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState<ProductDtoOut[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchDataPage = async () => {
    try {
      const params: BaseDto = {
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchTerm,
      };

      const productsResponse = await getProducts(params);

      if (productsResponse && productsResponse.data && Array.isArray(productsResponse.data)) {
        const totalItemsNumber = productsResponse.metadata?.total || 0;
        const totalPagesNumber = productsResponse.metadata?.totalPages || 0;

        setTotalItems(totalItemsNumber);
        setTotalPages(totalPagesNumber);
        setTableData(productsResponse.data);
      } else {
        console.error('Unexpected response format for products:', productsResponse);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, searchTerm, itemsPerPage]);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully');

      // Re-fetch data to reflect the deletion
      fetchDataPage();
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <CreateProductButton />
      </Box>
      <ProductsTable
        tableData={tableData}
        handleDelete={handleDelete}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handleEdit={() => {
          throw new Error('Function not implemented.');
        }}
      />
    </Box>
  );
};

export default ProductsPage;

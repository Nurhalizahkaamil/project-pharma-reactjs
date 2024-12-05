import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CreateInventoriesButton from './CreateInventory';
import InventoriesTable from './TableInventory';
import { InventoryDtoOut } from 'Dto/inventories/inventory.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { getInventories, getProducts } from 'service/inventory.service';
import toast from 'react-hot-toast';
//import Search from 'components/common/Search'; // Sesuaikan import sesuai struktur proyekmu

const InventoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm] = useState('');
  const [tableData, setTableData] = useState<InventoryDtoOut[]>([]);
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

      const [inventoriesResponse, productsResponse] = await Promise.all([
        getInventories(params),
        getProducts(),
      ]);

      // Log respons API untuk debugging
      console.log('Inventories Response:', inventoriesResponse);
      console.log('Products Response:', productsResponse);

      if (
        inventoriesResponse &&
        inventoriesResponse.data &&
        Array.isArray(inventoriesResponse.data) &&
        productsResponse &&
        productsResponse.data
      ) {
        // Create a map of product IDs to names
        const productMap = new Map(
          productsResponse.data.map((product) => [product.id, product.name]),
        );

        // Update tableData with product names for each inventory item
        const updatedTableData = inventoriesResponse.data.map((inventory) => ({
          ...inventory,
          items: inventory.items.map((item) => ({
            ...item,
            productName: productMap.get(item.productId) || 'Unknown Product', // Access product name with item.productId
          })),
        }));

        // Update total items from response meta data, not length of data
        setTotalItems(inventoriesResponse.meta?.totalItems || 0); // Ensure totalItems comes from response meta data
        setTotalPages(Math.ceil(inventoriesResponse.meta?.totalItems / itemsPerPage)); // Calculate total pages based on totalItems

        // Debugging: log updated table data to check product names
        console.log('Updated Table Data:', updatedTableData);

        setTableData(updatedTableData);
      } else {
        console.error(
          'Unexpected response format for inventories or products:',
          inventoriesResponse,
        );
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching inventories or products:', error);
      toast.error('Failed to fetch inventories');
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, searchTerm, itemsPerPage]);

  const handleDelete = async (id: number) => {
    console.log('Delete:', id);
    // Implement delete logic here
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <CreateInventoriesButton />
      </Box>
      <InventoriesTable
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

export default InventoriesPage;

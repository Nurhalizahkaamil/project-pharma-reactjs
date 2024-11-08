import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CreateWarehousesButton from './CreateWarehouse';
import WarehousesTable from './TableWarehouse';
import { WarehouseDtoOut } from 'Dto/warehousesDto/warehouses.dto';
import { BaseDto } from 'Dto/Base/base.dto';
import { getWarehouses, getSuppliers } from 'service/warehouses.service';
import { toast } from 'react-hot-toast';

const WarehousesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm] = useState('');
  const [tableData, setTableData] = useState<WarehouseDtoOut[]>([]);
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

      const [warehousesResponse, suppliersResponse] = await Promise.all([
        getWarehouses(params),
        getSuppliers(),
      ]);

      // Log respons API untuk debugging
      console.log('Warehouses Response:', warehousesResponse);
      console.log('Suppliers Response:', suppliersResponse);

      if (
        warehousesResponse &&
        warehousesResponse.data &&
        Array.isArray(warehousesResponse.data) &&
        suppliersResponse &&
        suppliersResponse.data
      ) {
        // Create a map of supplier IDs to names
        const supplierMap = new Map(
          suppliersResponse.data.map((supplier) => [supplier.id, supplier.name]),
        );

        // Update tableData with supplier names
        const updatedTableData = warehousesResponse.data.map((warehouse) => ({
          ...warehouse,
          supplierName: supplierMap.get(warehouse.supplierId) || 'Unknown Supplier',
        }));

        // Set total items and total pages based on the length of the data array
        setTotalItems(updatedTableData.length); // Set total items to the length of updated data
        setTotalPages(Math.ceil(updatedTableData.length / itemsPerPage)); // Calculate total pages

        // Debugging: log updated table data to check supplier names
        console.log('Updated Table Data:', updatedTableData);

        setTableData(updatedTableData);
      } else {
        console.error('Unexpected response format for warehouses:', warehousesResponse);
        setTableData([]);
      }
    } catch (error) {
      console.error('Error fetching warehouses or suppliers:', error);
      toast.error('Failed to fetch warehouses');
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
        <CreateWarehousesButton />
      </Box>
      <WarehousesTable
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

export default WarehousesPage;

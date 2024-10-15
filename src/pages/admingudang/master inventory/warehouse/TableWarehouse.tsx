import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TableFooter,
  TablePagination,
} from '@mui/material';
import axios from 'axios';

// Definisikan interface untuk Warehouse
interface Warehouse {
  id: string;
  name: string;
  description: string;
  status: string;
}

const WarehouseTable = () => {
  const [warehouse, setWarehouse] = useState<Warehouse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get('/api/warehouse'); // Ganti dengan endpoint API Anda
        setWarehouse(response.data);  // Perbaikan: setWarehouse, bukan memanggil fetchWarehouse lagi
        setTotalItems(response.data.length); // Set total items
      } catch (error) {
        console.error('Error fetching Warehouse:', error);
      }
    };

    fetchWarehouse(); // Panggil fungsi tanpa argumen
  }, []);

  const handleEdit = (_id: string) => {
    // Logika untuk edit warehouse
  };

  const handleDelete = (id: string) => {
    // Logika untuk delete warehouse
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warehouse.length > 0 ? (
            warehouse
              .slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
              .map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell>{warehouse.id}</TableCell>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>{warehouse.description}</TableCell>
                  <TableCell>{warehouse.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(warehouse.id)}>Edit</Button>
                    <Button onClick={() => handleDelete(warehouse.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">
                <Typography>No Warehouse available.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={totalItems}
              page={currentPage}
              onPageChange={handlePageChange}
              rowsPerPage={itemsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default WarehouseTable;

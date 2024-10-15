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

// Definisikan interface untuk Inventories
interface Inventories {
  id: string;
  name: string;
  description: string;
  status: string;
}

const InventoriesTable = () => {
  const [inventories, setInventories] = useState<Inventories[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get('/api/inventories'); // Ganti dengan endpoint API Anda
        setInventories(response.data);  // Perbaikan: setInventories, bukan memanggil fetchInventories lagi
        setTotalItems(response.data.length); // Set total items
      } catch (error) {
        console.error('Error fetching Inventories:', error);
      }
    };

    fetchInventories(); // Panggil fungsi tanpa argumen
  }, []);

  const handleEdit = (_id: string) => {
    // Logika untuk edit inventories
  };

  const handleDelete = (id: string) => {
    // Logika untuk delete inventories
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
          {inventories.length > 0 ? (
            inventories
              .slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
              .map((inventories) => (
                <TableRow key={inventories.id}>
                  <TableCell>{inventories.id}</TableCell>
                  <TableCell>{inventories.name}</TableCell>
                  <TableCell>{inventories.description}</TableCell>
                  <TableCell>{inventories.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(inventories.id)}>Edit</Button>
                    <Button onClick={() => handleDelete(inventories.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">
                <Typography>No Inventories available.</Typography>
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

export default InventoriesTable;

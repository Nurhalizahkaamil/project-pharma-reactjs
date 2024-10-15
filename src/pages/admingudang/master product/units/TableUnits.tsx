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

interface Unit {
  id: string;
  name: string;
  description: string;
  status: string;
}

const UnitsTable = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('/api/units'); // Ganti dengan endpoint API Anda
        setUnits(response.data);
        setTotalItems(response.data.length); // Set total items
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    fetchUnits();
  }, []);

  const handleEdit = (_id: string) => {
    // Logika untuk edit
  };

  const handleDelete = (_id: string) => {
    // Logika untuk delete
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
          {units.length > 0 ? (
            units
              .slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
              .map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell>{unit.id}</TableCell>
                  <TableCell>{unit.name}</TableCell>
                  <TableCell>{unit.description}</TableCell>
                  <TableCell>{unit.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(unit.id)}>Edit</Button>
                    <Button onClick={() => handleDelete(unit.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography>No units available.</Typography>
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

export default UnitsTable;

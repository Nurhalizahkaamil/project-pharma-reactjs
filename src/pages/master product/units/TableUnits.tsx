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
} from '@mui/material';
import axios from 'axios';

interface Unit {
  id: string; // Ganti dengan tipe yang sesuai
  name: string;
  description: string;
  status: string;
}

const UnitsTable = () => {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('/api/units'); // Ganti dengan endpoint API Anda
        setUnits(response.data);
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    fetchUnits();
  }, []);

  const handleEdit = (id: string) => {
    // Logika untuk edit
  };

  const handleDelete = (id: string) => {
    // Logika untuk delete
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">ID</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Description</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Status</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {units.length > 0 ? (
            units.map((unit) => (
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
      </Table>
    </TableContainer>
  );
};

export default UnitsTable;

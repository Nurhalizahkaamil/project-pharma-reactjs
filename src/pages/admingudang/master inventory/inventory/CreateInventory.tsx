import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';

const CreateInventoriesButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('Button clicked!'); // Debugging klik tombol
    navigate(paths.createInventory); // Pastikan rute yang benar
  };
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        marginBottom: 2,
        backgroundColor: '#76C89A', // Ganti dengan kode warna hijau yang diinginkan
        color: 'white', // Warna teks
        fontFamily: 'Poppins',
        '&:hover': {
          backgroundColor: '#66B68A', // Warna saat hover (dapat disesuaikan)
        },
      }}
    >
      + Manage Inventories
    </Button>
  );
};

export default CreateInventoriesButton;

import React from 'react';
import { Button } from '@mui/material';

const CreateProductButton = () => {
  return (
    <Button
      variant="contained"
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
      + Create Product
    </Button>
  );
};

export default CreateProductButton;

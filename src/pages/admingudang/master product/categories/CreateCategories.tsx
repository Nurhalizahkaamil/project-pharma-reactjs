import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths'; // Pastikan Anda mengimpor path yang benar

const CreateCategoriesButton = () => {
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  const handleClick = () => {
    navigate(paths.categories); // Ganti dengan path yang sesuai untuk halaman pembuatan kategori
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick} // Menambahkan penanganan klik
      sx={{
        marginBottom: 2,
        backgroundColor: '#76C89A',
        color: 'white',
        fontFamily: 'Poppins',
        '&:hover': {
          backgroundColor: '#66B68A',
        },
      }}
    >
      + Create Categories
    </Button>
  );
};

export default CreateCategoriesButton;

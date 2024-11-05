import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';

const CreateUnitButton: React.FC = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleClick = () => {
    console.log('Button clicked!'); // Debugging klik tombol
    navigate(paths.createUnits); // Pastikan rute yang benar
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
      + Create Unit
    </Button>
  );
};

export default CreateUnitButton;

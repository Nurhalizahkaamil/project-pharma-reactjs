import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths'; // Pastikan paths terdefinisi dengan benar

const CreateCategoriesButton: React.FC = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleClick = () => {
    console.log('Button clicked!'); // Debugging klik tombol
    navigate(paths.createCategory); // Pastikan rute yang benar
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
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

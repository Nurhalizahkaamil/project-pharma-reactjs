import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';

const CreateDoctorsButton: React.FC = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleClick = () => {
    console.log('Button clicked!'); // Debugging klik tombol
    navigate(paths.createDoctor); //DISINI DIUBAH NIHA AWAS LUPA
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
      + Add Doctors
    </Button>
  );
};

export default CreateDoctorsButton;

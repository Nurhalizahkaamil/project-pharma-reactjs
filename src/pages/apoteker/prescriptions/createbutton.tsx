import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/paths';

const CreatePrescriptionButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('confirm button clicked!');
    navigate(paths.createPrescription); // Adjust this to your actual route for creating a prescription
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        marginBottom: 2,
        backgroundColor: '#76C89A', // Custom green color
        color: 'white',
        fontFamily: 'Poppins',
        '&:hover': {
          backgroundColor: '#66B68A', // Hover color
        },
      }}
    >
      + Accept Prescriptions
    </Button>
  );
};

export default CreatePrescriptionButton;

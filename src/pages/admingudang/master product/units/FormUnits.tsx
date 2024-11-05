import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CreateUnitsDto } from 'Dto/unitsDto/units.dto';
import { createUnits } from 'service/units.service';
import toast from 'react-hot-toast';

const UnitsFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateUnitsDto>({
    name: '',
    description: '', // Include status to satisfy the CreateUnitsDto type
  });

  const [open, setOpen] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async (data: CreateUnitsDto) => {
    try {
      const result = await createUnits(data);
      toast.success('Units created successfully');
      handleClose();
      return result;
    } catch (error) {
      toast.error('Error creating units');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(formData);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/master-product/units');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '16px' },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h1" // Adjust the variant as needed (e.g., h4, h5, h6)
            sx={{
              fontSize: '24px', // Set the desired font size
              color: '#0077B6', // Set the desired text color
              fontFamily: 'poppins', // Change to your desired font family
              fontWeight: 'bold', // Make the text bold if needed
              textAlign: 'left', // Center align the text
              flex: 1, // Ensures that the text takes up space evenly
            }}
          >
            Create New Units
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Units Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Description
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#0077B6',
              color: '#C8C8C8',
              borderRadius: '20px',
              width: '100px', // Set the width of the button
              height: '40px',
              fontSize: '10px', // Set the height of the button
              '&:hover': {
                backgroundColor: '#005f8e', // Slightly darker shade on hover
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UnitsFormPage;

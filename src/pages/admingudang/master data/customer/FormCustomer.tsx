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
import toast from 'react-hot-toast';
import { CreateCustomerDto } from 'Dto/customer/customer.dto';
import { createCustomer } from 'service/customer.service';

const CustomerFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateCustomerDto>({
    name: '',
    age: 0, // Initialize age as a number
    address: '',
  });

  const [open, setOpen] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'age' ? Number(value) : value, // Convert age to a number
    }));
  };

  const handleCreate = async (data: CreateCustomerDto) => {
    try {
      const result = await createCustomer(data);
      toast.success('Customer created successfully');
      handleClose();
      return result;
    } catch (error) {
      toast.error('Error creating customer');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(formData);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/master-data/customers');
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
            variant="h1"
            sx={{
              fontSize: '24px',
              color: '#0077B6',
              fontFamily: 'poppins',
              fontWeight: 'bold',
              textAlign: 'left',
              flex: 1,
            }}
          >
            Create New Customer
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
              placeholder="Add Customer Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Age
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              type="number" // Set input type to number
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Address
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
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
              width: '100px',
              height: '40px',
              fontSize: '10px',
              '&:hover': {
                backgroundColor: '#005f8e',
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

export default CustomerFormPage;

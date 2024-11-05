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
import { CreateDoctorDto } from 'Dto/doctor/doctor.dto';
import { createDoctor } from 'service/doctor.service'; // Ganti dengan createDoctor
import toast from 'react-hot-toast';

const DoctorFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateDoctorDto>({
    name: '',
    specialization: '',
    phoneNumber: '',
    email: '',
  });

  const [open, setOpen] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async (data: CreateDoctorDto) => {
    try {
      const result = await createDoctor(data); // Menggunakan createDoctor
      toast.success('Doctor created successfully');
      handleClose();
      return result;
    } catch (error) {
      toast.error('Error creating doctor');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(formData);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/master-data/doctors');
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
            Create New Doctor
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
              placeholder="Add Doctor Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Specialization
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Phone Number
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Active Email"
              name="email"
              value={formData.email}
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

export default DoctorFormPage;

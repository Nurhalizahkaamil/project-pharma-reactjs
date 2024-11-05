import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom';
import { updateSupplier, getSupplierById } from 'service/supplier.service';
import toast from 'react-hot-toast';

const UpdateSupplierForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    contactNumber: string;
    email: string;
  }>({
    name: '',
    address: '',
    contactNumber: '',
    email: '',
  });

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchSupplier = async () => {
        try {
          const supplier = await getSupplierById(Number(id));
          setFormData({
            name: supplier.name || '',
            address: supplier.address || '',
            contactNumber: supplier.contactNumber || '',
            email: supplier.email || '',
          });
        } catch (error) {
          toast.error('Error fetching supplier data');
          console.error('Error fetching supplier data:', error);
        }
      };

      fetchSupplier();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (id) {
      try {
        await updateSupplier(Number(id), formData);
        toast.success('Supplier updated successfully');
        setSuccessDialogOpen(true);
      } catch (error) {
        toast.error('Error updating supplier');
        console.error('Error updating supplier:', error);
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    navigate('/master-data/suppliers');
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={handleCloseSuccessDialog}
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
              Update Supplier
            </Typography>
            <IconButton onClick={handleCloseSuccessDialog} sx={{ color: '#0077B6' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Edit Supplier Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Address
            </Typography>
            <TextField
              fullWidth
              placeholder="Edit Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              multiline
              rows={2}
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Contact Number
            </Typography>
            <TextField
              fullWidth
              placeholder="Edit Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
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
              placeholder="Edit Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{
              backgroundColor: '#0077B6',
              color: '#C8C8C8',
              borderRadius: '20px',
              width: '100px',
              height: '40px',
              fontSize: '12px',
              '&:hover': {
                backgroundColor: '#005f8e',
              },
            }}
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: '16px', textAlign: 'center', padding: '16px' },
        }}
      >
        <IconButton
          onClick={handleCloseSuccessDialog}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <CheckCircleIcon sx={{ fontSize: '60px', color: '#4CAF50' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2, marginBottom: 2 }}>
            UPDATE SUCCESS!
          </Typography>
          <Button
            onClick={handleCloseSuccessDialog}
            variant="contained"
            sx={{
              backgroundColor: '#0077B6',
              color: '#ffffff',
              borderRadius: '20px',
              fontSize: '14px',
              marginTop: 2,
              padding: '8px 24px',
              '&:hover': {
                backgroundColor: '#005f8e',
              },
            }}
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateSupplierForm;

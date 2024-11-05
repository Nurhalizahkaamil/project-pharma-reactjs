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
import { updateCustomer, getCustomerById } from 'service/customer.service';
import toast from 'react-hot-toast';

const UpdateCustomerForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    name: string;
    age: number;
    address: string;
  }>({
    name: '',
    age: 0,
    address: '',
  });

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const customer = await getCustomerById(Number(id));
          setFormData({
            name: customer.name || '',
            age: customer.age || 0,
            address: customer.address || '',
          });
        } catch (error) {
          toast.error('Error fetching customer data');
          console.error('Error fetching customer data:', error);
        }
      };

      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleUpdate = async () => {
    if (id) {
      try {
        await updateCustomer(Number(id), formData);
        toast.success('Customer updated successfully');
        setSuccessDialogOpen(true);
      } catch (error) {
        toast.error('Error updating customer');
        console.error('Error updating customer:', error);
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    navigate('/master-data/customers');
  };

  return (
    <>
      {/* Update Customer Form */}
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
              Update Customer
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
              placeholder="Edit Customer Name"
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
              placeholder="Edit Age"
              name="age"
              type="number"
              value={formData.age}
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
              multiline
              rows={4}
              required
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
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
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

export default UpdateCustomerForm;

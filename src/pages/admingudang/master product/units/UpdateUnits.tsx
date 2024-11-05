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
import { updateUnits, getUnitsById } from 'service/units.service';
import toast from 'react-hot-toast';

const UpdateUnitsForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ name: string; description: string; status: boolean }>({
    name: '',
    description: '',
    status: true,
  });

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchUnits = async () => {
        try {
          const units = await getUnitsById(Number(id));
          setFormData({
            name: units.name || '',
            description: units.description || '',
            status: units.status ?? true,
          });
        } catch (error) {
          toast.error('Error fetching units data');
          console.error('Error fetching units data:', error);
        }
      };

      fetchUnits();
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
        await updateUnits(Number(id), formData);
        toast.success('Units updated successfully');
        setSuccessDialogOpen(true); // Show success dialog
      } catch (error) {
        toast.error('Error updating units');
        console.error('Error updating units:', error);
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false); // Close the success dialog
    navigate('/master-product/units'); // Navigate to the units page
  };

  return (
    <>
      {/* Update Units Form */}
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
              Update Units
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
              placeholder="Edit Units Name"
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
              placeholder="Edit Description"
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

export default UpdateUnitsForm;

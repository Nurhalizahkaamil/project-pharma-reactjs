import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { CustomerDto } from 'Dto/customer/customer.dto';
import { DoctorDtoOut } from 'Dto/doctor/doctor.dto';
import { CreatePrescriptionDto } from 'Dto/prescriptions/prescription.dto';
import { createPrescription, getDoctors, getCustomers } from 'service/precription.service';
import toast from 'react-hot-toast';

const PrescriptionForm: React.FC = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<DoctorDtoOut[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [formData, setFormData] = useState<CreatePrescriptionDto>({
    prescriptionCode: generatePrescriptionCode(),
    prescriptions: '',
    prescriptionDate: new Date(),
    doctorId: 0,
    customerId: 0,
    isRedeem: false,
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchDoctors();
    fetchCustomers();
  }, []);

  function generatePrescriptionCode() {
    const randomCode = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
    return `PRE${randomCode}`;
  }

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();
      console.log('Fetched doctors:', response);
      if (Array.isArray(response)) {
        setDoctors(response); // Menggunakan response langsung
      } else {
        console.error('Invalid data format:', response);
        toast.error('Error fetching doctors');
      }
    } catch (error) {
      console.error('Failed to load doctors:', error);
      toast.error('Error fetching doctors');
    }
  };
  
  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      console.log('Fetched customers:', response);
      if (Array.isArray(response)) {
        setCustomers(response); // Menggunakan response langsung
      } else {
        console.error('Invalid data format:', response);
        toast.error('Error fetching customers');
      }
    } catch (error) {
      console.error('Failed to load customers:', error);
      toast.error('Error fetching customers');
    }
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'doctorId' || name === 'customerId' ? Number(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      prescriptionDate: new Date(e.target.value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createPrescription(formData); // Call the actual service function
      toast.success('Prescription created successfully');
      navigate('/prescriptions'); // Navigate to another page if needed after successful creation
    } catch (error) {
      console.error('Error creating prescription:', error);
      toast.error('Failed to create prescription');
    }
  };
  

  const handleClose = () => {
    setOpen(false);
    navigate('/prescriptions');
  };

  const toggleRedeemStatus = () => {
    setFormData((prevData) => ({
      ...prevData,
      isRedeem: !prevData.isRedeem,
    }));
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
            Create New Prescription
          </Typography>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Prescription Code"
                name="prescriptionCode"
                value={formData.prescriptionCode}
                disabled // Disable input as it is auto-generated
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Prescription Date"
                type="date"
                name="prescriptionDate"
                value={formData.prescriptionDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Doctor"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
                SelectProps={{ native: true }}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Customer"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                required
                SelectProps={{ native: true }}
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Prescription Detail
              </Typography>
              <TextField
                fullWidth
                placeholder="Prescription Details"
                name="prescriptions"
                value={formData.prescriptions}
                onChange={handleChange}
                required
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isRedeem}
                    onChange={toggleRedeemStatus}
                    color="primary"
                  />
                }
                label="Are you going to redeem the prescription right now?"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#0077B6',
              color: '#FFFFFF',
              borderRadius: '20px',
              px: 4,
              py: 1,
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

export default PrescriptionForm;

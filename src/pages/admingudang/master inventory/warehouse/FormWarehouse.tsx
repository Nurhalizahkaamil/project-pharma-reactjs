import React, { useState, useEffect } from 'react';
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
import { CreateWarehouseDto } from 'Dto/warehousesDto/warehouses.dto';
import { createWarehouse, getSuppliers } from 'service/warehouses.service';
import toast from 'react-hot-toast';
import { SupplierDtoOut } from 'Dto/supplierDto/supplier.dto';

const WarehouseFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<SupplierDtoOut[]>([]);
  const [formData, setFormData] = useState<CreateWarehouseDto>({
    name: '',
    location: '',
    supplierId: 0,
    supplierName: '', // Add this line if it's required in your DTO
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();
        if (Array.isArray(response.data)) {
          setSuppliers(response.data);
        } else {
          console.error('Invalid suppliers data:', response);
          toast.error('Failed to load suppliers');
        }
      } catch (error) {
        console.error('Failed to load suppliers:', error);
        toast.error('Error fetching suppliers. Please try again.');
      }
    };
    fetchSuppliers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'supplierId' ? Number(value) : value,
      supplierName:
        name === 'supplierId'
          ? suppliers.find((supplier) => supplier.id === Number(value))?.name || ''
          : prevData.supplierName,
    }));
  };

  const handleCreate = async (data: CreateWarehouseDto) => {
    try {
      await createWarehouse(data);
      toast.success('Warehouse created successfully');
      handleClose();
    } catch (error) {
      toast.error('Error creating warehouse');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(formData);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/master-inventory/warehouse');
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
            Create New Warehouse
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
              placeholder="Add Warehouse Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Location
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Supplier
            </Typography>
            <TextField
              select
              fullWidth
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              required
              variant="outlined"
              SelectProps={{ native: true }}
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </TextField>
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

export default WarehouseFormPage;

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
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom';
import { updateWarehouse, getWarehouseById, getSuppliers } from 'service/warehouses.service';
import toast from 'react-hot-toast';
import { UpdateWarehouseDto } from 'Dto/warehousesDto/warehouses.dto';
import { SupplierDtoOut } from 'Dto/supplierDto/supplier.dto';

const WarehouseUpdateFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Initialize formData without id
  const [formData, setFormData] = useState<Partial<UpdateWarehouseDto>>({
    name: '',
    location: '',
    supplierId: 0,
    supplierName: '',
  });

  const [suppliers, setSuppliers] = useState<SupplierDtoOut[]>([]);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  useEffect(() => {
    const fetchWarehouseAndSuppliers = async () => {
      if (id) {
        try {
          const warehouseResponse = await getWarehouseById(Number(id));
          setFormData({
            name: warehouseResponse.name,
            location: warehouseResponse.location,
            supplierId: warehouseResponse.supplierId,
            supplierName: warehouseResponse.supplierName,
          });

          const suppliersResponse = await getSuppliers();
          if (Array.isArray(suppliersResponse.data)) {
            setSuppliers(suppliersResponse.data);
          } else {
            console.error('Invalid suppliers data:', suppliersResponse);
            toast.error('Failed to load suppliers');
          }
        } catch (error) {
          toast.error('Error fetching warehouse data');
          console.error('Error fetching warehouse data:', error);
        }
      }
    };

    fetchWarehouseAndSuppliers();
  }, [id]);

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

  const handleUpdate = async () => {
    if (id) {
      try {
        await updateWarehouse(Number(id), formData as UpdateWarehouseDto); // Cast formData to UpdateWarehouseDto
        toast.success('Warehouse updated successfully');
        setSuccessDialogOpen(true);
      } catch (error) {
        toast.error('Error updating warehouse');
        console.error('Error updating warehouse:', error);
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    navigate('/master-inventory/warehouse');
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
              Update Warehouse
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
              placeholder="Edit Warehouse Name"
              name="name"
              value={formData.name || ''}
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
              placeholder="Edit Location"
              name="location"
              value={formData.location || ''}
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
              placeholder='Select Supplier'
              name="supplier"
              value={formData.supplierId}
              onChange={handleChange}
              required
              variant="outlined"
            >
              <MenuItem value={0}>Select Supplier</MenuItem>
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </TextField>
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

export default WarehouseUpdateFormPage;

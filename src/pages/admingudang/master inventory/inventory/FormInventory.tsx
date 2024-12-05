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
import toast from 'react-hot-toast';
import { ProductDtoOut } from 'Dto/product/product.dto';
import { createInventory, getProducts } from 'service/inventory.service';
import { CreateInventoryDto, ReasonType } from 'Dto/inventories/inventory.dto';

const InventoryFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDtoOut[]>([]);
  const [formData, setFormData] = useState<CreateInventoryDto>({
    items: [
      {
        productId: 0,
        productName: '',
        qtyItem: 0,
        noteItem: '',
      },
    ],
    inventoryDate: new Date().toISOString(), // Format ISO string langsung
    inventoryType: 'In',
    reasonType: 'Purchase', // Alasan default
    note: '',
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Invalid product data:', response);
          toast.error('Failed to load product');
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        toast.error('Error fetching product. Please try again.');
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === 'productId') {
        return {
          ...prevData,
          items: [
            {
              ...prevData.items[0],
              productId: Number(value),
            },
          ],
        };
      }

      if (name === 'qtyItem' || name === 'noteItem') {
        return {
          ...prevData,
          items: [
            {
              ...prevData.items[0],
              [name]: name === 'qtyItem' ? Number(value) : value,
            },
          ],
        };
      }

      return { ...prevData, [name]: value };
    });
  };

  const handleCreate = async (data: CreateInventoryDto) => {
    try {
      const payload = {
        ...data,
        inventoryDate: new Date(data.inventoryDate).toISOString(), // Pastikan format ISO
      };
      await createInventory(payload);
      toast.success('Inventory created successfully');
      handleClose();
    } catch (error) {
      toast.error('Error creating inventory');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(formData);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/master-inventory/inventories');
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
            Add Stock In Inventory
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
              Inventory Date
            </Typography>
            <TextField
              fullWidth
              placeholder="Select Inventory Date"
              name="inventoryDate"
              type="date"
              value={formData.inventoryDate.split('T')[0]} // Convert ISO string ke format 'YYYY-MM-DD'
              onChange={handleChange}
              required
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Product
            </Typography>
            <TextField
              select
              fullWidth
              name="productId"
              value={formData.items[0]?.productId || ''}
              onChange={handleChange}
              required
              variant="outlined"
              SelectProps={{ native: true }}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </TextField>
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Quantity
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Quantity"
              type="number"
              name="qtyItem"
              value={formData.items[0]?.qtyItem || ''}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Item Note
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Item Note"
              name="noteItem"
              value={formData.items[0]?.noteItem || ''}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Inventory Note
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Inventory Note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Inventory Type
            </Typography>
            <TextField
              select
              fullWidth
              name="inventoryType"
              value={formData.inventoryType}
              onChange={handleChange}
              required
              variant="outlined"
              SelectProps={{ native: true }}
            >
              <option value="">Select Type</option>
              <option value="In">In</option>
              <option value="Out">Out</option>
            </TextField>
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Reason Type
            </Typography>
            <TextField
              select
              fullWidth
              name="reasonType"
              value={formData.reasonType}
              onChange={handleChange}
              required
              variant="outlined"
              SelectProps={{ native: true }}
            >
              <option value="">Select Reason</option>
              <option value="Purchase">Purchase</option>
              <option value="Replacement">Replacement</option>
              <option value="Bonus">Bonus</option>
              <option value="Expired">Expired</option>
              <option value="Damage">Damage</option>
              <option value="Lost">Lost</option>
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

export default InventoryFormPage;

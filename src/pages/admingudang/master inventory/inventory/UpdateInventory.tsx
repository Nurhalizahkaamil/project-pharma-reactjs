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
import { getInventoryById, updateInventory, getProducts } from 'service/inventory.service';
import toast from 'react-hot-toast';
import { UpdateInventoryDto, ReasonType } from 'Dto/inventories/inventory.dto';
import { ProductDtoOut } from 'Dto/product/product.dto';

const InventoryUpdateFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<UpdateInventoryDto>>({
    items: [
      {
        productId: 0,
        productName: '',
        qtyItem: 0,
        noteItem: '',
      },
    ],
    inventoryDate: '',
    inventoryType: 'In',
    reasonType: 'Purchase',
    note: '',
  });
  const [products, setProducts] = useState<ProductDtoOut[]>([]);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  useEffect(() => {
    const fetchInventoryAndProducts = async () => {
      if (id) {
        try {
          const inventoryResponse = await getInventoryById(Number(id));
          setFormData({
            ...inventoryResponse,
            items: inventoryResponse.items || [],
          });
        } catch (error) {
          console.error('Error fetching inventory:', error);
          toast.error('Failed to load inventory. Please try again.');
        }

        try {
          const productsResponse = await getProducts();
          const productsData = Array.isArray(productsResponse.data) ? productsResponse.data : [];
          setProducts(productsData);
        } catch (error) {
          console.error('Error fetching products:', error);
          toast.error('Failed to load products. Please try again.');
        }
      }
    };

    fetchInventoryAndProducts();
  }, [id]);

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
              ...prevData.items![0],
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
              ...prevData.items![0],
              [name]: name === 'qtyItem' ? Number(value) : value,
            },
          ],
        };
      }

      return { ...prevData, [name]: value };
    });
  };

  const handleUpdate = async () => {
    if (id) {
      try {
        const payload = {
          ...formData,
          inventoryDate: new Date(formData.inventoryDate!).toISOString(),
        };
        await updateInventory(Number(id), payload as UpdateInventoryDto);
        toast.success('Inventory updated successfully');
        setSuccessDialogOpen(true);
      } catch (error) {
        toast.error('Error updating inventory');
        console.error(error);
      }
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    navigate('/master-inventory/inventories');
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
              Update Inventory
            </Typography>
            <IconButton onClick={handleCloseSuccessDialog} sx={{ color: '#0077B6' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Inventory Date
            </Typography>
            <TextField
              fullWidth
              name="inventoryDate"
              type="date"
              value={formData.inventoryDate || ''}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Product
            </Typography>
            <TextField
              select
              fullWidth
              placeholder='Select Product'
              name="productId"
              value={formData.items![0]?.productId || ''}
              onChange={handleChange}
              required
              variant="outlined"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Quantity
            </Typography>
            <TextField
              fullWidth
              placeholder='Add Quantity'
              name="qtyItem"
              type="number"
              value={formData.items![0]?.qtyItem || ''}
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
              placeholder='Add note for item'
              name="noteItem"
              value={formData.items![0]?.noteItem || ''}
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
              placeholder='Add note for inventory'
              name="note"
              value={formData.note || ''}
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
              placeholder='Select Inventory Type'
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
              placeholder='Select Reason Type'
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

export default InventoryUpdateFormPage;

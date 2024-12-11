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
import { CreateStockOpnameDto } from 'Dto/stock opname/stock.opname.dto';
import { getProducts } from 'service/stockopname.service';
import { createStockOpname } from 'service/stockopname.service';

const StockOpnameFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDtoOut[]>([]);
  const [formData, setFormData] = useState<CreateStockOpnameDto>({
    opnameDate: new Date().toISOString().split('T')[0], // ISO format
    note: '',
    items: [
      {
        productId: 0,
        productName: '',
        physicalStock: 0,
        discrepancy: 0,
      },
    ],
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
          toast.error('Failed to load product list');
        }
      } catch (error) {
        console.error('Failed to load product:', error);
        toast.error('Error fetching product list. Please try again.');
      }
    };
    fetchProducts();
  }, []);

  // Handle form data changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      let updatedItems = [...prevData.items];
      const item = updatedItems[0];

      if (name === 'productId') {
        const selectedProduct = products.find((product) => product.id === Number(value));
        if (selectedProduct) {
          item.productId = selectedProduct.id;
          item.productName = selectedProduct.name;
          item.physicalStock = 0; // reset physical stock when product changes
          item.discrepancy = 0; // reset discrepancy when product changes
        }
      } else if (name === 'physicalStock') {
        item.physicalStock = Number(value);
      } else if (name === 'note') {
        // Menangani perubahan pada field "Note"
        return { ...prevData, note: value };
      }

      // Calculate discrepancy
      if (item.productId !== 0 && item.physicalStock !== 0) {
        const selectedProduct = products.find((product) => product.id === item.productId);
        if (selectedProduct) {
          item.discrepancy = item.physicalStock - selectedProduct.stockQuantity;
        }
      }

      return { ...prevData, items: updatedItems };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createStockOpname(formData);
      toast.success('Stock opname created successfully!');
      handleClose();
    } catch (error) {
      console.error('Error creating stock opname:', error);
      toast.error('Failed to create stock opname.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/manage-inventory/stockopname');
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
            Create Stock Opname
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
              Stock Opname Date
            </Typography>
            <TextField
              fullWidth
              name="opnameDate"
              type="date"
              value={formData.opnameDate}
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
              Physical Stock
            </Typography>
            <TextField
              fullWidth
              type="number"
              name="physicalStock"
              placeholder="Enter Physical Stock"
              value={formData.items[0]?.physicalStock || ''}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>

          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Discrepancy
            </Typography>
            <TextField
              fullWidth
              type="number"
              name="discrepancy"
              placeholder="Discrepancy"
              value={formData.items[0]?.discrepancy || ''}
              onChange={handleChange}
              disabled
              variant="outlined"
            />
          </Box>

          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Note
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add Note"
              name="note"
              value={formData.note}
              onChange={handleChange}
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
              color: '#FFF',
              borderRadius: '20px',
              width: '100px',
              height: '40px',
              fontSize: '12px',
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

export default StockOpnameFormPage;

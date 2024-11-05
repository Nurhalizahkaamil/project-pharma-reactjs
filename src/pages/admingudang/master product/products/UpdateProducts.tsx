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
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct, getCategories, getUnits } from 'service/product.service';
import { UpdateProductDto } from 'Dto/product/product.dto';
import toast from 'react-hot-toast';
import { CategoriesDto } from 'Dto/categories/categories.dto';
import { UnitsDto } from 'Dto/unitsDto/units.dto';

const ProductUpdateFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UpdateProductDto>({
    productCode: '',
    name: '',
    description: '',
    purchasePrice: 0,
    sellingPrice: 0,
    expiryDate: undefined,
    stockQuantity: 0,
    categoryId: 0,
    unitId: 0,
    productImageUrl: '',
    drugClass: undefined,
  });

  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [categories, setCategories] = useState<CategoriesDto[]>([]);
  const [units, setUnits] = useState<UnitsDto[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (Array.isArray(response)) {
          setCategories(response);
        } else {
          console.error('Invalid categories data:', response);
          toast.error('Failed to load categories');
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        toast.error('Error fetching categories. Please try again.');
      }
    };

    const fetchUnits = async () => {
      try {
        const response = await getUnits();
        if (Array.isArray(response)) {
          setUnits(response);
        } else {
          console.error('Invalid units data:', response);
          toast.error('Failed to load units');
        }
      } catch (error) {
        console.error('Failed to load units:', error);
        toast.error('Error fetching units. Please try again.');
      }
    };

    fetchCategories();
    fetchUnits();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'expiryDate' ? new Date(value) : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(Number(id), formData);
      toast.success('Product updated successfully');
      setSuccessDialogOpen(true);
    } catch (error) {
      toast.error('Failed to update product');
      console.error('Error updating product:', error);
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
    navigate('/master-product/products');
  };

  return (
    <>
      <Dialog
        open={true}
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
              Update Product
            </Typography>
            <IconButton onClick={handleCloseSuccessDialog} sx={{ color: '#0077B6' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                Product Code
              </Typography>
              <TextField
                fullWidth
                placeholder="Product Code"
                name="productCode"
                value={formData.productCode}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                Product Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Description
              </Typography>
              <TextField
                fullWidth
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Purchase Price"
                name="purchasePrice"
                type="number"
                value={formData.purchasePrice}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Selling Price"
                name="sellingPrice"
                type="number"
                value={formData.sellingPrice}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={formData.expiryDate ? formData.expiryDate.toISOString().split('T')[0] : ''}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="productImageUrl"
                value={formData.productImageUrl}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                variant="outlined"
              >
                <MenuItem value={0}>Select Category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Unit"
                name="unitId"
                value={formData.unitId}
                onChange={handleChange}
                required
                variant="outlined"
              >
                <MenuItem value={0}>Select Unit</MenuItem>
                {units.map((unit) => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                placeholder='Select Drug Class'
                label="Drug Class"
                name="drugClass"
                value={formData.drugClass || ''}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value={0}>Select Drug Class</MenuItem>
                <MenuItem value="OBAT_BEBAS">Obat Bebas</MenuItem>
                <MenuItem value="OBAT_BEBAS_TERBATAS">Obat Bebas Terbatas</MenuItem>
                <MenuItem value="OBAT_KERAS">Obat Keras</MenuItem>
              </TextField>
            </Grid>
          </Grid>
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
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2 }}>
            UPDATE SUCCESS!
          </Typography>
          <Button
            onClick={handleCloseSuccessDialog}
            variant="contained"
            sx={{
              backgroundColor: '#0077B6',
              color: '#ffffff',
              borderRadius: '20px',
              marginTop: 2,
              padding: '8px 24px',
            }}
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductUpdateFormPage;

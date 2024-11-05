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
  Grid,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CreateProductDto, DrugClass } from 'Dto/product/product.dto';
import { CategoriesDto } from 'Dto/categories/categories.dto';
import { UnitsDto } from 'Dto/unitsDto/units.dto';
import { createProduct, getCategories, getUnits } from 'service/product.service';
import toast from 'react-hot-toast';

const ProductFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoriesDto[]>([]);
  const [units, setUnits] = useState<UnitsDto[]>([]);
  const [formData, setFormData] = useState<CreateProductDto>({
    productCode: '',
    name: '',
    description: '',
    purchasePrice: 0,
    sellingPrice: 0,
    expiryDate: new Date(),
    stockQuantity: 0,
    productImageUrl: '',
    categoryId: 0,
    unitId: 0,
    drugClass: undefined,
  });
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchUnits();
  }, []);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === 'categoryId' || name === 'unitId'
          ? Number(value)
          : name === 'expiryDate'
            ? new Date(value)
            : value,
    }));
  };

  const handleCreate = async (data: CreateProductDto) => {
    try {
      await createProduct(data);
      toast.success('Product created successfully');
      handleClose();
    } catch (error) {
      toast.error('Error creating product');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(formData);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/master-product/products');
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
            Create New Product
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
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
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                Product Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Product Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Purchase Price"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Selling Price"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Expiry Date"
                name="expiryDate"
                value={formData.expiryDate.toISOString().split('T')[0]}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Stock Quantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="productImageUrl"
                value={formData.productImageUrl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Category"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                variant="outlined"
                SelectProps={{ native: true }}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Unit"
                name="unitId"
                value={formData.unitId}
                onChange={handleChange}
                required
                variant="outlined"
                SelectProps={{ native: true }}
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Drug Class"
                name="drugClass"
                value={formData.drugClass || ''}
                onChange={handleChange}
              >
                {Object.values(DrugClass).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
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

export default ProductFormPage;

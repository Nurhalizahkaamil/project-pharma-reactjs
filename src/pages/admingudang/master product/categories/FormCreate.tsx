import React, { useState } from 'react';
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
import { CreateCategoriesDto } from 'Dto/categories/categories.dto';
import { createCategories } from 'service/categories.service';
import toast from 'react-hot-toast';

const CategoriesFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateCategoriesDto>({
    name: '',
    description: '',
    categoryImageUrl: '', // Menambahkan kolom opsional categoryImageUrl
  });

  const [open, setOpen] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async (data: CreateCategoriesDto) => {
    try {
      const result = await createCategories(data);
      toast.success('Category created successfully');
      handleClose();
      return result;
    } catch (error) {
      toast.error('Error creating category');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(formData);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/master-product/categories');
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
            Create New Category
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
              placeholder="Add Category Name"
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
              placeholder="Add Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Category Image URL
            </Typography>
            <TextField
              fullWidth
              placeholder="Add Category Image URL"
              name="categoryImageUrl"
              value={formData.categoryImageUrl}
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

export default CategoriesFormPage;

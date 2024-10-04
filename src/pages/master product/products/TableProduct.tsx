import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import axios from 'axios';

// Definisikan interface untuk produk
interface Product {
  id: string; // Ganti dengan tipe yang sesuai
  images: string[]; // Jika images adalah array URL
  name: string;
  description: string;
  price: number; // Ganti dengan tipe yang sesuai
  expiryDate: string; // Ganti dengan tipe yang sesuai
  unit: string; // Ganti dengan tipe yang sesuai
  categories: string[]; // Ganti dengan tipe yang sesuai
  status: string;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Ganti dengan endpoint API Anda
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id: string) => {
    // Logika untuk edit produk
  };

  const handleDelete = (id: string) => {
    // Logika untuk delete produk
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">ID</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Images</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Description</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Price</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Expiry Date</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Unit</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Categories</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Status</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Product Image ${index + 1}`}
                      style={{ width: '50px', height: '50px' }}
                    />
                  ))}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.expiryDate}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.categories.join(', ')}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(product.id)}>Edit</Button>
                  <Button onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">
                <Typography>No products available.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;

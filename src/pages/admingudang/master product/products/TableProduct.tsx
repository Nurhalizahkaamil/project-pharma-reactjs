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
  TableFooter,
  TablePagination,
} from '@mui/material';
import axios from 'axios';

// Definisikan interface untuk produk
interface Product {
  id: string;
  images: string[];
  name: string;
  description: string;
  price: number;
  expiryDate: string;
  unit: string;
  categories: string[];
  status: string;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // Ganti dengan endpoint API Anda
        setProducts(response.data);
        setTotalItems(response.data.length); // Set total items
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (_id: string) => {
    // Logika untuk edit produk
  };

  const handleDelete = (_id: string) => {
    // Logika untuk delete produk
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Images
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Expiry Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Unit
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Categories
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ color: '#4a4a4a' }}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length > 0 ? (
            products
              .slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
              .map((product) => (
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
        <TableFooter>
          <TableRow>
            <TablePagination
              count={totalItems}
              page={currentPage}
              onPageChange={handlePageChange}
              rowsPerPage={itemsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;

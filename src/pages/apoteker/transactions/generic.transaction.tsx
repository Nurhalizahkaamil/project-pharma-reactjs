import React, { useEffect, useState } from 'react';
import { ProductDtoOut } from 'Dto/product/product.dto';
import { getProducts } from 'service/product.service';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface SelectedProduct extends ProductDtoOut {
  quantity: number;
  subtotal: number;
}

const GenericTransactionForm: React.FC = () => {
  const [productSearch, setProductSearch] = useState('');
  const [products, setProducts] = useState<ProductDtoOut[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDtoOut[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [transactionCode, setTransactionCode] = useState('');
  const [transactionDate, setTransactionDate] = useState('');

  // Generate a random transaction code
  const generateTransactionCode = () => {
    return 'TRX-' + Math.floor(100000 + Math.random() * 900000); // Example: TRX-123456
  };

  useEffect(() => {
    // Set the transaction code and date with AM/PM format
    setTransactionCode(generateTransactionCode());
    const today = new Date();
    const formattedDate = today.toLocaleString('en-US', {
      weekday: 'short', // Optional: Display the day of the week (e.g., Mon, Tue)
      year: 'numeric',
      month: 'short', // Month as a short name (e.g., Jan, Feb)
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Ensure AM/PM format
    });
    setTransactionDate(formattedDate);
  }, []);

  // Fetch product list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the search query
    if (productSearch.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [productSearch, products]);

  const handleProductSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductSearch(e.target.value);
  };

  const handleAddProduct = (product: ProductDtoOut) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    if (!existingProduct) {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, quantity: 1, subtotal: product.sellingPrice },
      ]);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
    setOpenDialog(false);
    setProductToDelete(null);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity, subtotal: product.sellingPrice * quantity }
          : product,
      ),
    );
  };

  const calculateGrandTotal = () => {
    const subtotal = selectedProducts.reduce((sum, product) => sum + product.subtotal, 0);
    return subtotal * 1.1;
  };

  const openDeleteConfirmation = (productId: number) => {
    setProductToDelete(productId);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setProductToDelete(null);
  };

  return (
    <div>
      {/* Display transaction date and code */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ color: '#007BCE' }}>
          <strong>{transactionDate}</strong>
        </div>
        <div style={{ color: '#007BCE' }}>
          <strong>Transaction Code: {transactionCode}</strong>
        </div>
      </div>

      <h3>Search and Add Products Here</h3>
      <input
        type="text"
        placeholder="Search product name here"
        value={productSearch}
        onChange={handleProductSearch}
        style={{ padding: '10px', width: '100%' }}
      />

      {/* Pop-up of filtered products */}
      {productSearch && filteredProducts.length > 0 && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            borderRadius: '8px',
            marginTop: '5px',
            zIndex: 1,
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #ddd',
              }}
              onClick={() => handleAddProduct(product)}
            >
              {product.name} - {product.sellingPrice.toLocaleString()}
            </div>
          ))}
        </div>
      )}

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Qty</th>
            <th style={{ padding: '10px' }}>Units</th>
            <th style={{ padding: '10px' }}>Price</th>
            <th style={{ padding: '10px' }}>Subtotal</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product, index) => (
            <tr key={product.id}>
              <td style={{ padding: '10px' }}>{index + 1}</td>
              <td style={{ padding: '10px' }}>{product.name}</td>
              <td style={{ padding: '10px' }}>
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                  style={{ width: '60px', padding: '5px', textAlign: 'center' }}
                />
              </td>
              <td style={{ padding: '10px' }}>{product.unit?.name}</td>
              <td style={{ padding: '10px' }}>{product.sellingPrice.toLocaleString()}</td>
              <td style={{ padding: '10px' }}>{product.subtotal.toLocaleString()}</td>
              <td style={{ padding: '10px' }}>
                <IconButton onClick={() => openDeleteConfirmation(product.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <p>
          Subtotal: Rp{' '}
          {selectedProducts.reduce((sum, product) => sum + product.subtotal, 0).toLocaleString()}
        </p>
        <p>
          PPN 10%: Rp{' '}
          {(
            selectedProducts.reduce((sum, product) => sum + product.subtotal, 0) * 0.1
          ).toLocaleString()}
        </p>
        <strong>Total: Rp {calculateGrandTotal().toLocaleString()}</strong>
      </div>

      <button
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#00bfa5',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Purchase Rp {calculateGrandTotal().toLocaleString()}
      </button>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product from the transaction?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleRemoveProduct(productToDelete!)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GenericTransactionForm;

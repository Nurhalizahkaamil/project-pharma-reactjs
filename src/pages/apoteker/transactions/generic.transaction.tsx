import React, { useEffect, useState } from 'react';
import { ProductDtoOut } from 'Dto/product/product.dto';
import { getProducts } from 'service/product.service';
import {
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentPopup from 'pages/apoteker/transactions/payment';
import ConfirmationDialog from 'components/common/ConfirmationDelete';

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
  const [transactionCount] = useState(1);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false); // New state for PaymentPopup

  // Generate a random transaction code
  const generateTransactionCode = () => {
    const today = new Date();
    const datePart = today.toISOString().split('T')[0].replace(/-/g, ''); // yyyymmdd
    const transactionOrder = String(transactionCount).padStart(3, '0'); // 3-digit order

    return `TRX-${datePart}-${transactionOrder}`;
  };

  useEffect(() => {
    // Set the transaction code and date
    setTransactionCode(generateTransactionCode());
    setTransactionDate(
      new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }),
    );
  }, [transactionCount]);

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
    setProductSearch('');
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

  // Open the PaymentPopup when purchase is clicked
  const handlePurchaseClick = () => {
    setIsPaymentPopupOpen(true);
  };

  // Close the PaymentPopup
  const closePaymentPopup = () => {
    setIsPaymentPopupOpen(false);
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
        <p>PPN 10%: Rp {(calculateGrandTotal() * 0.1).toLocaleString()}</p>
        <p>
          Grand Total: Rp <strong>{calculateGrandTotal().toLocaleString()}</strong>
        </p>
      </div>

      <Button
        onClick={handlePurchaseClick}
        variant="contained"
        color="primary"
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#00bfa5',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          float: 'right',
        }}
      >
        Purchase
      </Button>

      {/* Use the ConfirmationDialog component */}
      <ConfirmationDialog
        open={openDialog}
        onClose={closeDialog}
        onConfirm={() => productToDelete && handleRemoveProduct(productToDelete)}
        title={'Are you sure you want to delete this transactions?'}
      />

      {/* PaymentPopup component */}
      {isPaymentPopupOpen && (
        <PaymentPopup grandTotal={calculateGrandTotal()} onClose={closePaymentPopup} />
      )}
    </div>
  );
};

export default GenericTransactionForm;

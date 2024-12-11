import React, { useEffect, useState } from 'react';
import { ProductDtoOut } from 'Dto/product/product.dto';
import { getProducts } from 'service/product.service';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentPopup from 'pages/apoteker/transactions/transpayment';
import ConfirmationDialog from 'components/common/ConfirmationDelete';
import { getCurrentUserId } from 'service/auth.service';
import SearchIcon from '@mui/icons-material/Search';
import {
  CategoryType,
  CreateTransactionDto,
  PaymentMethod,
  TransactionType,
} from 'Dto/transaction/transaction.dto';
import { createTransaction } from 'service/transaction.service';
import toast from 'react-hot-toast';
import { createTransactionDetail } from 'service/transaction.detail.service';
import { CreateTransactionDetailDto } from 'Dto/transaction/transaction.detail.dto';
import { useLocation } from 'react-router-dom';
import { createPrescriptionRedemption } from 'service/redeemtion.service';
import { CreatePrescriptionRedemptionDto } from 'Dto/prescriptions/redeemtion.dto';

interface SelectedProduct extends ProductDtoOut {
  quantity: number;
  subtotal: number;
  note: string;
}

const GenericTransactionForm: React.FC = () => {
  const [productSearch, setProductSearch] = useState('');
  const [products, setProducts] = useState<ProductDtoOut[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDtoOut[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: '',
    amount: 0,
    change: 0,
    note: '',
  });

  const [formData, setFormData] = useState<CreateTransactionDto>({
    id: 0,
    transactionType: TransactionType.GENERIC,
    categoryType: CategoryType.OUT,
    userId: '',
    transactionDate: new Date(),
    note: '',
    tax: 0,
    subTotal: 0,
    grandTotal: 0,
    paymentMethod: PaymentMethod.CASH,
    items: [],
  });

  const { prescriptionId } = useLocation().state || {}; // Get prescriptionId from parent

  useEffect(() => {
    if (prescriptionId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        prescriptionId,
        isPaid: true,
        isRedeem: true, // Set redeem flag to true for redemption transactions
      }));
    }
  }, [prescriptionId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response?.data) {
          setProducts(response.data);
        } else {
          toast.error('No products found.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products. Please try again.');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const currentUserId = getCurrentUserId();
    if (currentUserId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: currentUserId,
      }));
    } else {
      toast.error('User not logged in.');
    }
  }, []);

  useEffect(() => {
    if (productSearch.trim()) {
      const filtered = products.filter((product) =>
        product.productCode.toLowerCase().includes(productSearch.toLowerCase()),
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
    if (existingProduct) {
      handleQuantityChange(product.id, existingProduct.quantity + 1);
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, quantity: 1, subtotal: product.sellingPrice, note: '' },
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
    if (quantity < 1) {
      toast.error('Quantity must be at least 1.');
      return;
    }
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity, subtotal: product.sellingPrice * quantity }
          : product,
      ),
    );
  };

  const handleNoteChange = (productId: number, note: string) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === productId ? { ...product, note } : product)),
    );
  };

  const calculateTax = () => {
    return selectedProducts.reduce((sum, product) => sum + product.sellingPrice, 0) * 0.1;
  };

  const calculateGrandTotal = () => {
    const subtotal = selectedProducts.reduce((sum, product) => sum + product.subtotal, 0);
    return subtotal + calculateTax();
  };

  const openDeleteConfirmation = (productId: number) => {
    setProductToDelete(productId);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setProductToDelete(null);
  };

  const validateTransactionData = () => {
    if (!formData.userId) {
      toast.error('You must be logged in to make a purchase.');
      return false;
    }

    if (selectedProducts.length === 0) {
      toast.error('Please add at least one product to the transaction.');
      return false;
    }

    const subTotal = selectedProducts.reduce((sum, product) => sum + product.subtotal, 0);
    const tax = calculateTax();
    const grandTotal = calculateGrandTotal();

    // Map to CreateTransactionDetailDto
    const validItems: CreateTransactionDetailDto[] = selectedProducts.map((product) => ({
      productId: product.id,
      productName: product.name,
      quantity: product.quantity,
      note: product.note,
    }));

    if (validItems.length === 0) {
      toast.error('Failed to validate selected products.');
      return false;
    }

    const transactionData: CreateTransactionDto = {
      ...formData,
      transactionDate: new Date(),
      tax,
      subTotal,
      grandTotal,
      items: validItems,
    };

    setFormData(transactionData);
    return true;
  };

  const handleShow = () => {
    console.log('Proceed to Payment clicked');
    setIsPaymentPopupOpen(true);

    const isValid = validateTransactionData();
    if (!isValid) return;

    setPaymentDetails({
      paymentMethod: PaymentMethod.CASH,
      amount: 0,
      change: 0,
      note: '',
    });
  };

  const handlePaymentConfirmed = async (paymentData: {
    paymentMethod: string;
    amount: number;
    change: number;
    note: string;
  }) => {
    const transactionData: CreateTransactionDto = {
      ...formData,
      transactionDate: new Date(),
      paymentMethod: paymentData.paymentMethod as PaymentMethod,
      note: paymentData.note,
    };

    try {
      // Kirim ke TransactionService
      const response = await createTransaction(transactionData);
      if (response?.data) {
        const transactionId = response.data.id;

        // Kirim items ke TransactionDetailService
        const detailPromises = selectedProducts.map((item) =>
          createTransactionDetail({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            note: item.note,
          }),
        );

        await Promise.all(detailPromises);

        // //Tambahkan logika khusus untuk prescription
        // if (transactionData.transactionType === TransactionType.PRESCRIPTION && prescriptionId) {
        //   // Simpan ke prescription_redeemptions
        //   const prescriptionData: CreatePrescriptionRedemptionDto = {
        //     prescriptionId,
        //     transaction: transactionId, // Menggunakan data transaksi
        //     isPaid: true,
        //     isRedeem: true,
        //   };

        //   // Kirim data ke table Prescription Redemptions
        //   const prescriptionResponse = await createPrescriptionRedemption(prescriptionData);
        //   if (prescriptionResponse?.data) {
        //     toast.success('Prescription redemption created successfully!');
        //   } else {
        //     throw new Error('Failed to create prescription redemption.');
        //   }
        // }

        toast.success('Transaction created successfully!');
        setSelectedProducts([]);
        closePaymentPopup(); // Tutup popup
      } else {
        toast.error('Failed to create transaction.');
      }
    } catch (error) {
      console.error('Error during transaction:', error);
      toast.error('Failed to create transaction.');
    }
  };

  const closePaymentPopup = () => {
    console.log('Closing payment popup');
    setIsPaymentPopupOpen(false); // Tutup popup
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', marginTop: '-60px' }}>
      <TextField
        placeholder="Search product name here"
        value={productSearch}
        onChange={handleProductSearch}
        variant="outlined"
        size="small"
        fullWidth={false}
        style={{
          width: '50%',
          marginBottom: '20px',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

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
          tableLayout: 'fixed',
          border: '1px solid #ddd', // Tambahan border tabel
          borderRadius: '8px', // Sudut melengkung
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f7f7f7', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Qty</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Price</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>Subtotal</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Note</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product, index) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', textAlign: 'left' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{product.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  min="1"
                  style={{
                    width: '50px',
                    textAlign: 'center', // Teks dimulai dari tengah
                    padding: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </td>
              <td style={{ padding: '10px', textAlign: 'right' }}>
                {product.sellingPrice.toLocaleString()}
              </td>
              <td style={{ padding: '10px', textAlign: 'right' }}>
                {product.subtotal.toLocaleString()}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <input
                  type="text"
                  value={product.note}
                  onChange={(e) => handleNoteChange(product.id, e.target.value)}
                  style={{
                    width: '100px',
                    textAlign: 'center',
                    padding: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <IconButton onClick={() => openDeleteConfirmation(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input untuk General Note */}
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
        <strong>GrandTotal: Rp {calculateGrandTotal().toLocaleString()}</strong>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleShow}
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
        Proceed to Payment
      </Button>

      <ConfirmationDialog
        open={openDialog}
        onClose={closeDialog}
        onConfirm={() => productToDelete && handleRemoveProduct(productToDelete)}
        title={'Are you sure you want to delete this prescription transactions?'}
      />

      {isPaymentPopupOpen && (
        <PaymentPopup
          open={isPaymentPopupOpen}
          onClose={closePaymentPopup}
          grandTotal={calculateGrandTotal()}
          paymentDetails={{
            ...paymentDetails,
            tax: calculateTax(),
          }}
          setPaymentDetails={setPaymentDetails}
          userId={getCurrentUserId()}
          selectedProducts={selectedProducts}
          transactionType={TransactionType.GENERIC}
          onPaymentConfirmed={(paymentData) => {
            const relevantData = {
              paymentMethod: paymentData.paymentMethod,
              note: paymentData.note,
              tax: paymentData.tax, // Pastikan tax ada
              amount: paymentData.amount,
              change: paymentData.change,
            };
            handlePaymentConfirmed(relevantData);
            closePaymentPopup();
          }}
        />
      )}
    </div>
  );
};

export default GenericTransactionForm;

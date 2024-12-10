import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import toast from 'react-hot-toast';
import { createTransaction } from 'service/transaction.service';
import { createTransactionDetail } from 'service/transaction.detail.service';
import { ProductDtoOut } from 'Dto/product/product.dto';
import { useNavigate } from 'react-router-dom';
import {
  PaymentMethod,
  CreateTransactionDto,
  TransactionType,
  CategoryType,
} from 'Dto/transaction/transaction.dto';
import CloseIcon from '@mui/icons-material/Close';

interface SelectedProduct extends ProductDtoOut {
  quantity: number;
  note: string;
  sellingPrice: number;
}

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
  grandTotal: number;
  paymentDetails: {
    tax: number;
    paymentMethod: string;
    amount: number;
    change: number;
    note: string;
  };
  setPaymentDetails: React.Dispatch<
    React.SetStateAction<{
      paymentMethod: string;
      amount: number;
      change: number;
      note: string;
    }>
  >;
  onPaymentConfirmed: (paymentData: {
    tax: number;
    change: any;
    amount: any;
    paymentMethod: string;
    note: string;
  }) => void;
  userId: string | null;
  selectedProducts: SelectedProduct[];
  transactionType: TransactionType;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({
  open,
  onClose,
  grandTotal,
  paymentDetails,
  setPaymentDetails,
  userId,
  selectedProducts,
  transactionType,
}) => {
  const [isTransactionSuccess, setIsTransactionSuccess] = React.useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  // Calculate tax (example: 10% of grand total)
  const calculateTax = (total: number): number => {
    const taxRate = 0.1;
    return total * taxRate;
  };

  const handleCloseAndNavigate = (id: number) => {
    open = false;
    onClose();
    navigate(`/transactions/generaltransaction/history/${id}`, { state: { transactionId: id } });
  };

  const handleConfirmPayment = async () => {
    // Validasi awal
    if (!paymentDetails.paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    if (paymentDetails.amount < grandTotal) {
      toast.error('The amount received must be at least equal to the grand total.');
      return;
    }

    if (!userId) {
      toast.error('User ID is required for this transaction.');
      return;
    }

    // Hitung pajak
    const taxAmount = calculateTax(grandTotal);

    // Siapkan payload transaksi
    const transactionPayload: CreateTransactionDto = {
      paymentMethod: paymentDetails.paymentMethod as PaymentMethod,
      note: paymentDetails.note,
      transactionDate: new Date(),
      userId,
      transactionType,
      categoryType: CategoryType.OUT,
      id: 0, // ID dihasilkan oleh server
      tax: taxAmount,
      subTotal: selectedProducts.reduce(
        (total, product) => total + product.quantity * product.sellingPrice,
        0,
      ),
      grandTotal,
      items: selectedProducts.map((product) => ({
        productId: product.id,
        productName: product.name,
        quantity: product.quantity,
        note: product.note,
        price: product.sellingPrice,
      })),
    };

    try {
      handleCloseAndNavigate(transactionPayload.id)
    } catch (error) {
      console.error('Error during transaction creation:', error);
      toast.error('Failed to create transaction. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
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
              Payment
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span>Grand Total:</span>
            <span>Rp {grandTotal.toLocaleString()}</span>
          </div>
          <TextField
            label="Amount Received"
            type="number"
            fullWidth
            value={paymentDetails.amount}
            onChange={(e) => {
              const amount = parseFloat(e.target.value) || 0;
              setPaymentDetails((prev) => ({
                ...prev,
                amount,
                change: Math.max(amount - grandTotal, 0),
              }));
            }}
            variant="outlined"
            margin="normal"
          />

          <TextField
            type="number"
            fullWidth
            value={paymentDetails.change}
            disabled
            variant="outlined"
            margin="normal"
          />

          <TextField
            select
            label="Payment Method"
            fullWidth
            value={paymentDetails.paymentMethod}
            onChange={(e) =>
              setPaymentDetails((prev) => ({ ...prev, paymentMethod: e.target.value }))
            }
            variant="outlined"
            margin="normal"
          >
            <MenuItem value={PaymentMethod.CASH}>Cash</MenuItem>
            <MenuItem value={PaymentMethod.DEBIT}>Debit</MenuItem>
          </TextField>

          <TextField
            label="General Note"
            value={paymentDetails.note}
            onChange={(e) => setPaymentDetails((prev) => ({ ...prev, note: e.target.value }))}
            fullWidth
            multiline
            rows={2}
            placeholder="Add a general note for this transaction"
            variant="outlined"
            style={{ marginBottom: '20px' }}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleConfirmPayment}
            type="submit"
            variant="contained"
            color="primary"
            disabled={!paymentDetails.paymentMethod || paymentDetails.amount < grandTotal}
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentPopup;

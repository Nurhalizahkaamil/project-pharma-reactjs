import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
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

  const handleCloseAndNavigate = (transactionId: number) => {
    // Tutup dialog popup
    onClose();

    // Jeda sebelum navigasi, beri waktu untuk animasi dialog
    setTimeout(() => {
      // Arahkan ke halaman detail transaksi
      navigate(`/transactions/history/${transactionId}`);
    }, 300); // 300ms untuk memberi waktu animasi
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
        quantity: product.quantity,
        note: product.note,
        price: product.sellingPrice,
      })),
    };

    try {
      // Kirim data transaksi ke server
      const createdTransaction = await createTransaction(transactionPayload);

      if (createdTransaction?.id) {
        // Kirim detail transaksi
        await Promise.all(
          selectedProducts.map((product) =>
            createTransactionDetail({
              productId: product.id,
              quantity: product.quantity,
              note: product.note,
            }),
          ),
        );

        toast.success('Transaction created successfully!');

        // Tutup dialog popup dan arahkan ke halaman transaksi detail
        handleCloseAndNavigate(createdTransaction.id);
      }
    } catch (error) {
      console.error('Error during transaction creation:', error);
      toast.error('Failed to create transaction. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Payment</DialogTitle>
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
          <Button onClick={onClose}>Cancel</Button>
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

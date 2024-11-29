import React from 'react';
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
import {
  PaymentMethod,
  CreateTransactionDto,
  TransactionType,
  CategoryType,
} from 'Dto/transaction/transaction.dto';
import { createTransaction } from 'service/transaction.service';
import { createTransactionDetail } from 'service/transaction.detail.service';
import { ProductDtoOut } from 'Dto/product/product.dto';
import SuccessTransactionDialog from './succes.transaction';

interface SelectedProduct extends ProductDtoOut {
  quantity: number;
  note: string;
}

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
  grandTotal: number;
  paymentDetails: {
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
    change: any;
    amount: any;
    paymentMethod: string;
    note: string;
  }) => void;
  userId: string | null;
  selectedProducts: SelectedProduct[];
  transactionType: TransactionType; // Make transaction type dynamic (e.g., Generic or Prescription)
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({
  open,
  onClose,
  grandTotal,
  paymentDetails,
  setPaymentDetails,
  onPaymentConfirmed,
  userId,
  selectedProducts,
  transactionType,
}) => {
  const [isTransactionSuccess, setIsTransactionSuccess] = React.useState(false);

  const handleConfirmPayment = async () => {
    // Basic validation
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

    // Transaction payload with dynamic transaction type
    const transactionPayload: CreateTransactionDto = {
      paymentMethod: paymentDetails.paymentMethod as PaymentMethod,
      note: paymentDetails.note,
      transactionDate: new Date(),
      userId: userId,
      transactionType: transactionType,
      categoryType: CategoryType.OUT,
      id: 0,
      tax: 0,
      subTotal: 0,
      grandTotal: grandTotal,
      items: [],
    };

    try {
      // Create the main transaction
      const createdTransaction = await createTransaction(transactionPayload);
      if (createdTransaction?.id) {
        // Create transaction details for each product
        await Promise.all(
          selectedProducts.map((product) =>
            createTransactionDetail({
              productId: product.id,
              quantity: product.quantity,
              note: product.note,
            })
          )
        );

        toast.success('Transaction successfully created!');
        setIsTransactionSuccess(true);

        // Call the callback to notify parent component (like TransactionForm)
        onPaymentConfirmed({
          paymentMethod: paymentDetails.paymentMethod,
          note: paymentDetails.note,
          change: undefined,
          amount: undefined,
        });

        onClose();
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
            variant="contained"
            color="primary"
            disabled={!paymentDetails.paymentMethod || paymentDetails.amount < grandTotal}
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <SuccessTransactionDialog
        open={isTransactionSuccess}
        onClose={() => setIsTransactionSuccess(false)}
      />
    </>
  );
};

export default PaymentPopup;

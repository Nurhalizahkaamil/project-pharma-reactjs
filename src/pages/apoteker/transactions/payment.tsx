import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { PaymentMethod } from 'Dto/transaction/transaction.dto';

interface PaymentPopupProps {
  grandTotal: number;
  onClose: () => void;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ grandTotal, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | ''>('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [change, setChange] = useState(0);
  const [error, setError] = useState('');

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setPaymentAmount(amount);
    const calculatedChange = amount - grandTotal;
    setChange(calculatedChange >= 0 ? calculatedChange : 0);
    setError(calculatedChange < 0 ? 'Payment amount is insufficient' : '');
  };

  const handleConfirmPayment = () => {
    if (paymentAmount >= grandTotal) {
      // Logic to save transaction and close pop-up
      console.log('Payment successful');
      onClose();
    } else {
      setError('Payment amount is insufficient');
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
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
              fontSize: '30px',
              color: '#0077B6',
              fontFamily: 'poppins',
              fontWeight: 'bold',
              textAlign: 'left',
              flex: 1,
              lineHeight: '1.2',
            }}
          >
            Payment
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <p
            style={{ color: '#6b7280', fontSize: '18px', marginBottom: '18px', marginTop: '16px' }}
          >
            Complete your payment method
          </p>
        </Box>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <TextField
            label="Grand Total"
            value={grandTotal.toLocaleString()}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            variant="outlined"
            style={{ borderRadius: '8px', backgroundColor: '#f3f4f6' }}
          />
          <TextField
            label="Payment"
            type="number"
            value={paymentAmount}
            onChange={handlePaymentChange}
            fullWidth
            variant="outlined"
            style={{ borderRadius: '8px', backgroundColor: '#f3f4f6', marginBottom: '16px' }}
          />
          <TextField
            select
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            fullWidth
            variant="outlined"
            style={{ borderRadius: '8px', backgroundColor: '#f3f4f6' }}
          >
            <MenuItem value="">-- choose --</MenuItem>
            {Object.values(PaymentMethod).map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <TextField
            label="Change"
            value={change.toLocaleString()}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            variant="outlined"
            style={{ borderRadius: '8px', backgroundColor: '#f3f4f6' }}
          />
          <TextField
            label="Notes"
            value={''}
            fullWidth
            variant="outlined"
            style={{ borderRadius: '8px', backgroundColor: '#f3f4f6' }}
          />

          <Button
            onClick={handleConfirmPayment}
            variant="contained"
            style={{
              backgroundColor: '#34D399',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '8px',
            }}
          >
            Pays
          </Button>
        </div>

        {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentPopup;

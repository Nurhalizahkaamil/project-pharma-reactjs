import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button, Box, Typography } from '@mui/material';
import CheckCircleIcon from 'assets/succesicon.png';

interface SuccessTransactionDialogProps {
  open: boolean;
  onClose: () => void;
}

const SuccessTransactionDialog: React.FC<SuccessTransactionDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '24px',
        },
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        {/* Success Icon */}
        <Box sx={{ marginBottom: '16px' }}>
          <img
            src={CheckCircleIcon} // Ganti dengan ikon peringatan yang diinginkan
            alt="warning icon"
            style={{ width: '48px', height: '48px' }}
          />
        </Box>

        {/* Title */}
        <DialogTitle
          sx={{ padding: '0px', fontSize: '20px', fontWeight: 'bold', color: '#25282B' }}
        >
          Transaction Success
        </DialogTitle>

        {/* Subtitle */}
        <Typography
          sx={{ fontSize: '14px', color: '#73767A', marginTop: '8px', marginBottom: '24px' }}
        >
          Please choose to only save or print pharmacy receipts.
        </Typography>

        {/* OK Button */}
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              padding: '8px 16px',
              borderRadius: '8px',
              color: '#4A57FF',
              borderColor: '#4A57FF',
              '&:hover': {
                backgroundColor: 'rgba(74, 87, 255, 0.1)',
                borderColor: '#4A57FF',
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default SuccessTransactionDialog;

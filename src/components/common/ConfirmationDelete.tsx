import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button, Box } from '@mui/material';
import WarningIcon from 'assets/VectorIcon.png';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '16px',
        },
      }}
    >
      <Box sx={{ position: 'relative', textAlign: 'center' }}>
        {/* Warning Icon */}
        <Box sx={{ marginBottom: '16px' }}>
          <img
            src={WarningIcon} // Ganti dengan ikon peringatan yang diinginkan
            alt="warning icon"
            style={{ width: '48px', height: '48px' }}
          />
        </Box>

        {/* Title */}
        <DialogTitle sx={{ paddingBottom: '0px', fontSize: '18px', fontWeight: 'bold' }}>
          {title}
        </DialogTitle>

        {/* Actions */}
        <DialogActions sx={{ justifyContent: 'center', marginTop: '16px' }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              marginRight: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              color: '#2A8DDA',
              borderColor: '#2A8DDA',
              '&:hover': {
                backgroundColor: 'rgba(42, 141, 218, 0.1)', // Background hover untuk tombol Cancel
                borderColor: '#2A8DDA',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#E50C10',
              '&:hover': {
                backgroundColor: '#D10B0C',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmationDialog;

// components/common/DeleteConfirmationDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box
} from '@mui/material';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  content?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = "Confirmation de suppression",
  content = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          disabled={loading}
          color="primary"
        >
          Annuler
        </Button>
        <Button 
          onClick={onConfirm} 
          disabled={loading}
          color="error"
          variant="contained"
          autoFocus
        >
          {loading ? (
            <Box display="flex" alignItems="center">
              <CircularProgress size={16} sx={{ mr: 1 }} />
              Suppression...
            </Box>
          ) : (
            'Supprimer'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
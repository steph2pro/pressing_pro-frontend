// components/notifications/NotificationDialog.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Box,
  IconButton
} from '@mui/material';
import {
  X as CloseIcon,
  Trash as DeleteIcon,
  MailCheck as MarkReadIcon,
} from "lucide-react";
import { Notification, StatutNotification, PrioriteAlerte, TypeAlerte } from '../../../data/models/notifications';
import { useUpdateNotification } from '../../hooks/notifications/useUpdateNotification';
import { useDeleteNotification } from '../../hooks/notifications/useDeleteNotification';

interface NotificationDialogProps {
  open: boolean;
  notification: Notification | null;
  onClose: () => void;
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({
  open,
  notification,
  onClose
}) => {
  const { updateNotification, loading: updateLoading } = useUpdateNotification();
  const { deleteNotification, loading: deleteLoading } = useDeleteNotification();

  const handleMarkAsRead = async () => {
    if (notification) {
      await updateNotification(notification.id, { statut: StatutNotification.LU });
      onClose();
    }
  };

  const handleDelete = async () => {
    if (notification) {
      await deleteNotification(notification.id);
      onClose();
    }
  };

  const getTypeLabel = (type: TypeAlerte) => {
    const typeLabels: Record<TypeAlerte, string> = {
      [TypeAlerte.STOCK_FAIBLE]: 'Stock faible',
      [TypeAlerte.VENTE_EXCEPTIONNELLE]: 'Vente exceptionnelle',
      [TypeAlerte.DEPENSE_ELEVEE]: 'Dépense élevée',
      [TypeAlerte.APPROVISIONNEMENT_RETARD]: 'Approvisionnement retard',
      [TypeAlerte.SECURITE]: 'Sécurité',
      [TypeAlerte.INVENTAIRE]: 'Inventaire',
      [TypeAlerte.MAINTENANCE]: 'Maintenance'
    };
    return typeLabels[type];
  };

  const getPrioriteColor = (priorite: PrioriteAlerte) => {
    switch (priorite) {
      case PrioriteAlerte.URGENTE: return 'error';
      case PrioriteAlerte.HAUTE: return 'warning';
      case PrioriteAlerte.MOYENNE: return 'info';
      case PrioriteAlerte.BASSE: return 'success';
      default: return 'default';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!notification) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Détail de la notification</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* En-tête avec badges */}
        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
          <Chip
            label={getTypeLabel(notification.type)}
            variant="outlined"
            size="small"
          />
          <Chip
            label={notification.priorite}
            color={getPrioriteColor(notification.priorite)}
            size="small"
          />
          {notification.statut === StatutNotification.NON_LU && (
            <Chip
              label="Non lu"
              color="primary"
              size="small"
            />
          )}
        </Box>

        {/* Titre */}
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            fontWeight: notification.statut === StatutNotification.NON_LU ? 'bold' : 'normal'
          }}
        >
          {notification.titre}
        </Typography>

        {/* Message */}
        <Box
          sx={{
            p: 2,
            backgroundColor: 'grey.50',
            borderRadius: 1,
            mb: 2
          }}
        >
          <Typography variant="body1">
            {notification.message}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Métadonnées */}
        <Stack spacing={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Date de création:
            </Typography>
            <Typography variant="body2">
              {formatDate(notification.dateCreation)}
            </Typography>
          </Box>
          {notification.dateLecture && (
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Date de lecture:
              </Typography>
              <Typography variant="body2">
                {formatDate(notification.dateLecture)}
              </Typography>
            </Box>
          )}
          {notification.lien && (
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Lien associé:
              </Typography>
              <Button
                variant="text"
                size="small"
                href={notification.lien}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ouvrir
              </Button>
            </Box>
          )}
        </Stack>

        {/* Données supplémentaires */}
        {notification.donnees && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Données supplémentaires
            </Typography>
            <Box
              sx={{
                p: 2,
                backgroundColor: 'grey.50',
                borderRadius: 1,
                maxHeight: 200,
                overflow: 'auto'
              }}
            >
              <pre style={{ margin: 0, fontSize: '0.875rem' }}>
                {JSON.stringify(notification.donnees, null, 2)}
              </pre>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Stack direction="row" spacing={1} justifyContent="space-between" width="100%">
          <Box>
            {notification.statut === StatutNotification.NON_LU && (
              <Button
                startIcon={<MarkReadIcon />}
                onClick={handleMarkAsRead}
                disabled={updateLoading}
              >
                Marquer comme lu
              </Button>
            )}
          </Box>
          <Box>
            <Button onClick={onClose}>
              Fermer
            </Button>
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              Supprimer
            </Button>
          </Box>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationDialog;
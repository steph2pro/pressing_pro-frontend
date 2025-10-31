// pages/NotificationDetail.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  Grid
} from '@mui/material';
import {
  ArrowLeft as ArrowBackIcon,
  Trash as DeleteIcon,
  MailCheck as MarkReadIcon,
} from "lucide-react";
import { useNotificationById } from '../../../presentation/hooks/notifications/useNotificationById';
import { useUpdateNotification } from '../../../presentation/hooks/notifications/useUpdateNotification';
import { useDeleteNotification } from '../../../presentation/hooks/notifications/useDeleteNotification';
import { StatutNotification, PrioriteAlerte, TypeAlerte } from '../../../data/models/notifications';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';


const NotificationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const notificationId = parseInt(id || '0');

  const { notification, isLoading, isError, error } = useNotificationById(notificationId);
  const { updateNotification, loading: updateLoading } = useUpdateNotification();
  const { deleteNotification, loading: deleteLoading, error: deleteError } = useDeleteNotification();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  // Marquer comme lu lors de l'ouverture de la page
  useEffect(() => {
    if (notification && notification.statut === StatutNotification.NON_LU) {
      updateNotification(notification.id, { statut: StatutNotification.LU });
    }
  }, [notification, updateNotification]);

  const handleBack = () => {
    navigate('/notifications');
  };

  const handleMarkAsRead = async () => {
    if (notification) {
      await updateNotification(notification.id, { statut: StatutNotification.LU });
    }
  };

  const handleMarkAsUnread = async () => {
    if (notification) {
      await updateNotification(notification.id, { statut: StatutNotification.NON_LU });
    }
  };

  const handleArchive = async () => {
    if (notification) {
      await updateNotification(notification.id, { statut: StatutNotification.ARCHIVE });
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (notification) {
      await deleteNotification(notification.id);
      setDeleteDialogOpen(false);
      navigate('/notifications');
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

  const getStatutColor = (statut: StatutNotification) => {
    switch (statut) {
      case StatutNotification.NON_LU: return 'primary';
      case StatutNotification.LU: return 'default';
      case StatutNotification.ARCHIVE: return 'secondary';
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

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !notification) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error?.message || 'Notification non trouvée'}
      </Alert>
    );
  }

  return (
    <Box>
      {/* En-tête */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          Retour
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          Détail de la Notification
        </Typography>
        <Stack direction="row" spacing={1}>
          {notification.statut === StatutNotification.NON_LU && (
            <Button
              variant="outlined"
              startIcon={<MarkReadIcon />}
              onClick={handleMarkAsRead}
              disabled={updateLoading}
            >
              Marquer comme lu
            </Button>
          )}
          {notification.statut === StatutNotification.LU && (
            <Button
              variant="outlined"
              onClick={handleMarkAsUnread}
              disabled={updateLoading}
            >
              Marquer comme non lu
            </Button>
          )}
          {notification.statut !== StatutNotification.ARCHIVE && (
            <Button
              variant="outlined"
              onClick={handleArchive}
              disabled={updateLoading}
            >
              Archiver
            </Button>
          )}
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
            disabled={deleteLoading}
          >
            Supprimer
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Contenu principal */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {notification.titre}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={getTypeLabel(notification.type)}
                    variant="outlined"
                  />
                  <Chip
                    label={notification.priorite}
                    color={getPrioriteColor(notification.priorite)}
                  />
                  <Chip
                    label={notification.statut}
                    color={getStatutColor(notification.statut)}
                  />
                </Stack>
              </Box>

              <Paper variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: 'grey.50' }}>
                <Typography variant="body1">
                  {notification.message}
                </Typography>
              </Paper>

              {/* Données supplémentaires */}
              {notification.donnees && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Données supplémentaires
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <pre style={{ margin: 0, fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                      {JSON.stringify(notification.donnees, null, 2)}
                    </pre>
                  </Paper>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Métadonnées */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Informations */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Informations
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date de création
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(notification.dateCreation)}
                    </Typography>
                  </Box>
                  {notification.dateLecture && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Date de lecture
                      </Typography>
                      <Typography variant="body1">
                        {formatDate(notification.dateLecture)}
                      </Typography>
                    </Box>
                  )}
                  {notification.utilisateurId && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Utilisateur
                      </Typography>
                      <Typography variant="body1">
                        ID: {notification.utilisateurId}
                      </Typography>
                    </Box>
                  )}
                  {notification.lien && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Lien associé
                      </Typography>
                      <Button
                        variant="text"
                        href={notification.lien}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ouvrir le lien
                      </Button>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Actions
                </Typography>
                <Stack spacing={1}>
                  {notification.statut === StatutNotification.NON_LU && (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<MarkReadIcon />}
                      onClick={handleMarkAsRead}
                      disabled={updateLoading}
                    >
                      Marquer comme lu
                    </Button>
                  )}
                  {notification.statut === StatutNotification.LU && (
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleMarkAsUnread}
                      disabled={updateLoading}
                    >
                      Marquer comme non lu
                    </Button>
                  )}
                  {notification.statut !== StatutNotification.ARCHIVE && (
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleArchive}
                      disabled={updateLoading}
                    >
                      Archiver
                    </Button>
                  )}
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteClick}
                    disabled={deleteLoading}
                  >
                    Supprimer
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Supprimer la notification"
        content={`Êtes-vous sûr de vouloir supprimer la notification "${notification.titre}" ? Cette action est irréversible.`}
      />

      {deleteError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {deleteError}
        </Alert>
      )}
    </Box>
  );
};

export default NotificationDetail;
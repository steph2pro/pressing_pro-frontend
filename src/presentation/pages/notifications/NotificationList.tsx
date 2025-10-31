// pages/NotificationList.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stack,
  Pagination,
  CircularProgress,
  Alert,
  Badge,
  Divider
} from '@mui/material';
import {
  Trash as DeleteIcon,
  MailCheck as MarkReadIcon,
  Settings as SettingsIcon,
  Filter as FilterIcon
} from "lucide-react";
import { useNotifications } from '../../../presentation/hooks/notifications/useNotifications';
import { useDeleteNotification } from '../../../presentation/hooks/notifications/useDeleteNotification';
import { useMarkAllAsRead } from '../../../presentation/hooks/notifications/useMarkAllAsRead';
import { useUnreadCount } from '../../../presentation/hooks/notifications/useUnreadCount';
import { Notification, TypeAlerte, StatutNotification, PrioriteAlerte } from '../../../data/models/notifications';
import NotificationDialog from './NotificationDialog';
import AlertConfigDialog from './AlertConfigDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';


const NotificationList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState<TypeAlerte | ''>('');
  const [statutFilter, setStatutFilter] = useState<StatutNotification | ''>('');
  const [prioriteFilter, setPrioriteFilter] = useState<PrioriteAlerte | ''>('');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [notificationToDelete, setNotificationToDelete] = useState<Notification | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);

  const { notifications, total, pages, isLoading, isError, error, updateParams } = useNotifications({
    page,
    limit: 10,
    type: typeFilter || undefined,
    statut: statutFilter || undefined,
    priorite: prioriteFilter || undefined
  });

  const { unreadCount } = useUnreadCount({ refetchInterval: 30000 });
  const { deleteNotification, loading: deleteLoading, error: deleteError } = useDeleteNotification();
  const { markAllAsRead, loading: markAllLoading, error: markAllError } = useMarkAllAsRead();

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    updateParams({ page: value });
  };

  const handleTypeFilter = (event: any) => {
    const value = event.target.value;
    setTypeFilter(value);
    setPage(1);
    updateParams({ type: value || undefined, page: 1 });
  };

  const handleStatutFilter = (event: any) => {
    const value = event.target.value;
    setStatutFilter(value);
    setPage(1);
    updateParams({ statut: value || undefined, page: 1 });
  };

  const handlePrioriteFilter = (event: any) => {
    const value = event.target.value;
    setPrioriteFilter(value);
    setPage(1);
    updateParams({ priorite: value || undefined, page: 1 });
  };

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const handleDeleteClick = (notification: Notification) => {
    setNotificationToDelete(notification);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (notificationToDelete) {
      await deleteNotification(notificationToDelete.id);
      setDeleteDialogOpen(false);
      setNotificationToDelete(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    // Récupérer l'ID utilisateur depuis le contexte d'authentification
    const utilisateurId = 1; // À remplacer par l'ID réel de l'utilisateur
    await markAllAsRead({ utilisateurId });
  };

  const handleOpenConfig = () => {
    setConfigDialogOpen(true);
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

  if (isError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Erreur lors du chargement des notifications: {error?.message}
      </Alert>
    );
  }

  return (
    <Box>
      {/* En-tête avec compteurs */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Notifications
          </Typography>
          <Box display="flex" gap={2} alignItems="center">
            <Badge badgeContent={unreadCount.total} color="error" showZero={false}>
              <Typography variant="body1" color="text.secondary">
                Non lues: {unreadCount.total}
              </Typography>
            </Badge>
            <Typography variant="body2" color="text.secondary">
              Urgentes: {unreadCount.parPriorite.urgente}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hautes: {unreadCount.parPriorite.haute}
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<MarkReadIcon />}
            onClick={handleMarkAllAsRead}
            disabled={markAllLoading || unreadCount.total === 0}
          >
            Tout marquer comme lu
          </Button>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={handleOpenConfig}
          >
            Configuration
          </Button>
        </Stack>
      </Box>

      {/* Filtres */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <FilterIcon color="action" />
            <Typography variant="h6">Filtres</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={typeFilter} onChange={handleTypeFilter} label="Type">
                  <MenuItem value="">Tous les types</MenuItem>
                  {Object.values(TypeAlerte).map(type => (
                    <MenuItem key={type} value={type}>
                      {getTypeLabel(type)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select value={statutFilter} onChange={handleStatutFilter} label="Statut">
                  <MenuItem value="">Tous les statuts</MenuItem>
                  <MenuItem value={StatutNotification.NON_LU}>Non lu</MenuItem>
                  <MenuItem value={StatutNotification.LU}>Lu</MenuItem>
                  <MenuItem value={StatutNotification.ARCHIVE}>Archivé</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Priorité</InputLabel>
                <Select value={prioriteFilter} onChange={handlePrioriteFilter} label="Priorité">
                  <MenuItem value="">Toutes les priorités</MenuItem>
                  <MenuItem value={PrioriteAlerte.URGENTE}>Urgente</MenuItem>
                  <MenuItem value={PrioriteAlerte.HAUTE}>Haute</MenuItem>
                  <MenuItem value={PrioriteAlerte.MOYENNE}>Moyenne</MenuItem>
                  <MenuItem value={PrioriteAlerte.BASSE}>Basse</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Liste des notifications */}
      <Stack spacing={2}>
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            sx={{ 
              borderLeft: 4,
              borderLeftColor: getPrioriteColor(notification.priorite),
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
            onClick={() => handleViewNotification(notification)}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box flex={1}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Typography 
                      variant="h6" 
                      component="h2"
                      sx={{ 
                        fontWeight: notification.statut === StatutNotification.NON_LU ? 'bold' : 'normal'
                      }}
                    >
                      {notification.titre}
                    </Typography>
                    <Chip
                      label={getTypeLabel(notification.type)}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={notification.priorite}
                      color={getPrioriteColor(notification.priorite)}
                      size="small"
                    />
                    <Chip
                      label={notification.statut}
                      color={getStatutColor(notification.statut)}
                      size="small"
                    />
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {notification.message}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {formatDate(notification.dateCreation)}
                    {notification.dateLecture && ` • Lu le ${formatDate(notification.dateLecture)}`}
                  </Typography>
                </Box>

                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(notification);
                  }}
                  color="error"
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Pagination */}
      {pages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={pages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Dialog de détail */}
      <NotificationDialog
        open={!!selectedNotification}
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />

      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Supprimer la notification"
        content={`Êtes-vous sûr de vouloir supprimer la notification "${notificationToDelete?.titre}" ?`}
      />

      {/* Dialog de configuration des alertes */}
      <AlertConfigDialog
        open={configDialogOpen}
        onClose={() => setConfigDialogOpen(false)}
      />

      {/* Messages d'erreur */}
      {deleteError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {deleteError}
        </Alert>
      )}
      {markAllError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {markAllError}
        </Alert>
      )}
    </Box>
  );
};

export default NotificationList;
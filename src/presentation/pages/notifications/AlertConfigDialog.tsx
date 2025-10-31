// components/notifications/AlertConfigDialog.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Stack,
  Divider,
  Box,
  IconButton,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import {
  X as CloseIcon,
  Save as SaveIcon,
} from "lucide-react";

import { useAlertConfigurations } from '../../hooks/notifications/useAlertConfigurations';
import { useUpdateAlertConfiguration } from '../../hooks/notifications/useUpdateAlertConfiguration';
import { ConfigurationAlerte, TypeAlerte } from '../../../data/models/notifications';
import { UserRole } from '../../../data/models/users';

interface AlertConfigDialogProps {
  open: boolean;
  onClose: () => void;
}

const AlertConfigDialog: React.FC<AlertConfigDialogProps> = ({
  open,
  onClose
}) => {
  const { alertConfigurations, isLoading, isError, error } = useAlertConfigurations();
  const { updateAlertConfiguration, loading: updateLoading, error: updateError } = useUpdateAlertConfiguration();
  
  const [editedConfigs, setEditedConfigs] = useState<Record<number, Partial<ConfigurationAlerte>>>({});

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

  const getTypeDescription = (type: TypeAlerte) => {
    const descriptions: Record<TypeAlerte, string> = {
      [TypeAlerte.STOCK_FAIBLE]: 'Alerte lorsque le stock d\'un produit est faible',
      [TypeAlerte.VENTE_EXCEPTIONNELLE]: 'Alerte en cas de ventes exceptionnelles',
      [TypeAlerte.DEPENSE_ELEVEE]: 'Alerte pour les dépenses élevées',
      [TypeAlerte.APPROVISIONNEMENT_RETARD]: 'Alerte pour les retards d\'approvisionnement',
      [TypeAlerte.SECURITE]: 'Alertes de sécurité système',
      [TypeAlerte.INVENTAIRE]: 'Alertes liées à l\'inventaire',
      [TypeAlerte.MAINTENANCE]: 'Alertes de maintenance'
    };
    return descriptions[type];
  };

  const handleConfigChange = (configId: number, field: keyof ConfigurationAlerte, value: any) => {
    setEditedConfigs(prev => ({
      ...prev,
      [configId]: {
        ...prev[configId],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    const savePromises = Object.entries(editedConfigs).map(([configId, changes]) =>
      updateAlertConfiguration(parseInt(configId), changes)
    );

    await Promise.all(savePromises);
    setEditedConfigs({});
    onClose();
  };

  const hasChanges = Object.keys(editedConfigs).length > 0;

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Configuration des Alertes</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Erreur lors du chargement des configurations: {error?.message}
          </Alert>
        )}

        {updateError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {updateError}
          </Alert>
        )}

        <Stack spacing={3}>
          {alertConfigurations.map((config) => {
            const editedConfig = editedConfigs[config.id] || {};
            const currentConfig = { ...config, ...editedConfig };

            return (
              <Box key={config.id}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Box>
                    <Typography variant="h6">
                      {getTypeLabel(config.type)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getTypeDescription(config.type)}
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={currentConfig.active}
                        onChange={(e) => handleConfigChange(config.id, 'active', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Activée"
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  {/* Seuil */}
                  {config.seuil !== undefined && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Seuil"
                        type="number"
                        value={currentConfig.seuil || ''}
                        onChange={(e) => handleConfigChange(config.id, 'seuil', parseInt(e.target.value) || 0)}
                        disabled={!currentConfig.active}
                      />
                    </Grid>
                  )}

                  {/* Canaux de notification */}
                  <Grid item xs={12} sm={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={currentConfig.notificationEmail}
                            onChange={(e) => handleConfigChange(config.id, 'notificationEmail', e.target.checked)}
                            disabled={!currentConfig.active}
                          />
                        }
                        label="Notification Email"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={currentConfig.notificationSystem}
                            onChange={(e) => handleConfigChange(config.id, 'notificationSystem', e.target.checked)}
                            disabled={!currentConfig.active}
                          />
                        }
                        label="Notification Système"
                      />
                    </FormGroup>
                  </Grid>

                  {/* Destinataires */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Destinataires</InputLabel>
                      <Select
                        multiple
                        value={currentConfig.destinataires}
                        onChange={(e) => handleConfigChange(config.id, 'destinataires', e.target.value)}
                        disabled={!currentConfig.active}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {Object.values(UserRole).map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Annuler
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={!hasChanges || updateLoading}
        >
          {updateLoading ? <CircularProgress size={20} /> : 'Sauvegarder'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertConfigDialog;
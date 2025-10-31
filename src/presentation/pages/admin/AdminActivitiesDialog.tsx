import React, { useState } from 'react'
import { X, Download, Filter, Calendar } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Badge } from '../../components/Badge'
import { useAdminActivities } from '../../../presentation/hooks/admin/useAdminActivities'
import { useExportAdminActivities } from '../../../presentation/hooks/admin/useExportAdminActivities'
import { useAdmins } from '../../../presentation/hooks/admin/useAdmins'
import { formatDate } from '../../../lib/utils'
import { getActionDisplayName, getModuleDisplayName, getActionBadgeVariant } from '../../../lib/adminUtils'

interface AdminActivitiesDialogProps {
  onClose: () => void
}

export const AdminActivitiesDialog: React.FC<AdminActivitiesDialogProps> = ({ onClose }) => {
  const [filters, setFilters] = useState({
    adminId: '',
    action: '',
    module: '',
    page: 1,
    limit: 10
  })

  const { activities, isLoading, total, page, pages, refetch } = useAdminActivities({
    params: filters,
    enabled: true
  })

  const { admins } = useAdmins({ enabled: true })
  const { exportActivities, loading: exportLoading } = useExportAdminActivities()

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value, page: 1 }
    setFilters(newFilters)
  }

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }))
  }

  const handleExport = () => {
    exportActivities(filters)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden"
        style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          borderWidth: '1px'
        }}
      >
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Journal des Activités Administrateurs
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {total} activité(s) enregistrée(s)
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleExport}
              disabled={exportLoading}
              variant="outline"
              style={{ 
                borderColor: 'var(--ubuntu-orange, #E95420)',
                color: 'var(--ubuntu-orange, #E95420)'
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              {exportLoading ? 'Export...' : 'Exporter'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filtres */}
        <div className="p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Administrateur
              </label>
              <Select
                value={filters.adminId}
                onChange={(e) => handleFilterChange('adminId', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les administrateurs</option>
                {admins.map(admin => (
                  <option key={admin.id} value={admin.id.toString()}>
                    {admin.nom}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Action
              </label>
              <Select
                value={filters.action}
                onChange={(e) => handleFilterChange('action', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Toutes les actions</option>
                <option value="CONNEXION">Connexion</option>
                <option value="DECONNEXION">Déconnexion</option>
                <option value="CREATION">Création</option>
                <option value="MODIFICATION">Modification</option>
                <option value="SUPPRESSION">Suppression</option>
                <option value="EXPORT">Export</option>
                <option value="IMPORT">Import</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Module
              </label>
              <Select
                value={filters.module}
                onChange={(e) => handleFilterChange('module', e.target.value)}
                style={{
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                }}
              >
                <option value="">Tous les modules</option>
                <option value="Authentification">Authentification</option>
                <option value="Gestion des utilisateurs">Utilisateurs</option>
                <option value="Gestion des produits">Produits</option>
                <option value="Gestion des catégories">Catégories</option>
                <option value="Gestion des stocks">Stocks</option>
                <option value="Gestion des ventes">Ventes</option>
                <option value="Rapports">Rapports</option>
                <option value="Paramètres système">Paramètres</option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => refetch()}
                variant="outline"
                className="w-full"
                style={{ 
                  borderColor: 'var(--ubuntu-orange, #E95420)',
                  color: 'var(--ubuntu-orange, #E95420)'
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Appliquer
              </Button>
            </div>
          </div>
        </div>

        {/* Liste des activités */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <LoadingSpinner size="lg" />
            </div>
          ) : activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          {activity.admin.nom}
                        </div>
                        <Badge variant={getActionBadgeVariant(activity.action)}>
                          {getActionDisplayName(activity.action)}
                        </Badge>
                        <Badge variant="outline">
                          {getModuleDisplayName(activity.module)}
                        </Badge>
                      </div>
                      
                      {activity.details && (
                        <p className="text-sm mb-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          {activity.details}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(activity.timestamp)}</span>
                        </div>
                        {activity.ipAddress && (
                          <span>IP: {activity.ipAddress}</span>
                        )}
                        {activity.userAgent && (
                          <span className="truncate max-w-xs">{activity.userAgent}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucune activité trouvée</p>
              <p className="text-sm mt-1">Ajustez vos filtres pour voir plus de résultats</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between p-6 border-t" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
            <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Page {page} sur {pages} • {total} activité(s)
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pages}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
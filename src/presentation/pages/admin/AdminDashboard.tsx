import React, { useState } from 'react'
import { Shield, Users, Activity, Eye, Download, Filter, Calendar, BarChart3, Key, UserCheck, UserX } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Badge } from '../../components/Badge'
import { useAdmins } from '../../../presentation/hooks/admin/useAdmins'
import { useAdminStatistics } from '../../../presentation/hooks/admin/useAdminStatistics'
import { useAdminActivities } from '../../../presentation/hooks/admin/useAdminActivities'
import { useExportAdminActivities } from '../../../presentation/hooks/admin/useExportAdminActivities'
import { UserRole } from '../../../data/models/users'
import { formatDate } from '../../../lib/utils'
import { getAdminRoleDisplayName, getActionDisplayName, getModuleDisplayName, getActionBadgeVariant } from '../../../lib/adminUtils'

import { AdminActivitiesDialog } from './AdminActivitiesDialog'


export const AdminDashboard: React.FC = () => {
  const [activityFilters, setActivityFilters] = useState({
    adminId: '',
    action: '',
    module: '',
    page: 1,
    limit: 5
  })

  const [selectedAdmin, setSelectedAdmin] = useState<any>(null)
  const [activitiesDialogOpen, setActivitiesDialogOpen] = useState(false)

  const { admins, isLoading: adminsLoading } = useAdmins({ enabled: true })
  const { statistics, isLoading: statsLoading } = useAdminStatistics({ enabled: true })
  const { activities, isLoading: activitiesLoading } = useAdminActivities({
    params: activityFilters,
    enabled: true
  })

  const { exportActivities, loading: exportLoading } = useExportAdminActivities()

  const handleFilterChange = (key: string, value: string) => {
    setActivityFilters(prev => ({ ...prev, [key]: value, page: 1 }))
  }

  const handleViewAdmin = (admin: any) => {
    setSelectedAdmin(admin)
  }

  const handleCloseAdminDetails = () => {
    setSelectedAdmin(null)
  }

  const handleExportActivities = () => {
    exportActivities(activityFilters)
  }

  const handleViewAllActivities = () => {
    setActivitiesDialogOpen(true)
  }

  if (statsLoading || adminsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6" style={{ 
      backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)',
      minHeight: '100vh'
    }}>
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Tableau de Bord Administrateurs
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Supervision des administrateurs et de leurs activités
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleExportActivities}
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
            onClick={handleViewAllActivities}
            style={{ 
              backgroundColor: 'var(--ubuntu-aubergine, #772953)',
              color: 'var(--ubuntu-white, #FFFFFF)'
            }}
          >
            <Activity className="w-4 h-4 mr-2" />
            Voir toutes les activités
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      {statistics && (
        <div className="grid gap-6 md:grid-cols-4">
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Total Admins
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.totalAdmins}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-orange, #E95420)' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Admins Actifs
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.activeAdmins}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-aubergine, #772953)' }}>
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Super Admins
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.superAdmins}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-light-orange, #F6B024)' }}>
                  <Key className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Admins Inactifs
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {statistics.inactiveAdmins}
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  <UserX className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Liste des administrateurs */}
        <Card className="lg:col-span-1" style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Administrateurs
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {admins.length} administrateur(s) enregistré(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="p-3 border rounded-lg hover:border-orange-300 cursor-pointer transition-colors"
                  onClick={() => handleViewAdmin(admin)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {admin.nom}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        {admin.email}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        admin.role === UserRole.ADMIN ? 'error' :
                        admin.role === UserRole.DIRECTOR ? 'warning' : 'info'
                      }>
                        {getAdminRoleDisplayName(admin.role as any)}
                      </Badge>
                      <Eye className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Dernière connexion: {admin.lastLogin ? formatDate(admin.lastLogin) : 'Jamais'}
                    </div>
                    <Badge variant={admin.statut === 'active' ? 'success' : 'error'}>
                      {admin.statut === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activités récentes et statistiques */}
        <Card className="lg:col-span-2" style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
                  Activités Récentes
                </CardTitle>
                <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  Dernières actions des administrateurs
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={activityFilters.action}
                  onChange={(e) => handleFilterChange('action', e.target.value)}
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  <option value="">Toutes les actions</option>
                  <option value="CONNEXION">Connexion</option>
                  <option value="CREATION">Création</option>
                  <option value="MODIFICATION">Modification</option>
                  <option value="SUPPRESSION">Suppression</option>
                  <option value="EXPORT">Export</option>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activitiesLoading ? (
                <div className="flex items-center justify-center h-32">
                  <LoadingSpinner size="md" />
                </div>
              ) : activities.length > 0 ? (
                <>
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="p-2 rounded-full bg-gray-100 mt-0.5">
                        <Activity className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                            {activity.admin.nom}
                          </div>
                          <Badge variant={getActionBadgeVariant(activity.action)}>
                            {getActionDisplayName(activity.action)}
                          </Badge>
                        </div>
                        <div className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          {getModuleDisplayName(activity.module)}
                          {activity.details && ` • ${activity.details}`}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                            {formatDate(activity.timestamp)}
                          </div>
                          {activity.ipAddress && (
                            <div className="text-xs" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                              IP: {activity.ipAddress}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-8" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune activité récente</p>
                </div>
              )}
            </div>

            {/* Statistiques d'utilisation des permissions */}
            {statistics && (
              <div className="mt-8">
                <h3 className="font-medium mb-4 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                  Utilisation des Permissions
                </h3>
                <div className="space-y-3">
                  {statistics.permissionUsage.slice(0, 5).map((usage) => (
                    <div key={usage.permission} className="flex items-center justify-between">
                      <div className="text-sm" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {usage.permission}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${usage.percentage}%` }}
                          />
                        </div>
                        <div className="text-sm w-12 text-right" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          {usage.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogues */}
      

      {activitiesDialogOpen && (
        <AdminActivitiesDialog
          onClose={() => setActivitiesDialogOpen(false)}
        />
      )}
    </div>
  )
}
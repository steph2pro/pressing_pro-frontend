import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Mail, Phone, Calendar, User, Shield, Activity, MapPin, Building, BadgeCheck, Clock, AlertCircle, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { useUserById } from '../../../presentation/hooks/users/useUserById'
import { useAdminActivities } from '../../../presentation/hooks/admin/useAdminActivities'
import { formatDate, formatRelativeTime } from '../../../lib/utils'
import { getRoleDisplayName, getStatusDisplayName, getStatusBadgeVariant, getRoleBadgeVariant } from '../../../lib/permissions'
import { getActionDisplayName, getModuleDisplayName, getActionBadgeVariant } from '../../../lib/adminUtils'

export const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = parseInt(id || '0')

  const { user, isLoading, isError, error, refetch } = useUserById(userId)
  
  const { activities } = useAdminActivities({
    params: { 
      adminId: userId,
      limit: 10 
    },
    enabled: true
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
            {error?.message || 'Utilisateur non trouvé'}
          </p>
          <Button onClick={() => navigate('/users')} className="mt-4">
            Retour à la liste
          </Button>
        </div>
      </div>
    )
  }

  const userActivities = activities.filter(activity => activity.adminId === userId)

  return (
    <div className="space-y-6 p-6" style={{ 
      backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)',
      minHeight: '100vh'
    }}>
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/users')}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {user.nom}
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Profil utilisateur détaillé
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/users/${user.id}/edit`)}
            style={{ 
              borderColor: 'var(--ubuntu-orange, #E95420)',
              color: 'var(--ubuntu-orange, #E95420)'
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar - Informations principales */}
        <div className="lg:col-span-1 space-y-6">
          {/* Carte profil */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  {user.nom}
                </h2>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {getRoleDisplayName(user.role)}
                </Badge>
                <Badge variant={getStatusBadgeVariant(user.statut)}>
                  {getStatusDisplayName(user.statut)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Statut et activité */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Statut
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Dernière connexion</span>
                <div className="text-right">
                  <div className="text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {user.lastLogin ? formatRelativeTime(user.lastLogin) : 'Jamais'}
                  </div>
                  {user.lastLogin && (
                    <div className="text-xs" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      {formatDate(user.lastLogin)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Membre depuis</span>
                <div className="text-right">
                  <div className="text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    {formatRelativeTime(user.dateCreation)}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    {formatDate(user.dateCreation)}
                  </div>
                </div>
              </div>

              {user.dateModification && (
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>Dernière modification</span>
                  <div className="text-right">
                    <div className="text-sm font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {formatRelativeTime(user.dateModification)}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      {formatDate(user.dateModification)}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
          }}>
            <CardHeader>
              <CardTitle className="text-sm">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(`/users/${user.id}/edit`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier le profil
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(`/users/${user.id}/permissions`)}
              >
                <Shield className="w-4 h-4 mr-2" />
                Gérer les permissions
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => refetch()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="informations" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="informations">Informations</TabsTrigger>
              <TabsTrigger value="activites">Activités</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>

            {/* Onglet Informations */}
            <TabsContent value="informations" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Informations personnelles */}
                <Card style={{ 
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                      Informations Personnelles
                    </CardTitle>
                    <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Détails de l'utilisateur
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          Nom complet
                        </label>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                          <User className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                          <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{user.nom}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          Email
                        </label>
                        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                          <Mail className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                          <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{user.email}</span>
                        </div>
                      </div>

                      {user.telephone && (
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                            Téléphone
                          </label>
                          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <Phone className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                            <span style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{user.telephone}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Rôle et accès */}
                <Card style={{ 
                  borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                  backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
                      Rôle et Accès
                    </CardTitle>
                    <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Informations sur le rôle et les permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        Rôle attribué
                      </label>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                              {getRoleDisplayName(user.role)}
                            </div>
                            <div className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                              Niveau d'accès: {user.role}
                            </div>
                          </div>
                          <BadgeCheck className="w-6 h-6 text-green-500" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        Statut du compte
                      </label>
                      <div className={`p-3 border rounded-lg ${
                        user.statut === 'active' ? 'border-green-200 bg-green-50' :
                        user.statut === 'inactive' ? 'border-yellow-200 bg-yellow-50' :
                        'border-red-200 bg-red-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium" style={{ 
                              color: user.statut === 'active' ? '#059669' :
                                      user.statut === 'inactive' ? '#D97706' : '#DC2626'
                            }}>
                              {getStatusDisplayName(user.statut)}
                            </div>
                            <div className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                              {user.statut === 'active' ? 'Compte actif et opérationnel' :
                               user.statut === 'inactive' ? 'Compte temporairement désactivé' :
                               'Compte suspendu - Accès restreint'}
                            </div>
                          </div>
                          {user.statut === 'active' ? (
                            <BadgeCheck className="w-6 h-6 text-green-500" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Métadonnées */}
              <Card style={{ 
                borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                    Métadonnées
                  </CardTitle>
                  <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Informations techniques de l'utilisateur
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        ID Utilisateur
                      </label>
                      <div className="p-2 bg-gray-50 rounded">
                        <code style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>#{user.id.toString().padStart(6, '0')}</code>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        Date de création
                      </label>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Calendar className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                        <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{formatDate(user.dateCreation)}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        Dernière modification
                      </label>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Clock className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                        <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          {user.dateModification ? formatDate(user.dateModification) : 'Non modifié'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Activités */}
            <TabsContent value="activites" className="space-y-6">
              <Card style={{ 
                borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
                    Activités Récentes
                  </CardTitle>
                  <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    {userActivities.length} activité(s) enregistrée(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userActivities.length > 0 ? (
                    <div className="space-y-4">
                      {userActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className={`p-2 rounded-full mt-0.5 ${
                            getActionBadgeVariant(activity.action) === 'success' ? 'bg-green-100 text-green-600' :
                            getActionBadgeVariant(activity.action) === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                            getActionBadgeVariant(activity.action) === 'error' ? 'bg-red-100 text-red-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            <Activity className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                                {getActionDisplayName(activity.action)}
                              </div>
                              <Badge variant={getActionBadgeVariant(activity.action)}>
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
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Aucune activité récente</p>
                      <p className="text-sm mt-1">Les activités de cet utilisateur apparaîtront ici</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Permissions */}
            <TabsContent value="permissions" className="space-y-6">
              <Card style={{ 
                borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                    Permissions et Accès
                  </CardTitle>
                  <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Détails des permissions accordées à cet utilisateur
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Résumé des permissions */}
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                          {getRolePermissions(user.role).length}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          Permissions totales
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold mb-1 text-green-600">
                          {getActivePermissions(user.role).length}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          Permissions actives
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold mb-1" style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
                          {getPermissionCoverage(user.role)}%
                        </div>
                        <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          Couverture
                        </div>
                      </div>
                    </div>

                    {/* Détail des permissions par catégorie */}
                    <div>
                      <h4 className="font-medium mb-4" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        Permissions par catégorie
                      </h4>
                      <div className="space-y-3">
                        {getPermissionCategories(user.role).map((category) => (
                          <div key={category.name} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                                  {category.name}
                                </div>
                                <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                                  {category.count} / {category.total} permissions
                                </div>
                              </div>
                              <Badge variant={category.percentage === 100 ? 'success' : category.percentage >= 50 ? 'warning' : 'error'}>
                                {category.percentage}%
                              </Badge>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full"
                                style={{ 
                                  width: `${category.percentage}%`,
                                  backgroundColor: category.percentage === 100 ? '#10B981' :
                                                  category.percentage >= 50 ? '#F59E0B' : '#EF4444'
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Historique */}
            <TabsContent value="historique" className="space-y-6">
              <Card style={{ 
                borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
              }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
                    Historique des Modifications
                  </CardTitle>
                  <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Chronologie des modifications apportées à ce profil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Élément d'historique */}
                    <div className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                            Création du compte
                          </div>
                          <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                            {formatDate(user.dateCreation)}
                          </div>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                          Compte utilisateur créé dans le système
                        </p>
                      </div>
                    </div>

                    {user.lastLogin && (
                      <div className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                              Dernière connexion
                            </div>
                            <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                              {formatDate(user.lastLogin)}
                            </div>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                            Connexion réussie au système
                          </p>
                        </div>
                      </div>
                    )}

                    {user.dateModification && (
                      <div className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                              Dernière modification
                            </div>
                            <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                              {formatDate(user.dateModification)}
                            </div>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                            Mise à jour des informations du profil
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Fonctions utilitaires pour les permissions (à ajouter dans lib/permissions.ts)
const getRolePermissions = (role: string): string[] => {
  // Implémentation basée sur votre configuration des rôles
  const permissions: Record<string, string[]> = {
    'admin': ['user:read', 'user:write', 'user:delete', 'product:read', 'product:write', 'product:delete'],
    'director': ['user:read', 'user:write', 'product:read', 'product:write', 'report:read'],
    'manager': ['product:read', 'product:write', 'report:read'],
    'cashier': ['product:read', 'sale:read', 'sale:write'],
    'employee': ['product:read', 'sale:read']
  }
  return permissions[role] || []
}

const getActivePermissions = (role: string): string[] => {
  return getRolePermissions(role)
}

const getPermissionCoverage = (role: string): number => {
  const allPermissions = ['user:read', 'user:write', 'user:delete', 'product:read', 'product:write', 'product:delete', 'report:read', 'report:export']
  const rolePermissions = getRolePermissions(role)
  return Math.round((rolePermissions.length / allPermissions.length) * 100)
}

const getPermissionCategories = (role: string) => {
  const rolePermissions = getRolePermissions(role)
  const categories = {
    'Utilisateurs': ['user:read', 'user:write', 'user:delete'],
    'Produits': ['product:read', 'product:write', 'product:delete'],
    'Rapports': ['report:read', 'report:export'],
    'Ventes': ['sale:read', 'sale:write']
  }

  return Object.entries(categories).map(([name, permissions]) => {
    const count = permissions.filter(p => rolePermissions.includes(p)).length
    return {
      name,
      count,
      total: permissions.length,
      percentage: Math.round((count / permissions.length) * 100)
    }
  })
}
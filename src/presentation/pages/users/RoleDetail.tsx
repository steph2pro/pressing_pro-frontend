import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Shield, Users, Key, Calendar, FileText, Check, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useRoleById } from '../../../presentation/hooks/users/useRoleById'
import { formatDate } from '../../../lib/utils'
import { getPermissionCategories, getRolePermissionsSummary } from '../../../lib/permissions'
import { usePermissions } from '../../hooks/users/usePermissions'

export const RoleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const roleId = parseInt(id || '0')

  const { role, isLoading, isError, error } = useRoleById({ id: roleId, enabled: true })
  const { permissions } = usePermissions({ enabled: true })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !role) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p style={{ color: 'var(--ubuntu-orange, #E95420)' }}>
            {error?.message || 'Rôle non trouvé'}
          </p>
          <Button onClick={() => navigate('/users/roles')} className="mt-4">
            Retour à la liste
          </Button>
        </div>
      </div>
    )
  }

  const permissionsSummary = getRolePermissionsSummary(role)
  const permissionCategories = getPermissionCategories(permissions.map(p => p.code))
  const rolePermissionsSet = new Set(role.permissions)

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
            onClick={() => navigate('/users/roles')}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              {role.nom}
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Détails du rôle et permissions
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/users/roles/${role.id}/edit`)}
          style={{ 
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          }}
        >
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Informations principales */}
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Informations du rôle
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Détails généraux du rôle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Nom du rôle
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{role.nom}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Code
              </label>
              <Badge variant="outline">
                {role.code}
              </Badge>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Description
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{role.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
              Statistiques
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Utilisation et permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Utilisateurs
              </label>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                <span className="text-lg font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  {role.utilisateursCount}
                </span>
                <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>utilisateur(s)</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Permissions
              </label>
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                <span className="text-lg font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  {permissionsSummary.total}
                </span>
                <span style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>permission(s)</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Couverture
              </label>
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {((permissionsSummary.total / permissions.length) * 100).toFixed(1)}% des permissions totales
              </div>
            </div>
          </CardContent>
        </Card>

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
              Informations techniques
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                ID
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{role.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Date de création
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{formatDate(role.dateCreation)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Dernière modification
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {role.dateModification ? formatDate(role.dateModification) : 'Non modifié'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Répartition des permissions par catégorie */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
            Répartition des Permissions
          </CardTitle>
          <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Distribution des permissions par catégorie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(permissionsSummary.categories).map(([category, count]) => {
              const totalInCategory = permissionCategories[category]?.length || 0
              const percentage = totalInCategory > 0 ? (count / totalInCategory) * 100 : 0
              
              return (
                <div key={category} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {category}
                    </span>
                    <Badge variant={percentage === 100 ? 'success' : percentage >= 50 ? 'warning' : 'error'}>
                      {count}/{totalInCategory}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: percentage === 100 ? '#10B981' :
                                        percentage >= 50 ? '#F59E0B' : '#EF4444'
                      }}
                    />
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    {percentage.toFixed(1)}% de couverture
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Détail des permissions par catégorie */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
            Détail des Permissions
          </CardTitle>
          <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Liste complète des permissions accordées à ce rôle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(permissionCategories).map(([category, categoryPermissions]) => {
              const hasPermissions = categoryPermissions.some(p => rolePermissionsSet.has(p))
              
              if (!hasPermissions) return null

              return (
                <div key={category} className="border rounded-lg">
                  <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <div>
                      <h3 className="font-medium capitalize" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        {category}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        {categoryPermissions.filter(p => rolePermissionsSet.has(p)).length} / {categoryPermissions.length} permissions
                      </p>
                    </div>
                    <Badge variant={
                      categoryPermissions.every(p => rolePermissionsSet.has(p)) ? 'success' :
                      categoryPermissions.some(p => rolePermissionsSet.has(p)) ? 'warning' : 'error'
                    }>
                      {categoryPermissions.every(p => rolePermissionsSet.has(p)) ? 'Complet' :
                       categoryPermissions.some(p => rolePermissionsSet.has(p)) ? 'Partiel' : 'Aucune'}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      {categoryPermissions.map(permission => {
                        const permissionObj = permissions.find(p => p.code === permission)
                        const hasPermission = rolePermissionsSet.has(permission)
                        
                        return (
                          <div
                            key={permission}
                            className={`p-3 border rounded-lg flex items-start space-x-3 ${
                              hasPermission 
                                ? 'border-green-200 bg-green-50' 
                                : 'border-gray-200 bg-gray-50 opacity-60'
                            }`}
                          >
                            <div className={`p-1 rounded-full mt-0.5 ${
                              hasPermission ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {hasPermission ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className={`font-medium text-sm ${
                                hasPermission 
                                  ? 'text-green-800' 
                                  : 'text-gray-500'
                              }`}>
                                {permissionObj?.nom || permission}
                              </div>
                              <div className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                                {permissionObj?.description || permission}
                              </div>
                              <div className="mt-2">
                                <code className={`text-xs px-2 py-1 rounded ${
                                  hasPermission 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-500'
                                }`}>
                                  {permission}
                                </code>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Permissions manquantes */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <X className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
            Permissions Non Accordées
          </CardTitle>
          <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Permissions disponibles mais non attribuées à ce rôle
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(permissionCategories).map(([category, categoryPermissions]) => {
              const missingPermissions = categoryPermissions.filter(p => !rolePermissionsSet.has(p))
              
              if (missingPermissions.length === 0) return null

              return (
                <div key={category} className="border rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                    <span className="font-medium capitalize" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      {category}
                    </span>
                    <Badge variant="error">
                      {missingPermissions.length} manquante(s)
                    </Badge>
                  </div>
                  <div className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {missingPermissions.map(permission => {
                        const permissionObj = permissions.find(p => p.code === permission)
                        return (
                          <div
                            key={permission}
                            className="px-3 py-2 border border-gray-200 rounded-lg bg-white"
                          >
                            <div className="font-medium text-sm" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                              {permissionObj?.nom || permission}
                            </div>
                            <div className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                              {permissionObj?.description || permission}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
            
            {Object.values(permissionCategories).every(category => 
              category.every(p => rolePermissionsSet.has(p))
            ) && (
              <div className="text-center py-8">
                <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }} className="font-medium">
                  Toutes les permissions sont accordées à ce rôle
                </p>
                <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} className="text-sm mt-1">
                  Ce rôle a accès à toutes les permissions disponibles du système
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Résumé des capacités */}
      <Card style={{ 
        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
        backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
      }}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
            Résumé des Capacités
          </CardTitle>
          <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Vue d'ensemble des fonctionnalités accessibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Lecture */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    Lecture
                  </div>
                  <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Accès en consultation
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {['user:read', 'product:read', 'category:read', 'stock:read', 'sale:read', 'report:read', 'finance:read'].map(permission => (
                  <div key={permission} className="flex items-center space-x-2">
                    {rolePermissionsSet.has(permission) ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${rolePermissionsSet.has(permission) ? 'text-green-700' : 'text-gray-500'}`}>
                      {permission.split(':')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Écriture */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-full bg-green-100">
                  <Edit className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    Écriture
                  </div>
                  <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Création et modification
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {['user:write', 'product:write', 'category:write', 'stock:write', 'sale:write', 'report:write', 'finance:write'].map(permission => (
                  <div key={permission} className="flex items-center space-x-2">
                    {rolePermissionsSet.has(permission) ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${rolePermissionsSet.has(permission) ? 'text-green-700' : 'text-gray-500'}`}>
                      {permission.split(':')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Administration */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    Administration
                  </div>
                  <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                    Gestion avancée
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {['user:delete', 'product:delete', 'category:delete', 'stock:delete', 'sale:delete', 'role:manage'].map(permission => (
                  <div key={permission} className="flex items-center space-x-2">
                    {rolePermissionsSet.has(permission) ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm ${rolePermissionsSet.has(permission) ? 'text-green-700' : 'text-gray-500'}`}>
                      {permission.split(':')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Shield, Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useRoleById } from '../../../presentation/hooks/users/useRoleById'
import { useUpdateRole } from '../../../presentation/hooks/users/useUpdateRole'
import { UpdateRoleRequest } from '../../../data/models/roles'
import { getPermissionCategories } from '../../../lib/permissions'
import { usePermissions } from '../../hooks/users/usePermissions'

export const EditRole: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const roleId = parseInt(id || '0')

  const { role, isLoading, isError, error } = useRoleById({ id: roleId, enabled: true })
  const { updateRole, loading: updateLoading, error: updateError } = useUpdateRole()
  const { permissions } = usePermissions({ enabled: true })

  const [formData, setFormData] = useState<UpdateRoleRequest>({
    nom: '',
    description: '',
    permissions: []
  })

  useEffect(() => {
    if (role) {
      setFormData({
        nom: role.nom,
        description: role.description,
        permissions: role.permissions
      })
    }
  }, [role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nom?.trim() || !formData.description?.trim()) {
      return
    }

    try {
      await updateRole(roleId, formData)
      navigate(`/users/roles/${roleId}`)
    } catch (err) {
      console.error('Erreur lors de la modification:', err)
    }
  }

  const handleChange = (field: keyof UpdateRoleRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions?.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...(prev.permissions || []), permission]
    }))
  }

  const handleSelectAllCategory = (category: string, categoryPermissions: string[]) => {
    const allSelected = categoryPermissions.every(p => formData.permissions?.includes(p))
    
    setFormData(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions?.filter(p => !categoryPermissions.includes(p)) || []
        : [...new Set([...(prev.permissions || []), ...categoryPermissions])]
    }))
  }

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

  const permissionCategories = getPermissionCategories(permissions.map(p => p.code))

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
            onClick={() => navigate(`/users/roles/${roleId}`)}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Modifier le rôle
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {role.nom}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl">
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
              Modifiez les informations et permissions du rôle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {updateError && (
                <div className="p-3 rounded-md text-sm" style={{ 
                  backgroundColor: 'var(--ubuntu-light-orange, #FDF6F2)',
                  color: 'var(--ubuntu-orange, #E95420)',
                  border: '1px solid var(--ubuntu-orange, #E95420)'
                }}>
                  {updateError}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {/* Informations de base */}
                <div className="space-y-4">
                  <h3 className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                    Informations du rôle
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      Nom du rôle *
                    </label>
                    <Input
                      type="text"
                      value={formData.nom || ''}
                      onChange={(e) => handleChange('nom', e.target.value)}
                      placeholder="Ex: Superviseur"
                      required
                      style={{
                        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                        color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      Code du rôle
                    </label>
                    <Input
                      type="text"
                      value={role.code}
                      disabled
                      style={{
                        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                        color: 'var(--ubuntu-warm-grey, #AEA79F)',
                        backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)'
                      }}
                    />
                    <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Le code du rôle ne peut pas être modifié
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      Description *
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Décrivez le rôle et ses responsabilités..."
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md resize-none"
                      style={{
                        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                        color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Permissions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      Permissions ({formData.permissions?.length || 0})
                    </h3>
                    <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      Sélectionnez les permissions
                    </div>
                  </div>

                  {/* Catégories de permissions */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {Object.entries(permissionCategories).map(([category, categoryPermissions]) => (
                      <div key={category} className="border rounded-lg">
                        <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                          <span className="font-medium capitalize" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                            {category}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSelectAllCategory(category, categoryPermissions)}
                            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                          >
                            {categoryPermissions.every(p => formData.permissions?.includes(p)) ? 'Tout désélectionner' : 'Tout sélectionner'}
                          </Button>
                        </div>
                        <div className="p-3 space-y-2">
                          {categoryPermissions.map(permission => {
                            const permissionObj = permissions.find(p => p.code === permission)
                            const isSelected = formData.permissions?.includes(permission)
                            return (
                              <label key={permission} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handlePermissionToggle(permission)}
                                  className="rounded border-gray-300"
                                />
                                <div className="flex-1">
                                  <div className={`font-medium text-sm ${isSelected ? 'text-green-600' : ''}`}>
                                    {permissionObj?.nom || permission}
                                  </div>
                                  <div className="text-xs" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                                    {permissionObj?.description || permission}
                                  </div>
                                </div>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/users/roles/${roleId}`)}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={updateLoading || !formData.nom?.trim() || !formData.description?.trim()}
                  style={{ 
                    backgroundColor: 'var(--ubuntu-orange, #E95420)',
                    color: 'var(--ubuntu-white, #FFFFFF)'
                  }}
                >
                  {updateLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Modification...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Enregistrer
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
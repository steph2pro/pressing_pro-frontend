import React, { useState } from 'react'
import { X, Shield, Check } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useCreateRole } from '../../../presentation/hooks/users/useCreateRole'
import { UserRole } from '../../../data/models/users'
import { CreateRoleRequest } from '../../../data/models/roles'
import { getPermissionCategories } from '../../../lib/permissions'
import { usePermissions } from '../../hooks/users/usePermissions'

interface CreateRoleDialogProps {
  onSuccess: () => void
}

export const CreateRoleDialog: React.FC<CreateRoleDialogProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<CreateRoleRequest>({
    nom: '',
    code: UserRole.EMPLOYEE,
    description: '',
    permissions: []
  })
  const [selectedCategory, setSelectedCategory] = useState<string>('user')

  const { createRole, loading, error } = useCreateRole()
  const { permissions } = usePermissions({ enabled: true })

  const permissionCategories = getPermissionCategories(permissions.map(p => p.code))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nom.trim() || !formData.description.trim()) {
      return
    }

    try {
      await createRole(formData)
      setFormData({
        nom: '',
        code: UserRole.EMPLOYEE,
        description: '',
        permissions: []
      })
      setIsOpen(false)
      onSuccess()
    } catch (err) {
      console.error('Erreur lors de la création:', err)
    }
  }

  const handleChange = (field: keyof CreateRoleRequest, value: any) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value 
    }))
  }

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const handleSelectAllCategory = (category: string) => {
    const categoryPermissions = permissionCategories[category] || []
    const allSelected = categoryPermissions.every(p => formData.permissions.includes(p))
    
    setFormData(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter(p => !categoryPermissions.includes(p))
        : [...new Set([...prev.permissions, ...categoryPermissions])]
    }))
  }

  const handleClose = () => {
    setFormData({
      nom: '',
      code: UserRole.EMPLOYEE,
      description: '',
      permissions: []
    })
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        style={{ 
          backgroundColor: 'var(--ubuntu-aubergine, #772953)',
          color: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        <Shield className="w-4 h-4 mr-2" />
        Nouveau Rôle
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
            style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              borderWidth: '1px'
            }}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Nouveau Rôle
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col h-[calc(90vh-8rem)]">
              <div className="flex-1 overflow-y-auto p-6">
                {error && (
                  <div className="p-3 rounded-md text-sm mb-4" style={{ 
                    backgroundColor: 'var(--ubuntu-light-orange, #FDF6F2)',
                    color: 'var(--ubuntu-orange, #E95420)',
                    border: '1px solid var(--ubuntu-orange, #E95420)'
                  }}>
                    {error}
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
                        value={formData.nom}
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
                        Code du rôle *
                      </label>
                      <Select
                        value={formData.code}
                        onChange={(e) => handleChange('code', e.target.value as UserRole)}
                        style={{
                          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                          color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                        }}
                      >
                        <option value={UserRole.EMPLOYEE}>Employé</option>
                        <option value={UserRole.CASHIER}>Caissier</option>
                        <option value={UserRole.MANAGER}>Manager</option>
                        <option value={UserRole.DIRECTOR}>Directeur</option>
                        <option value={UserRole.ADMIN}>Administrateur</option>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
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
                        Permissions ({formData.permissions.length})
                      </h3>
                      <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        Sélectionnez les permissions
                      </div>
                    </div>

                    {/* Catégories de permissions */}
                    <div className="space-y-3">
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
                              onClick={() => handleSelectAllCategory(category)}
                              style={{ color: 'var(--ubuntu-orange, #E95420)' }}
                            >
                              {categoryPermissions.every(p => formData.permissions.includes(p)) ? 'Tout désélectionner' : 'Tout sélectionner'}
                            </Button>
                          </div>
                          <div className="p-3 space-y-2">
                            {categoryPermissions.map(permission => {
                              const permissionObj = permissions.find(p => p.code === permission)
                              return (
                                <label key={permission} className="flex items-center space-x-3 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={formData.permissions.includes(permission)}
                                    onChange={() => handlePermissionToggle(permission)}
                                    className="rounded border-gray-300"
                                  />
                                  <div className="flex-1">
                                    <div className="font-medium text-sm" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
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
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !formData.nom.trim() || !formData.description.trim()}
                  style={{ 
                    backgroundColor: 'var(--ubuntu-orange, #E95420)',
                    color: 'var(--ubuntu-white, #FFFFFF)'
                  }}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Création...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Créer le rôle
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
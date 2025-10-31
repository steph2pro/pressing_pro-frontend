import React, { useState } from 'react'
import { X, UserPlus } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useCreateUser } from '../../hooks/users/useCreateUser'
import { useRoles } from '../../hooks/users/useRoles'
import { CreateUserRequest, UserRole } from '../../../data/models/users'
import { getRoleDisplayName } from '../../../lib/permissions'

interface CreateUserDialogProps {
  onSuccess: () => void
}

export const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<CreateUserRequest>({
    nom: '',
    email: '',
    motDePasse: '',
    role: UserRole.EMPLOYEE,
    telephone: ''
  })

  const { createUser, loading, error } = useCreateUser()
  const { roles } = useRoles({ enabled: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nom.trim() || !formData.email.trim() || !formData.motDePasse.trim()) {
      return
    }

    try {
      await createUser(formData)
      setFormData({
        nom: '',
        email: '',
        motDePasse: '',
        role: UserRole.EMPLOYEE,
        telephone: ''
      })
      setIsOpen(false)
      onSuccess()
    } catch (err) {
      console.error('Erreur lors de la création:', err)
    }
  }

  const handleChange = (field: keyof CreateUserRequest, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: field === 'role' ? value as UserRole : value 
    }))
  }

  const handleClose = () => {
    setFormData({
      nom: '',
      email: '',
      motDePasse: '',
      role: UserRole.EMPLOYEE,
      telephone: ''
    })
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        style={{ 
          backgroundColor: 'var(--ubuntu-orange, #E95420)',
          color: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Nouvel Utilisateur
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-lg w-full max-w-md"
            style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              borderWidth: '1px'
            }}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
              <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Nouvel Utilisateur
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

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-md text-sm" style={{ 
                  backgroundColor: 'var(--ubuntu-light-orange, #FDF6F2)',
                  color: 'var(--ubuntu-orange, #E95420)',
                  border: '1px solid var(--ubuntu-orange, #E95420)'
                }}>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Nom complet *
                </label>
                <Input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleChange('nom', e.target.value)}
                  placeholder="Entrez le nom complet"
                  required
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="entrez@email.com"
                  required
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Mot de passe *
                </label>
                <Input
                  type="password"
                  value={formData.motDePasse}
                  onChange={(e) => handleChange('motDePasse', e.target.value)}
                  placeholder="Entrez le mot de passe"
                  required
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Rôle *
                </label>
                <Select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  <option value={UserRole.EMPLOYEE}>{getRoleDisplayName(UserRole.EMPLOYEE)}</option>
                  <option value={UserRole.CASHIER}>{getRoleDisplayName(UserRole.CASHIER)}</option>
                  <option value={UserRole.MANAGER}>{getRoleDisplayName(UserRole.MANAGER)}</option>
                  <option value={UserRole.DIRECTOR}>{getRoleDisplayName(UserRole.DIRECTOR)}</option>
                  <option value={UserRole.ADMIN}>{getRoleDisplayName(UserRole.ADMIN)}</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Téléphone
                </label>
                <Input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleChange('telephone', e.target.value)}
                  placeholder="+237 6 12 34 56 78"
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
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
                  disabled={loading || !formData.nom.trim() || !formData.email.trim() || !formData.motDePasse.trim()}
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
                    'Créer l\'utilisateur'
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
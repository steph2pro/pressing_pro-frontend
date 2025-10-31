import React, { useState } from 'react'
import { X, UserPlus, Shield } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useCreateUser } from '../../../presentation/hooks/users/useCreateUser'
import { CreateUserRequest, UserRole, UserStatus } from '../../../data/models/users'
import { getAdminRoleDisplayName } from '../../../lib/adminUtils'

interface CreateAdminDialogProps {
  onSuccess: () => void
}

export const CreateAdminDialog: React.FC<CreateAdminDialogProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<CreateUserRequest>({
    nom: '',
    email: '',
    motDePasse: '',
    role: UserRole.MANAGER,
    telephone: ''
  })

  const { createUser, loading, error } = useCreateUser()

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
        role: UserRole.MANAGER,
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
      role: UserRole.MANAGER,
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
        Nouvel Admin
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
                Nouvel Administrateur
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
                  placeholder="admin@entreprise.com"
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
                  placeholder="Entrez un mot de passe sécurisé"
                  required
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                />
                <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  Minimum 8 caractères avec chiffres et lettres
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Rôle d'administration *
                </label>
                <Select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  <option value={UserRole.MANAGER}>{getAdminRoleDisplayName(UserRole.MANAGER)}</option>
                  <option value={UserRole.DIRECTOR}>{getAdminRoleDisplayName(UserRole.DIRECTOR)}</option>
                  <option value={UserRole.ADMIN}>{getAdminRoleDisplayName(UserRole.ADMIN)}</option>
                </Select>
                <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  {formData.role === UserRole.MANAGER && 'Gestion quotidienne et rapports'}
                  {formData.role === UserRole.DIRECTOR && 'Administration et supervision'}
                  {formData.role === UserRole.ADMIN && 'Accès complet au système'}
                </p>
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-blue-800">
                      Permissions accordées
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      {formData.role === UserRole.MANAGER && 'Gestion produits, stocks, ventes et rapports'}
                      {formData.role === UserRole.DIRECTOR && 'Gestion utilisateurs, produits, finances et rapports'}
                      {formData.role === UserRole.ADMIN && 'Accès complet à toutes les fonctionnalités'}
                    </div>
                  </div>
                </div>
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
                    'Créer l\'administrateur'
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
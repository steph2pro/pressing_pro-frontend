import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useUserById } from '../../../presentation/hooks/users/useUserById'
import { useUpdateUser } from '../../../presentation/hooks/users/useUpdateUser'
import { useRoles } from '../../../presentation/hooks/users/useRoles'
import { UpdateUserRequest, UserStatus, UserRole } from '../../../data/models/users'
import { getRoleDisplayName, getStatusDisplayName } from '../../../lib/permissions'

export const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = parseInt(id || '0')

  const { user, isLoading, isError, error } = useUserById( userId)
  const { updateUser, loading: updateLoading, error: updateError } = useUpdateUser()
  const { roles } = useRoles({ enabled: true })

  const [formData, setFormData] = useState<UpdateUserRequest>({
    nom: '',
    email: '',
    role: UserRole.EMPLOYEE,
    statut: UserStatus.ACTIVE,
    telephone: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom,
        email: user.email,
        role: user.role,
        statut: user.statut,
        telephone: user.telephone || ''
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nom?.trim() || !formData.email?.trim()) {
      return
    }

    try {
      await updateUser(userId, formData)
      navigate(`/users/${userId}`)
    } catch (err) {
      console.error('Erreur lors de la modification:', err)
    }
  }

  const handleChange = (field: keyof UpdateUserRequest, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: field === 'role' ? value as UserRole : 
               field === 'statut' ? value as UserStatus : value 
    }))
  }

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
            onClick={() => navigate(`/users/${userId}`)}
            style={{ color: 'var(--ubuntu-orange, #E95420)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Modifier l'utilisateur
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {user.nom}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Informations de l'utilisateur
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Modifiez les informations de l'utilisateur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {updateError && (
                <div className="p-3 rounded-md text-sm" style={{ 
                  backgroundColor: 'var(--ubuntu-light-orange, #FDF6F2)',
                  color: 'var(--ubuntu-orange, #E95420)',
                  border: '1px solid var(--ubuntu-orange, #E95420)'
                }}>
                  {updateError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Nom complet *
                </label>
                <Input
                  type="text"
                  value={formData.nom || ''}
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
                  value={formData.email || ''}
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
                  Rôle *
                </label>
                <Select
                  value={formData.role || UserRole.EMPLOYEE}
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
                  Statut *
                </label>
                <Select
                  value={formData.statut || UserStatus.ACTIVE}
                  onChange={(e) => handleChange('statut', e.target.value)}
                  style={{
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  <option value={UserStatus.ACTIVE}>{getStatusDisplayName(UserStatus.ACTIVE)}</option>
                  <option value={UserStatus.INACTIVE}>{getStatusDisplayName(UserStatus.INACTIVE)}</option>
                  <option value={UserStatus.SUSPENDED}>{getStatusDisplayName(UserStatus.SUSPENDED)}</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                  Téléphone
                </label>
                <Input
                  type="tel"
                  value={formData.telephone || ''}
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
                  onClick={() => navigate(`/users/${userId}`)}
                  style={{ 
                    borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                    color: 'var(--ubuntu-dark-aubergine, #2C001E)'
                  }}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={updateLoading || !formData.nom?.trim() || !formData.email?.trim()}
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
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Shield, User, Mail, Phone, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/Select'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Badge } from '../../components/Badge'
import { useUserById } from '../../../presentation/hooks/users/useUserById'
import { useUpdateUser } from '../../../presentation/hooks/users/useUpdateUser'
import { UpdateUserRequest, UserRole, UserStatus } from '../../../data/models/users'
import { getAdminRoleDisplayName, getStatusDisplayName } from '../../../lib/adminUtils'

export const EditAdmin: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = parseInt(id || '0')

  const { user, isLoading, isError, error } = useUserById({ id: userId, enabled: true })
  const { updateUser, loading: updateLoading, error: updateError } = useUpdateUser()

  const [formData, setFormData] = useState<UpdateUserRequest>({
    nom: '',
    email: '',
    role: UserRole.MANAGER,
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

  const isSuperAdmin = user?.role === UserRole.ADMIN

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
            {error?.message || 'Administrateur non trouvé'}
          </p>
          <Button onClick={() => navigate('/admin/dashboard')} className="mt-4">
            Retour au tableau de bord
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
              Modifier l'administrateur
            </h1>
            <p className="text-lg mt-2" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {user.nom}
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
              Informations de l'administrateur
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Modifiez les informations et les permissions de l'administrateur
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

              {isSuperAdmin && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-800">
                        Super Administrateur
                      </div>
                      <div className="text-sm text-blue-700 mt-1">
                        Ce compte possède des privilèges étendus. Certaines modifications peuvent être restreintes.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {/* Informations personnelles */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <User className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
                    Informations Personnelles
                  </h3>
                  
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
                </div>

                {/* Rôle et statut */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <Shield className="w-4 h-4 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
                    Rôle et Accès
                  </h3>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      Rôle d'administration *
                    </label>
                    <Select
                      value={formData.role || UserRole.MANAGER}
                      onChange={(e) => handleChange('role', e.target.value)}
                      disabled={isSuperAdmin}
                      style={{
                        borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
                        color: 'var(--ubuntu-dark-aubergine, #2C001E)',
                        backgroundColor: isSuperAdmin ? 'var(--ubuntu-light-grey, #f5f5f5)' : 'white'
                      }}
                    >
                      <option value={UserRole.MANAGER}>{getAdminRoleDisplayName(UserRole.MANAGER)}</option>
                      <option value={UserRole.DIRECTOR}>{getAdminRoleDisplayName(UserRole.DIRECTOR)}</option>
                      <option value={UserRole.ADMIN}>{getAdminRoleDisplayName(UserRole.ADMIN)}</option>
                    </Select>
                    {isSuperAdmin && (
                      <p className="text-xs mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                        Le rôle de super administrateur ne peut pas être modifié
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      Statut du compte *
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

                  {/* Aperçu des permissions */}
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium text-sm mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                      Permissions accordées
                    </h4>
                    <div className="text-xs space-y-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                      {formData.role === UserRole.MANAGER && (
                        <>
                          <div>• Gestion des produits et stocks</div>
                          <div>• Consultation des rapports</div>
                          <div>• Gestion des ventes</div>
                          <div>• Supervision des opérations</div>
                        </>
                      )}
                      {formData.role === UserRole.DIRECTOR && (
                        <>
                          <div>• Gestion des utilisateurs</div>
                          <div>• Accès aux données financières</div>
                          <div>• Validation des transactions</div>
                          <div>• Configuration système</div>
                        </>
                      )}
                      {formData.role === UserRole.ADMIN && (
                        <>
                          <div>• Accès complet au système</div>
                          <div>• Gestion de tous les utilisateurs</div>
                          <div>• Configuration avancée</div>
                          <div>• Supervision totale</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations de sécurité */}
              <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                <h4 className="font-medium text-sm mb-2 flex items-center text-yellow-800">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Informations de sécurité
                </h4>
                <div className="text-xs space-y-1 text-yellow-700">
                  <div>• Les modifications prennent effet immédiatement</div>
                  <div>• Les sessions actives peuvent être affectées</div>
                  <div>• Vérifiez les permissions avant de sauvegarder</div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
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
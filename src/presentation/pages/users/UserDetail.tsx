import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Mail, Phone, Calendar, User, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/Badge'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useUserById } from '../../../presentation/hooks/users/useUserById'
import { formatDate } from '../../../lib/utils'
import { getRoleDisplayName, getStatusDisplayName, getStatusBadgeVariant, getRoleBadgeVariant } from '../../../lib/permissions'

export const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = parseInt(id || '0')

  const { user, isLoading, isError, error } = useUserById( userId )

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
              Détails de l'utilisateur
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/users/${user.id}/edit`)}
          style={{ 
            backgroundColor: 'var(--ubuntu-orange, #E95420)',
            color: 'var(--ubuntu-white, #FFFFFF)'
          }}
        >
          <Edit className="w-4 h-4 mr-2" />
          Modifier
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informations principales */}
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
              Informations personnelles
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Détails de l'utilisateur
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Nom complet
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{user.nom}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Email
              </label>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{user.email}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Téléphone
              </label>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  {user.telephone || 'Non renseigné'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rôle et statut */}
        <Card style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" style={{ color: 'var(--ubuntu-aubergine, #772953)' }} />
              Rôle et accès
            </CardTitle>
            <CardDescription style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Informations sur le rôle et les permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Rôle
              </label>
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {getRoleDisplayName(user.role)}
              </Badge>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Statut
              </label>
              <Badge variant={getStatusBadgeVariant(user.statut)}>
                {getStatusDisplayName(user.statut)}
              </Badge>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Dernière connexion
              </label>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }} />
                <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                  {user.lastLogin ? formatDate(user.lastLogin) : 'Jamais connecté'}
                </p>
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
                ID
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{user.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Date de création
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>{formatDate(user.dateCreation)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Dernière modification
              </label>
              <p style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {user.dateModification ? formatDate(user.dateModification) : 'Non modifié'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
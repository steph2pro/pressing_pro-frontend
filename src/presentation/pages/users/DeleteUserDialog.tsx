import React from 'react'
import { AlertTriangle, User } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { User as UserType } from '../../../data/models/users'
import { getRoleDisplayName, getStatusDisplayName } from '../../../lib/permissions'

interface DeleteUserDialogProps {
  user: UserType
  onConfirm: (user: UserType) => void
  onClose: () => void
  loading?: boolean
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  user,
  onConfirm,
  onClose,
  loading = false
}) => {
  const handleConfirm = () => {
    onConfirm(user)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg w-full max-w-md"
        style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          borderWidth: '1px'
        }}
      >
        <div className="flex items-center space-x-3 p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
          <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--ubuntu-light-orange, #FDF6F2)' }}>
            <AlertTriangle className="w-5 h-5" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Supprimer l'utilisateur
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Cette action est irréversible
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-full bg-gray-100">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {user.nom}
              </div>
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {user.email} • {getRoleDisplayName(user.role)} • {getStatusDisplayName(user.statut)}
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>"{user.nom}"</strong> ?
          </p>
          <p className="mt-2 text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Toutes les données associées à cet utilisateur seront perdues.
          </p>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            style={{ 
              borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
              color: 'var(--ubuntu-dark-aubergine, #2C001E)'
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            style={{ 
              backgroundColor: 'var(--ubuntu-orange, #E95420)',
              color: 'var(--ubuntu-white, #FFFFFF)'
            }}
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Suppression...
              </>
            ) : (
              'Supprimer'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import { AlertTriangle, User, Shield, Users } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { User as UserType, UserRole } from '../../../data/models/users'
import { getAdminRoleDisplayName, getStatusDisplayName } from '../../../lib/adminUtils'

interface DeleteAdminDialogProps {
  admin: UserType
  onConfirm: (admin: UserType) => void
  onClose: () => void
  loading?: boolean
}

export const DeleteAdminDialog: React.FC<DeleteAdminDialogProps> = ({
  admin,
  onConfirm,
  onClose,
  loading = false
}) => {
  const handleConfirm = () => {
    onConfirm(admin)
  }

  const isSuperAdmin = admin.role === UserRole.ADMIN
  const canDelete = !isSuperAdmin

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
              Supprimer l'administrateur
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {canDelete ? 'Cette action est irréversible' : 'Action restreinte'}
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-full bg-orange-100">
              <User className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {admin.nom}
              </div>
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                {admin.email} • {getAdminRoleDisplayName(admin.role as any)} • {getStatusDisplayName(admin.statut)}
              </div>
            </div>
          </div>

          {isSuperAdmin && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
              <div className="flex items-center space-x-2 text-red-800">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Super Administrateur
                </span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                Les super administrateurs ne peuvent pas être supprimés pour des raisons de sécurité.
              </p>
            </div>
          )}

          {!isSuperAdmin && (
            <>
              <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Êtes-vous sûr de vouloir supprimer l'administrateur <strong>"{admin.nom}"</strong> ?
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Toutes les données associées à cet administrateur seront perdues, y compris son historique d'activités.
              </p>

              <div className="mt-4 p-3 rounded-md bg-yellow-50 border border-yellow-200">
                <div className="flex items-center space-x-2 text-yellow-800">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Impact sur les opérations
                  </span>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Cet administrateur ne pourra plus accéder au système et toutes ses sessions actives seront fermées.
                </p>
              </div>
            </>
          )}
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
            disabled={loading || !canDelete}
            style={{ 
              backgroundColor: !canDelete ? 'var(--ubuntu-warm-grey, #AEA79F)' : 'var(--ubuntu-orange, #E95420)',
              color: 'var(--ubuntu-white, #FFFFFF)'
            }}
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Suppression...
              </>
            ) : !canDelete ? (
              'Action restreinte'
            ) : (
              'Supprimer'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
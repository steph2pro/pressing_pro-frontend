import React from 'react'
import { AlertTriangle, Shield, Users } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Role } from '../../../data/models/roles'
import { getRolePermissionsSummary } from '../../../lib/permissions'

interface DeleteRoleDialogProps {
  role: Role
  onConfirm: (role: Role) => void
  onClose: () => void
  loading?: boolean
}

export const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({
  role,
  onConfirm,
  onClose,
  loading = false
}) => {
  const handleConfirm = () => {
    onConfirm(role)
  }

  const permissionsSummary = getRolePermissionsSummary(role)

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
              Supprimer le rôle
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Cette action est irréversible
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-full bg-gray-100">
              <Shield className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <div className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                {role.nom}
              </div>
              <div className="text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Code: {role.code} • {permissionsSummary.total} permissions
              </div>
            </div>
          </div>

          {role.utilisateursCount > 0 && (
            <div className="mb-4 p-3 rounded-md bg-yellow-50 border border-yellow-200">
              <div className="flex items-center space-x-2 text-yellow-800">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {role.utilisateursCount} utilisateur(s) associé(s) à ce rôle
                </span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                La suppression de ce rôle affectera ces utilisateurs.
              </p>
            </div>
          )}

          <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Êtes-vous sûr de vouloir supprimer le rôle <strong>"{role.nom}"</strong> ?
          </p>
          <p className="mt-2 text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Toutes les permissions associées à ce rôle seront perdues.
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
            disabled={loading || role.utilisateursCount > 0}
            style={{ 
              backgroundColor: role.utilisateursCount > 0 ? 'var(--ubuntu-warm-grey, #AEA79F)' : 'var(--ubuntu-orange, #E95420)',
              color: 'var(--ubuntu-white, #FFFFFF)'
            }}
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Suppression...
              </>
            ) : role.utilisateursCount > 0 ? (
              'Rôle utilisé'
            ) : (
              'Supprimer'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Categorie } from '../../../data/models/products'

interface DeleteCategoryDialogProps {
  category: Categorie
  onConfirm: (category: Categorie) => void
  onClose: () => void
  loading?: boolean
}

export const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
  category,
  onConfirm,
  onClose,
  loading = false
}) => {
  const handleConfirm = () => {
    onConfirm(category)
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
        {/* En-tête */}
        <div className="flex items-center space-x-3 p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
          <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--ubuntu-light-orange, #FDF6F2)' }}>
            <AlertTriangle className="w-5 h-5" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Supprimer la catégorie
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              Cette action est irréversible
            </p>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Êtes-vous sûr de vouloir supprimer la catégorie <strong>"{category.nom}"</strong> ?
          </p>
          <p className="mt-2 text-sm" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
            Toutes les données associées à cette catégorie seront perdues.
          </p>
        </div>

        {/* Actions */}
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
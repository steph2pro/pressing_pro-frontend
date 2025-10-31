import React from 'react'
import { X, AlertTriangle, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Depense } from '../../../data/models/expenses'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { useDeleteExpense } from '../../hooks/expensives/useDeleteExpense'

interface DeleteExpenseDialogProps {
  expense: Depense
  onConfirm: (expense: Depense) => void
  onClose: () => void
}

export const DeleteExpenseDialog: React.FC<DeleteExpenseDialogProps> = ({
  expense,
  onConfirm,
  onClose
}) => {
  const { deleteExpense, loading, error } = useDeleteExpense()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await deleteExpense(expense.id)
    onConfirm(expense)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        style={{ 
          borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
          backgroundColor: 'var(--ubuntu-white, #FFFFFF)'
        }}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--ubuntu-light-grey, #E0E0E0)' }}>
          <h2 className="text-xl font-bold" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
            Supprimer la Dépense
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Contenu */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Avertissement */}
          <div className="flex items-start space-x-3 p-4 rounded border" style={{ 
            borderColor: 'var(--ubuntu-orange, #E95420)',
            backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)'
          }}>
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--ubuntu-orange, #E95420)' }} />
            <div>
              <h3 className="font-medium" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
                Attention
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
                Vous êtes sur le point de supprimer définitivement cette dépense. Cette action est irréversible.
              </p>
            </div>
          </div>

          {/* Informations de la dépense */}
          <div className="p-4 rounded border" style={{ 
            borderColor: 'var(--ubuntu-light-grey, #E0E0E0)',
            backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)'
          }}>
            <h3 className="font-medium mb-2" style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>
              Dépense #{expense.id}
            </h3>
            <p style={{ color: 'var(--ubuntu-dark-aubergine, #2C001E)' }}>{expense.libelle}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--ubuntu-warm-grey, #AEA79F)' }}>
              {expense.montant} € • {expense.categorie} • {expense.statut}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded border" style={{ 
              borderColor: 'var(--ubuntu-orange, #E95420)',
              backgroundColor: 'var(--ubuntu-light-grey, #f5f5f5)',
              color: 'var(--ubuntu-orange, #E95420)'
            }}>
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
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
              type="submit"
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
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}